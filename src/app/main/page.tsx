// File: src/app/main/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { EnergyDataTab } from '../../components/energy/EnergyDataTab'
import { HourlyDataTab } from '../../components/energy/HourlyDataTab'
import { DetailedDataTab } from '../../components/energy/DetailedDataTab'
import { ControlPanelTab } from '../../components/admin/ControlPanelTab'
import { getAuthState, isAuthenticated, isAdmin, getUserInfo, logout } from '../../lib/auth'

interface User {
    name: string
    email: string
    role: 'admin' | 'client'
    id: string
    clientId?: string | null
}

export default function ClientDashboard() {
    const [activeTab, setActiveTab] = useState('15min')
    const [user, setUser] = useState<User | null>(null)
    const [companyName, setCompanyName] = useState('Shiv Edibles')
    const [logoUrl, setLogoUrl] = useState('/logo.png')
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Check authentication using the new auth utilities
        if (!isAuthenticated()) {
            router.push('/login')
            return
        }

        const userInfo = getUserInfo()
        if (userInfo) {
            setUser({
                name: userInfo.name || 'Unknown User',
                email: userInfo.email || 'unknown@email.com',
                role: userInfo.role || 'client',
                id: userInfo.id || '',
                clientId: userInfo.clientId
            })

            // Set company name based on client ID for client users
            if (userInfo.role === 'client' && userInfo.clientId) {
                switch (userInfo.clientId) {
                    case 'abc-corp':
                        setCompanyName('ABC Corporation')
                        break
                    case 'xyz-industries':
                        setCompanyName('XYZ Industries')
                        break
                    case 'test-company':
                        setCompanyName('Test Company Ltd.')
                        break
                    default:
                        setCompanyName('Shiv Edibles') // Default company name
                }
            }
        }

        setIsLoading(false)
    }, [router])

    const handleLogout = () => {
        // Use the new logout function
        logout()
        router.push('/login')
    }

    // Show loading spinner while checking authentication
    if (isLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        )
    }

    // Define tabs based on user role
    const tabs = [
        { id: '15min', name: '15-Minute Data', icon: '📊' },
        { id: 'hourly', name: 'Hourly Data', icon: '⏰' },
        { id: 'detailed', name: 'Detailed Data', icon: '📈' },
        // Only show Control Panel for admin users
        ...(isAdmin() ? [{ id: 'control', name: 'Control Panel', icon: '⚙️' }] : [])
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Enhanced Header/Toolbar */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Left: Company Logo */}
                        <div className="flex items-center space-x-3">
                            <img
                                src="/logo.png"
                                alt="Company Logo"
                                className="h-8 w-auto"
                                onError={(e) => {
                                    // Fallback if logo doesn't exist
                                    (e.target as HTMLImageElement).style.display = 'none'
                                }}
                            />
                        </div>

                        {/* Center: Title */}
                        <div className="flex-1 text-center">
                            <h1 className="text-2xl font-bold text-gray-900">Energy Data Reports</h1>
                            {/* Show role indicator for admin users */}
                            {isAdmin() && (
                                <p className="text-xs text-blue-600 font-medium">Administrator Mode</p>
                            )}
                        </div>

                        {/* Right: Client Info and User Actions */}
                        <div className="flex items-center space-x-6">
                            {/* Client Name and Logo */}
                            <div className="flex items-center space-x-3">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">{companyName}</p>
                                    {user.role === 'admin' && (
                                        <p className="text-xs text-blue-600">System Admin</p>
                                    )}
                                </div>
                                <img
                                    src={logoUrl}
                                    alt="Client Logo"
                                    className="h-8 w-auto"
                                    key={logoUrl} // Forces re-render when logoUrl changes
                                    onError={(e) => {
                                        // Fallback if client logo doesn't exist
                                        (e.target as HTMLImageElement).src = '/logo.png'
                                    }}
                                />
                            </div>

                            {/* User Info and Logout */}
                            <div className="text-right">
                                <div className="flex items-center space-x-3">
                                    {/* User Info */}
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>

                                    {/* Logout Button */}
                                    <button
                                        onClick={handleLogout}
                                        className="bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700 transition-colors cursor-pointer flex items-center space-x-1"
                                        title="Sign out of your account"
                                    >
                                        <span>Logout</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Tab Navigation */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors cursor-pointer ${activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                title={tab.id === 'control' ? 'Admin only - Database and system configuration' : `View ${tab.name.toLowerCase()}`}
                            >
                                <span className="text-lg">{tab.icon}</span>
                                <span>{tab.name}</span>
                                {/* Admin indicator for control panel */}
                                {tab.id === 'control' && (
                                    <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">Admin</span>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Tab Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {/* Energy Data Tabs - Available to all authenticated users */}
                    {activeTab === '15min' && <EnergyDataTab frequency="15min" />}
                    {activeTab === 'hourly' && <HourlyDataTab frequency="hourly" />}
                    {activeTab === 'detailed' && <DetailedDataTab frequency="detailed" />}

                    {/* Control Panel - Admin Only */}
                    {activeTab === 'control' && isAdmin() && (
                        <ControlPanelTab
                            companyName={companyName}
                            setCompanyName={setCompanyName}
                            logoUrl={logoUrl}
                            setLogoUrl={setLogoUrl}
                        />
                    )}

                    {/* Access denied message for non-admin users trying to access control panel */}
                    {activeTab === 'control' && !isAdmin() && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 text-red-500">
                                <svg fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-red-800 mb-2">Access Denied</h3>
                            <p className="text-red-600">You need administrator privileges to access the Control Panel.</p>
                            <p className="text-sm text-red-500 mt-2">Please contact your system administrator if you need access to database configuration and system settings.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer with system info */}
            <footer className="bg-white border-t mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <div>
                            <span>Energy Dashboard v1.0.0</span>
                            {isAdmin() && (
                                <span className="ml-4 text-blue-600">Admin Mode Active</span>
                            )}
                        </div>
                        <div>
                            <span>User: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}