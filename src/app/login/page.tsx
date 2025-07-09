// File: src/app/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Define proper types for TypeScript
interface User {
    id: string
    email: string
    role: 'admin' | 'client'
    name: string
    clientId: string | null
}

interface AuthSuccessResponse {
    success: true
    user: User
    token: string
}

interface AuthFailureResponse {
    success: false
    error?: string
}

type AuthResponse = AuthSuccessResponse | AuthFailureResponse

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    // Enhanced authentication function with more demo accounts
    const authenticateUser = async (email: string, password: string): Promise<AuthResponse> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Demo logic - replace with real database check later
        // Admin accounts (full access including database testing)
        if (email === 'admin@energydash.com' && password === 'admin123') {
            return {
                success: true,
                user: {
                    id: '1',
                    email: email,
                    role: 'admin',
                    name: 'System Administrator',
                    clientId: null
                },
                token: 'demo-admin-token-123'
            }
        }
        // Additional admin account for testing
        else if (email === 'admin@company.com' && password === 'admin456') {
            return {
                success: true,
                user: {
                    id: '10',
                    email: email,
                    role: 'admin',
                    name: 'Admin User',
                    clientId: null
                },
                token: 'demo-admin-token-789'
            }
        }
        // Client accounts (energy dashboard access only)
        else if (email === 'client@abc-corp.com' && password === 'client123') {
            return {
                success: true,
                user: {
                    id: '2',
                    email: email,
                    role: 'client',
                    name: 'ABC Corp User',
                    clientId: 'abc-corp'
                },
                token: 'demo-client-token-456'
            }
        }
        else if (email === 'client@xyz-industries.com' && password === 'client456') {
            return {
                success: true,
                user: {
                    id: '3',
                    email: email,
                    role: 'client',
                    name: 'XYZ Industries User',
                    clientId: 'xyz-industries'
                },
                token: 'demo-client-token-789'
            }
        }
        else if (email === 'user@testcompany.com' && password === 'test123') {
            return {
                success: true,
                user: {
                    id: '4',
                    email: email,
                    role: 'client',
                    name: 'Test Company User',
                    clientId: 'test-company'
                },
                token: 'demo-client-token-999'
            }
        }
        else {
            return {
                success: false,
                error: 'Invalid email or password. Please check your credentials.'
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await authenticateUser(email, password)

            if (response.success) {
                // Store user info in session storage (more reliable than localStorage for artifacts)
                if (typeof window !== 'undefined') {
                    try {
                        sessionStorage.setItem('userRole', response.user.role)
                        sessionStorage.setItem('userId', response.user.id)
                        sessionStorage.setItem('userEmail', response.user.email)
                        sessionStorage.setItem('userName', response.user.name)
                        sessionStorage.setItem('clientId', response.user.clientId || '')
                        sessionStorage.setItem('authToken', response.token)
                        sessionStorage.setItem('isAuthenticated', 'true')
                    } catch (storageError) {
                        console.warn('Session storage not available, using in-memory auth')
                        // Fallback: store in a global variable for the session
                        ;(window as any).__authState = {
                            userRole: response.user.role,
                            userId: response.user.id,
                            userEmail: response.user.email,
                            userName: response.user.name,
                            clientId: response.user.clientId || '',
                            authToken: response.token,
                            isAuthenticated: true
                        }
                    }
                }

                // Redirect to main dashboard regardless of role
                // Role-based content will be handled in the main dashboard
                router.push('/main')

            } else {
                // Type-safe error handling
                setError(response.error || 'Login failed')
            }
        } catch (err) {
            console.error('Login error:', err)
            setError('Login failed. Please try again.')
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                <div className="bg-white shadow-xl rounded-lg p-8">
                    {/* Header with Your Logo */}
                    <div className="text-center mb-8">
                        <div className="mx-auto mb-4">
                            <img
                                src="/logo.png"
                                alt="Company Logo"
                                className="h-20 w-auto mx-auto"
                                onError={(e) => {
                                    // Fallback if logo doesn't exist
                                    (e.target as HTMLImageElement).style.display = 'none'
                                }}
                            />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Energy Dashboard</h2>
                        <p className="mt-2 text-sm text-gray-600">Sign in to access your account</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                                    {error}
                                </div>
                            </div>
                        )}

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Signing in...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 text-center">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="text-xs text-gray-600 space-y-2">
                                <p className="font-medium text-gray-700">Demo Accounts:</p>

                                <div className="border-t pt-2">
                                    <p className="font-medium text-blue-600">Admin Accounts (Full Access + Database Testing):</p>
                                    <p className="font-mono">admin@energydash.com / admin123</p>
                                    <p className="font-mono">admin@company.com / admin456</p>
                                </div>

                                <div className="border-t pt-2">
                                    <p className="font-medium text-green-600">Client Accounts (Energy Dashboard Only):</p>
                                    <p className="font-mono">client@abc-corp.com / client123</p>
                                    <p className="font-mono">client@xyz-industries.com / client456</p>
                                    <p className="font-mono">user@testcompany.com / test123</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* System Info */}
                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-400">
                            Energy Management System v1.0.0
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}