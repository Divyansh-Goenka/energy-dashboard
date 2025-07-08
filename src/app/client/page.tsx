'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { EnergyDataTab } from '../../components/energy/EnergyDataTab'
import { HourlyDataTab } from '../../components/energy/HourlyDataTab'
import { DetailedDataTab } from '../../components/energy/DetailedDataTab'
import { ControlPanelTab } from '../../components/admin/ControlPanelTab'

export default function ClientDashboard() {
    const [activeTab, setActiveTab] = useState('15min')
    const [user, setUser] = useState<any>(null)
    const [companyName, setCompanyName] = useState('Shiv Edibles')
    const [logoUrl, setLogoUrl] = useState('/logo.png')
    const router = useRouter()

    useEffect(() => {
        // Check if user is logged in
        const userRole = localStorage.getItem('userRole')
        const userName = localStorage.getItem('userName')
        const userEmail = localStorage.getItem('userEmail')

        if (!userRole) {
            router.push('/login')
            return
        }

        setUser({
            name: userName,
            email: userEmail,
            role: userRole
        })
    }, [router])

    const handleLogout = () => {
        localStorage.clear()
        router.push('/login')
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    const tabs = [
        { id: '15min', name: '15-Minute Data', icon: '📊' },
        { id: 'hourly', name: 'Hourly Data', icon: '⏰' },
        { id: 'detailed', name: 'Detailed Data', icon: '📈' },
        ...(user.role === 'admin' ? [{ id: 'control', name: 'Control Panel', icon: '⚙️' }] : [])
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Enhanced Header/Toolbar matching your Streamlit design */}
            {/* Enhanced Header/Toolbar with fixed layout */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Left: Your Company Logo */}
                        <div className="flex items-center space-x-3">
                            <img src="/logo.png" alt="Company Logo" className="h-8 w-auto" />
                        </div>

                        {/* Center: Title */}
                        <div className="flex-1 text-center">
                            <h1 className="text-2xl font-bold text-gray-900">Energy Data Reports</h1>
                        </div>

                        {/* Right: Client Info and Logout */}
                        <div className="flex items-center space-x-6">
                            {/* Client Name and Logo */}
                            <div className="flex items-center space-x-3">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">{companyName}</p>
                                </div>
                                <img
                                    src={logoUrl}
                                    alt="Client Logo"
                                    className="h-8 w-auto"
                                    key={logoUrl} // This forces re-render when logoUrl changes
                                />
                            </div>

                            {/* Logout Button - Extreme Right */}
                            <div className="text-right">
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors cursor-pointer"
                                >
                                    Logout
                                </button>
                                <p className="text-xs text-gray-500 mt-1">{user.name}</p>
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
                            >
                                <span className="text-lg">{tab.icon}</span>
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Tab Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {activeTab === '15min' && <EnergyDataTab frequency="15min" />}
                    {activeTab === 'hourly' && <HourlyDataTab frequency="hourly" />}
                    {activeTab === 'detailed' && <DetailedDataTab frequency="detailed" />}
                    {activeTab === 'control' && user.role === 'admin' && (
                        <ControlPanelTab
                            companyName={companyName}
                            setCompanyName={setCompanyName}
                            logoUrl={logoUrl}
                            setLogoUrl={setLogoUrl}
                        />
                    )}
                </div>
            </main>
        </div>
    )
}