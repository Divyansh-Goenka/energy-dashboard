// File: src/lib/auth.ts
// Authentication utilities for the energy dashboard

export interface AuthState {
    userRole: 'admin' | 'client' | null
    userId: string | null
    userEmail: string | null
    userName: string | null
    clientId: string | null
    authToken: string | null
    isAuthenticated: boolean
}

// Get current authentication state
export function getAuthState(): AuthState {
    if (typeof window === 'undefined') {
        return {
            userRole: null,
            userId: null,
            userEmail: null,
            userName: null,
            clientId: null,
            authToken: null,
            isAuthenticated: false
        }
    }

    try {
        // Try sessionStorage first
        const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true'
        if (isAuthenticated) {
            return {
                userRole: sessionStorage.getItem('userRole') as 'admin' | 'client' | null,
                userId: sessionStorage.getItem('userId'),
                userEmail: sessionStorage.getItem('userEmail'),
                userName: sessionStorage.getItem('userName'),
                clientId: sessionStorage.getItem('clientId'),
                authToken: sessionStorage.getItem('authToken'),
                isAuthenticated: true
            }
        }
    } catch (error) {
        console.warn('SessionStorage not available, checking fallback')
    }

    // Fallback to global variable
    try {
        const globalAuth = (window as any).__authState
        if (globalAuth && globalAuth.isAuthenticated) {
            return globalAuth
        }
    } catch (error) {
        console.warn('Global auth state not available')
    }

    return {
        userRole: null,
        userId: null,
        userEmail: null,
        userName: null,
        clientId: null,
        authToken: null,
        isAuthenticated: false
    }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
    return getAuthState().isAuthenticated
}

// Check if user is admin
export function isAdmin(): boolean {
    const auth = getAuthState()
    return auth.isAuthenticated && auth.userRole === 'admin'
}

// Check if user is client
export function isClient(): boolean {
    const auth = getAuthState()
    return auth.isAuthenticated && auth.userRole === 'client'
}

// Get user info
export function getUserInfo() {
    const auth = getAuthState()
    if (!auth.isAuthenticated) return null

    return {
        id: auth.userId,
        email: auth.userEmail,
        name: auth.userName,
        role: auth.userRole,
        clientId: auth.clientId
    }
}

// Logout function
export function logout() {
    if (typeof window !== 'undefined') {
        try {
            // Clear sessionStorage
            sessionStorage.removeItem('userRole')
            sessionStorage.removeItem('userId')
            sessionStorage.removeItem('userEmail')
            sessionStorage.removeItem('userName')
            sessionStorage.removeItem('clientId')
            sessionStorage.removeItem('authToken')
            sessionStorage.removeItem('isAuthenticated')
        } catch (error) {
            console.warn('Could not clear sessionStorage')
        }

        try {
            // Clear global state
            delete (window as any).__authState
        } catch (error) {
            console.warn('Could not clear global auth state')
        }
    }
}

// Get authorization header for API calls
export function getAuthHeaders(): Record<string, string> {
    const auth = getAuthState()
    if (!auth.isAuthenticated || !auth.authToken) {
        return {}
    }

    return {
        'Authorization': `Bearer ${auth.authToken}`
    }
}