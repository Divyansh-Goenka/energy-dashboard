// File: src/app/api/database/test-connection/route.ts
import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';

export async function POST(request: NextRequest) {
    let pool: sql.ConnectionPool | null = null;
    const startTime = Date.now();
    
    try {
        // Get database configuration from request body
        const { server, database, username, password, port } = await request.json();
        
        // Validate required fields
        if (!server || !database || !username || !password) {
            return NextResponse.json({
                success: false,
                message: 'Missing required database configuration fields',
                error: 'MISSING_FIELDS'
            }, { status: 400 });
        }

        // Database configuration
        const config: sql.config = {
            server: server,
            database: database,
            user: username,
            password: password,
            port: parseInt(port) || 1433,
            options: {
                encrypt: false, // Set to true if using Azure SQL Database
                trustServerCertificate: true // For local development
            },
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000
            },
            connectionTimeout: 15000, // 15 seconds
            requestTimeout: 15000 // 15 seconds
        };

        console.log('Attempting to connect to database:', {
            server: config.server,
            database: config.database,
            user: config.user,
            port: config.port
        });

        // Create connection pool
        pool = await sql.connect(config);
        console.log('Database connection pool created successfully');

        // Test basic connectivity with a simple query
        const basicTest = await pool.request().query('SELECT 1 as test_value, GETDATE() as server_time');
        
        // Get database information
        const dbInfo = await pool.request().query(`
            SELECT 
                @@VERSION as sql_version,
                DB_NAME() as database_name,
                @@SERVERNAME as server_name,
                USER_NAME() as current_user,
                @@LANGUAGE as language,
                @@SPID as session_id
        `);
        
        // Get schema information
        const schemaInfo = await pool.request().query(`
            SELECT 
                (SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE') as table_count,
                (SELECT COUNT(*) FROM INFORMATION_SCHEMA.VIEWS) as view_count,
                (SELECT COUNT(*) FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_TYPE = 'PROCEDURE') as procedure_count
        `);

        // Try to get table list (top 10 tables)
        const tableList = await pool.request().query(`
            SELECT TOP 10 
                TABLE_NAME as name,
                TABLE_TYPE as type
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_TYPE = 'BASE TABLE'
            ORDER BY TABLE_NAME
        `);

        const connectionTime = Date.now() - startTime;
        
        return NextResponse.json({
            success: true,
            message: 'Database connection successful',
            connection_time_ms: connectionTime,
            timestamp: new Date().toISOString(),
            database_info: {
                ...dbInfo.recordset[0],
                sql_version: dbInfo.recordset[0].sql_version?.substring(0, 100) + '...' // Truncate version string
            },
            schema_info: schemaInfo.recordset[0],
            tables: tableList.recordset,
            test_query_result: basicTest.recordset[0]
        });
        
    } catch (error: any) {
        const connectionTime = Date.now() - startTime;
        console.error('Database connection failed:', error);
        
        // Handle specific SQL Server errors
        let errorMessage = 'Database connection failed';
        let errorCode = 'UNKNOWN_ERROR';
        
        if (error.code === 'ELOGIN') {
            errorMessage = 'Login failed. Please check your username and password.';
            errorCode = 'LOGIN_FAILED';
        } else if (error.code === 'ETIMEOUT') {
            errorMessage = 'Connection timeout. Please check if the server is accessible.';
            errorCode = 'TIMEOUT';
        } else if (error.code === 'ENOTFOUND') {
            errorMessage = 'Server not found. Please check the server address.';
            errorCode = 'SERVER_NOT_FOUND';
        } else if (error.code === 'ECONNREFUSED') {
            errorMessage = 'Connection refused. Please check if SQL Server is running and accepting connections.';
            errorCode = 'CONNECTION_REFUSED';
        } else if (error.message?.includes('database')) {
            errorMessage = 'Database not found. Please check the database name.';
            errorCode = 'DATABASE_NOT_FOUND';
        }
        
        return NextResponse.json({
            success: false,
            message: errorMessage,
            error: error.message,
            error_code: errorCode,
            connection_time_ms: connectionTime,
            timestamp: new Date().toISOString()
        }, { status: 500 });
        
    } finally {
        // Always close the connection
        if (pool) {
            try {
                await pool.close();
                console.log('Database connection closed');
            } catch (closeError) {
                console.error('Error closing database connection:', closeError);
            }
        }
    }
}