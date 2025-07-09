// File: src/app/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function HomePage() {
    const router = useRouter()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null // Prevent hydration mismatch
    }

    const handleLogin = () => {
        router.push('/login')
    }

    const handleSignup = () => {
        // For now, redirect to login page (you can create a signup page later)
        router.push('/login')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            {/* Navigation Header */}
            <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <img 
                                src="/logo.png" 
                                alt="Company Logo" 
                                className="h-8 w-auto"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none'
                                }}
                            />
                            <span className="text-xl font-bold text-gray-900">Energy Dashboard</span>
                        </div>
                        
                        {/* Login/Signup Buttons */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleLogin}
                                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                            >
                                Login
                            </button>
                            <button
                                onClick={handleSignup}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center py-20">
                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Energy 
                        <span className="text-blue-600"> Management</span>
                        <br />
                        <span className="text-green-600">Made Simple</span>
                    </h1>
                    
                    {/* Subtitle */}
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Monitor, analyze, and optimize your energy consumption with our comprehensive 
                        dashboard. Real-time data, detailed analytics, and powerful insights at your fingertips.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <button
                            onClick={handleLogin}
                            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                        >
                            Get Started
                        </button>
                        <button
                            onClick={() => {
                                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                            className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
                        >
                            Learn More
                        </button>
                    </div>

                    {/* Demo Accounts Info */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Demo Accounts Available</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-medium text-blue-800 mb-2">Administrator Access</h4>
                                <p className="text-blue-700 font-mono text-xs">admin@energydash.com</p>
                                <p className="text-blue-600 text-xs">Full system access + database testing</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h4 className="font-medium text-green-800 mb-2">Client Access</h4>
                                <p className="text-green-700 font-mono text-xs">client@abc-corp.com</p>
                                <p className="text-green-600 text-xs">Energy dashboard and reporting</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="py-20">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Powerful Energy Management Features
                    </h2>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-Time Monitoring</h3>
                            <p className="text-gray-600">
                                Track energy consumption in real-time with 15-minute interval data. 
                                Monitor trends and identify anomalies instantly.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">📈</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Analytics</h3>
                            <p className="text-gray-600">
                                Detailed hourly and daily reports with comprehensive analytics. 
                                Export data and generate custom reports.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">⚙️</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">System Management</h3>
                            <p className="text-gray-600">
                                Admin control panel for database configuration, user management, 
                                and system settings. Complete administrative control.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <img 
                                src="/logo.png" 
                                alt="Company Logo" 
                                className="h-8 w-auto"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none'
                                }}
                            />
                            <span className="text-xl font-bold">Energy Dashboard</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Empowering businesses with intelligent energy management solutions
                        </p>
                        <p className="text-gray-500 text-sm">
                            © 2024 Energy Management System. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}