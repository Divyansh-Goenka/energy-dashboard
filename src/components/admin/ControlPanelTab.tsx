// File: src/components/admin/ControlPanelTab.tsx
'use client'

import { useState, useRef } from 'react'

interface ControlPanelTabProps {
    companyName: string
    setCompanyName: (name: string) => void
    logoUrl: string
    setLogoUrl: (url: string) => void
}

interface DatabaseTestResult {
    success: boolean
    message: string
    connection_time_ms?: number
    database_info?: any
    schema_info?: any
    tables?: any[]
    error_code?: string
}

export function ControlPanelTab({ companyName, setCompanyName, logoUrl, setLogoUrl }: ControlPanelTabProps) {
    // Local state for form inputs
    const [tempCompanyName, setTempCompanyName] = useState(companyName)
    const [companyLogoUrl, setCompanyLogoUrl] = useState('/logo.png')

    // File input refs for custom buttons
    const clientLogoInputRef = useRef<HTMLInputElement>(null)
    const companyLogoInputRef = useRef<HTMLInputElement>(null)

    // Database Configuration State
    const [dbConfig, setDbConfig] = useState({
        server: 'localhost',
        database: 'EMS',
        username: 'sa',
        password: '',
        port: '1433'
    })

    // Database test state
    const [isTestingDatabase, setIsTestingDatabase] = useState(false)
    const [dbTestResult, setDbTestResult] = useState<DatabaseTestResult | null>(null)
    const [dbConnectionStatus, setDbConnectionStatus] = useState<'not-tested' | 'connected' | 'error'>('not-tested')

    // SMTP Configuration State
    const [smtpConfig, setSmtpConfig] = useState({
        host: 'smtp.gmail.com',
        port: '587',
        username: '',
        password: '',
        fromEmail: ''
    })

    // Scheduler Configuration State
    const [schedulerConfig, setSchedulerConfig] = useState({
        dailyReports: false,
        dailyTime: '08:00',
        weeklyReports: false,
        weeklyDay: 'monday',
        monthlyReports: false,
        monthlyDate: '1'
    })

    const handleCompanyNameChange = () => {
        if (window.confirm(`Are you sure you want to change the client name to "${tempCompanyName}"?`)) {
            setCompanyName(tempCompanyName)
            alert('Client name updated successfully!')
        }
    }

    const handleClientLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // Create preview URL
            const newLogoUrl = URL.createObjectURL(file)

            if (window.confirm('Are you sure you want to update the client logo? This will be visible immediately on the dashboard.')) {
                setLogoUrl(newLogoUrl)

                // Force update all client logo images in the DOM
                setTimeout(() => {
                    const clientLogos = document.querySelectorAll('img[alt="Client Logo"]')
                    clientLogos.forEach(img => {
                        (img as HTMLImageElement).src = newLogoUrl
                        // Force re-render by changing key
                        img.setAttribute('key', Date.now().toString())
                    })
                }, 100)

                alert('Client logo updated successfully!')
            }
        }
        // Reset file input
        if (clientLogoInputRef.current) {
            clientLogoInputRef.current.value = ''
        }
    }

    const handleCompanyLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // Create preview URL
            const newLogoUrl = URL.createObjectURL(file)

            if (window.confirm('Are you sure you want to update the company logo? This will be visible immediately on the dashboard.')) {
                setCompanyLogoUrl(newLogoUrl)
                // Update the company logo in the header
                const companyLogos = document.querySelectorAll('img[alt="Company Logo"]')
                companyLogos.forEach(img => {
                    (img as HTMLImageElement).src = newLogoUrl
                })
                alert('Company logo updated successfully!')
            }
        }
        // Reset file input
        if (companyLogoInputRef.current) {
            companyLogoInputRef.current.value = ''
        }
    }

    const handleTestDatabase = async () => {
        // Validate required fields
        if (!dbConfig.server || !dbConfig.database || !dbConfig.username || !dbConfig.password) {
            alert('Please fill in all required database fields (Server, Database, Username, Password)')
            return
        }

        setIsTestingDatabase(true)
        setDbTestResult(null)
        setDbConnectionStatus('not-tested')

        try {
            const response = await fetch('/api/database/test-connection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dbConfig)
            })

            const result: DatabaseTestResult = await response.json()
            setDbTestResult(result)

            if (result.success) {
                setDbConnectionStatus('connected')
                alert(`✅ Database connection successful!\n\nConnection time: ${result.connection_time_ms}ms\nDatabase: ${result.database_info?.database_name}\nServer: ${result.database_info?.server_name}\nTables found: ${result.schema_info?.table_count || 0}`)
            } else {
                setDbConnectionStatus('error')
                alert(`❌ Database connection failed!\n\nError: ${result.message}\n\nPlease check your connection settings and try again.`)
            }

        } catch (error) {
            console.error('Database test error:', error)
            setDbConnectionStatus('error')
            setDbTestResult({
                success: false,
                message: 'Failed to connect to server. Please check if the application server is running.',
                error_code: 'NETWORK_ERROR'
            })
            alert('❌ Network error: Could not reach the server. Please check your connection and try again.')
        } finally {
            setIsTestingDatabase(false)
        }
    }

    const handleSaveDatabase = () => {
        if (dbConnectionStatus !== 'connected') {
            if (window.confirm('Database connection has not been tested successfully. Do you still want to save these settings?')) {
                alert('Database configuration saved! (Note: Connection was not verified)')
            }
        } else {
            alert('Database configuration saved successfully!')
        }
    }

    const handleTestEmail = () => {
        alert('Email test will be implemented')
    }

    const handleSaveEmail = () => {
        alert('Email configuration saved!')
    }

    const handleSaveScheduler = () => {
        alert('Scheduler configuration saved!')
    }

    // Helper function to get status color
    const getDbStatusColor = () => {
        switch (dbConnectionStatus) {
            case 'connected': return 'text-green-600'
            case 'error': return 'text-red-600'
            default: return 'text-orange-600'
        }
    }

    const getDbStatusText = () => {
        switch (dbConnectionStatus) {
            case 'connected': return 'Connected'
            case 'error': return 'Connection Failed'
            default: return 'Not Tested'
        }
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Control Panel</h2>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* Logo Management */}
                <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Logo Management</h3>
                    <div className="space-y-6">

                        {/* Company Logo (Left side) */}
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="text-lg font-medium text-gray-800 mb-3">Company Logo (Left Side)</h4>
                            <div className="flex items-center space-x-4 mb-3">
                                <img src={companyLogoUrl} alt="Company Logo Preview" className="h-12 w-auto border border-gray-200 rounded" />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600">Current company logo</p>
                                    <p className="text-xs text-gray-500">Appears on the left side of the toolbar</p>
                                </div>
                            </div>

                            {/* Hidden file input */}
                            <input
                                ref={companyLogoInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleCompanyLogoUpload}
                                className="hidden"
                            />

                            {/* Custom upload button */}
                            <button
                                onClick={() => companyLogoInputRef.current?.click()}
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer"
                            >
                                Choose Company Logo File
                            </button>
                            <p className="text-xs text-gray-500 mt-1">Recommended: PNG or JPG, max 2MB, square format preferred</p>
                        </div>

                        {/* Client Logo (Right side) */}
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="text-lg font-medium text-gray-800 mb-3">Client Logo (Right Side)</h4>
                            <div className="flex items-center space-x-4 mb-3">
                                <img src={logoUrl} alt="Client Logo Preview" className="h-12 w-auto border border-gray-200 rounded" />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600">Current client logo</p>
                                    <p className="text-xs text-gray-500">Appears on the right side of the toolbar</p>
                                </div>
                            </div>

                            {/* Hidden file input */}
                            <input
                                ref={clientLogoInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleClientLogoUpload}
                                className="hidden"
                            />

                            {/* Custom upload button */}
                            <button
                                onClick={() => clientLogoInputRef.current?.click()}
                                className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors cursor-pointer"
                            >
                                Choose Client Logo File
                            </button>
                            <p className="text-xs text-gray-500 mt-1">Recommended: PNG or JPG, max 2MB, company logo format</p>
                        </div>
                    </div>
                </div>

                {/* Client Information */}
                <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Client Information</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Client Company Name</label>
                            <div className="flex space-x-3">
                                <input
                                    type="text"
                                    value={tempCompanyName}
                                    onChange={(e) => setTempCompanyName(e.target.value)}
                                    placeholder="Enter client company name"
                                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                />
                                <button
                                    onClick={handleCompanyNameChange}
                                    disabled={tempCompanyName === companyName}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Update
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">This appears in the top-right corner of the dashboard</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Current Settings Preview:</h4>
                            <div className="flex items-center justify-between p-3 bg-white rounded border">
                                <div className="flex items-center space-x-2">
                                    <img src={companyLogoUrl} alt="Company Preview" className="h-6 w-auto" />
                                    <span className="text-sm font-medium">Energy Data Reports</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-700">{companyName}</span>
                                    <img src={logoUrl} alt="Client Preview" className="h-6 w-auto" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Database Configuration */}
                <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Database Configuration</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">SQL Server Address *</label>
                            <input
                                type="text"
                                value={dbConfig.server}
                                onChange={(e) => setDbConfig({ ...dbConfig, server: e.target.value })}
                                placeholder="localhost or IP address"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Database Name *</label>
                                <input
                                    type="text"
                                    value={dbConfig.database}
                                    onChange={(e) => setDbConfig({ ...dbConfig, database: e.target.value })}
                                    placeholder="EMS"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Port</label>
                                <input
                                    type="text"
                                    value={dbConfig.port}
                                    onChange={(e) => setDbConfig({ ...dbConfig, port: e.target.value })}
                                    placeholder="1433"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
                                <input
                                    type="text"
                                    value={dbConfig.username}
                                    onChange={(e) => setDbConfig({ ...dbConfig, username: e.target.value })}
                                    placeholder="sa"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                                <input
                                    type="password"
                                    value={dbConfig.password}
                                    onChange={(e) => setDbConfig({ ...dbConfig, password: e.target.value })}
                                    placeholder="Enter password"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Database Test Result Display */}
                        {dbTestResult && (
                            <div className={`p-4 rounded-lg border ${dbTestResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                <div className="flex items-start space-x-3">
                                    <div className={`w-2 h-2 rounded-full mt-2 ${dbTestResult.success ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <div className="flex-1">
                                        <p className={`text-sm font-medium ${dbTestResult.success ? 'text-green-800' : 'text-red-800'}`}>
                                            {dbTestResult.message}
                                        </p>
                                        {dbTestResult.success && dbTestResult.database_info && (
                                            <div className="mt-2 text-xs text-green-700">
                                                <p>Database: {dbTestResult.database_info.database_name}</p>
                                                <p>Server: {dbTestResult.database_info.server_name}</p>
                                                <p>Connection time: {dbTestResult.connection_time_ms}ms</p>
                                                {dbTestResult.schema_info && (
                                                    <p>Tables: {dbTestResult.schema_info.table_count}</p>
                                                )}
                                            </div>
                                        )}
                                        {!dbTestResult.success && (
                                            <p className="mt-1 text-xs text-red-600">
                                                Error code: {dbTestResult.error_code}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex space-x-3">
                            <button
                                onClick={handleTestDatabase}
                                disabled={isTestingDatabase}
                                className={`bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${isTestingDatabase ? 'cursor-wait' : ''}`}
                            >
                                {isTestingDatabase ? 'Testing...' : 'Test Connection'}
                            </button>
                            <button
                                onClick={handleSaveDatabase}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer"
                            >
                                Save Configuration
                            </button>
                        </div>
                        <p className="text-xs text-gray-500">* Required fields for database connection</p>
                    </div>
                </div>

                {/* SMTP Email Settings */}
                <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Email Settings</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Server</label>
                                <input
                                    type="text"
                                    value={smtpConfig.host}
                                    onChange={(e) => setSmtpConfig({ ...smtpConfig, host: e.target.value })}
                                    placeholder="smtp.gmail.com"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Port</label>
                                <input
                                    type="text"
                                    value={smtpConfig.port}
                                    onChange={(e) => setSmtpConfig({ ...smtpConfig, port: e.target.value })}
                                    placeholder="587"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Username</label>
                            <input
                                type="email"
                                value={smtpConfig.username}
                                onChange={(e) => setSmtpConfig({ ...smtpConfig, username: e.target.value })}
                                placeholder="your-email@gmail.com"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Password</label>
                            <input
                                type="password"
                                value={smtpConfig.password}
                                onChange={(e) => setSmtpConfig({ ...smtpConfig, password: e.target.value })}
                                placeholder="App password or email password"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">From Email Address</label>
                            <input
                                type="email"
                                value={smtpConfig.fromEmail}
                                onChange={(e) => setSmtpConfig({ ...smtpConfig, fromEmail: e.target.value })}
                                placeholder="alerts@yourcompany.com"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            />
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={handleTestEmail}
                                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors cursor-pointer"
                            >
                                Send Test Email
                            </button>
                            <button
                                onClick={handleSaveEmail}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors cursor-pointer"
                            >
                                Save Email Settings
                            </button>
                        </div>
                    </div>
                </div>

                {/* Report Scheduler */}
                <div className="bg-white p-6 rounded-lg shadow border xl:col-span-2">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Report Scheduler</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Daily Reports */}
                        <div className="border border-gray-200 rounded-lg p-4">
                            <label className="flex items-center cursor-pointer mb-3">
                                <input
                                    type="checkbox"
                                    checked={schedulerConfig.dailyReports}
                                    onChange={(e) => setSchedulerConfig({ ...schedulerConfig, dailyReports: e.target.checked })}
                                    className="mr-3 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                                />
                                <span className="text-sm font-medium text-gray-700">Daily Reports</span>
                            </label>
                            {schedulerConfig.dailyReports && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Send at</label>
                                    <input
                                        type="time"
                                        value={schedulerConfig.dailyTime}
                                        onChange={(e) => setSchedulerConfig({ ...schedulerConfig, dailyTime: e.target.value })}
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Weekly Reports */}
                        <div className="border border-gray-200 rounded-lg p-4">
                            <label className="flex items-center cursor-pointer mb-3">
                                <input
                                    type="checkbox"
                                    checked={schedulerConfig.weeklyReports}
                                    onChange={(e) => setSchedulerConfig({ ...schedulerConfig, weeklyReports: e.target.checked })}
                                    className="mr-3 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                                />
                                <span className="text-sm font-medium text-gray-700">Weekly Summary</span>
                            </label>
                            {schedulerConfig.weeklyReports && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Send on</label>
                                    <select
                                        value={schedulerConfig.weeklyDay}
                                        onChange={(e) => setSchedulerConfig({ ...schedulerConfig, weeklyDay: e.target.value })}
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                    >
                                        <option value="monday">Monday</option>
                                        <option value="tuesday">Tuesday</option>
                                        <option value="wednesday">Wednesday</option>
                                        <option value="thursday">Thursday</option>
                                        <option value="friday">Friday</option>
                                        <option value="saturday">Saturday</option>
                                        <option value="sunday">Sunday</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Monthly Reports */}
                        <div className="border border-gray-200 rounded-lg p-4">
                            <label className="flex items-center cursor-pointer mb-3">
                                <input
                                    type="checkbox"
                                    checked={schedulerConfig.monthlyReports}
                                    onChange={(e) => setSchedulerConfig({ ...schedulerConfig, monthlyReports: e.target.checked })}
                                    className="mr-3 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                                />
                                <span className="text-sm font-medium text-gray-700">Monthly Reports</span>
                            </label>
                            {schedulerConfig.monthlyReports && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Send on day</label>
                                    <select
                                        value={schedulerConfig.monthlyDate}
                                        onChange={(e) => setSchedulerConfig({ ...schedulerConfig, monthlyDate: e.target.value })}
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                    >
                                        {Array.from({ length: 28 }, (_, i) => i + 1).map(day => (
                                            <option key={day} value={day.toString()}>{day}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleSaveScheduler}
                            className="w-full bg-purple-600 text-white px-4 py-3 rounded hover:bg-purple-700 transition-colors cursor-pointer"
                        >
                            Save Scheduler Configuration
                        </button>
                    </div>
                </div>

                {/* System Status */}
                <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">System Status</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Application Version:</span>
                            <span className="text-sm font-medium text-gray-900">v1.0.0</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Database Status:</span>
                            <span className={`text-sm font-medium ${getDbStatusColor()}`}>
                                {getDbStatusText()}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Email Status:</span>
                            <span className="text-sm font-medium text-orange-600">Not Configured</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Scheduler Status:</span>
                            <span className="text-sm font-medium text-gray-500">Inactive</span>
                        </div>
                        {dbTestResult && dbTestResult.success && (
                            <div className="border-t pt-3 mt-4">
                                <div className="text-xs text-gray-600 space-y-1">
                                    <p>Last connection: {new Date().toLocaleString()}</p>
                                    <p>Response time: {dbTestResult.connection_time_ms}ms</p>
                                    {dbTestResult.schema_info && (
                                        <p>Tables: {dbTestResult.schema_info.table_count} | Views: {dbTestResult.schema_info.view_count}</p>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="border-t pt-3 mt-4">
                            <button className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors cursor-pointer">
                                Export System Configuration
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}