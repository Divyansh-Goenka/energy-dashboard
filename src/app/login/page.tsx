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

    // Demo authentication function (replace with real API later)
    const authenticateUser = async (email: string, password: string): Promise<AuthResponse> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Demo logic - replace with real database check
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
        } else if (email === 'client@abc-corp.com' && password === 'client123') {
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
        } else {
            return {
                success: false,
                error: 'Invalid email or password'
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
                // Store user info for the session
                localStorage.setItem('userRole', response.user.role)
                localStorage.setItem('userId', response.user.id)
                localStorage.setItem('userEmail', response.user.email)
                localStorage.setItem('userName', response.user.name)
                localStorage.setItem('clientId', response.user.clientId || '')
                localStorage.setItem('authToken', response.token)

                // Redirect based on role
                if (response.user.role === 'admin') {
                    router.push('/client') // Admin goes to client dashboard with extra control panel
                } else if (response.user.role === 'client') {
                    router.push('/client')
                }
            } else {
                setError(response.error || 'Login failed')
            }
        } catch (err) {
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
                                {error}
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
                        <div className="text-xs text-gray-500 space-y-1">
                            <p><strong>Demo Accounts:</strong></p>
                            <p>Admin: admin@energydash.com / admin123</p>
                            <p>Client: client@abc-corp.com / client123</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}