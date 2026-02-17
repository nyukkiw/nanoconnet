import React, { createContext, useContext, useEffect, useState } from 'react'
import { authService } from './index'

// Create Auth Context
const AuthContext = createContext()

/**
 * Auth Provider Component
 * Wraps app and provides auth state to all components
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check user on mount
  useEffect(() => {
    checkUser()
    
    // Subscribe to auth changes
    const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
      if (session?.user) {
        loadUserProfile(session.user.id)
      }
    })

    return () => subscription?.unsubscribe()
  }, [])

  const checkUser = async () => {
    try {
      setLoading(true)
      const { user, error } = await authService.getCurrentUser()
      if (error) throw error
      
      setUser(user)
      if (user) {
        await loadUserProfile(user.id)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const loadUserProfile = async (userId) => {
    try {
      const { userService } = await import('./index')
      const { data: profile, error } = await userService.getUserProfile(userId)
      if (error) throw error
      setUserProfile(profile)
    } catch (err) {
      console.error('Error loading profile:', err)
    }
  }

  const value = {
    user,
    userProfile,
    loading,
    error,
    isAuthenticated: !!user,
    sign: {
      login: async (email, password) => {
        const result = await authService.login(email, password)
        if (!result.error && result.user) {
          setUser(result.user)
          await loadUserProfile(result.user.id)
        }
        return result
      },
      register: async (email, password, userData) => {
        const result = await authService.register(email, password, userData)
        if (!result.error && result.user) {
          setUser(result.user)
          await loadUserProfile(result.user.id)
        }
        return result
      },
      logout: async () => {
        const result = await authService.logout()
        if (!result.error) {
          setUser(null)
          setUserProfile(null)
        }
        return result
      }
    },
    updateProfile: async (updates) => {
      if (!user) return { error: 'No user logged in' }
      const { userService } = await import('./index')
      const result = await userService.updateUserProfile(user.id, updates)
      if (!result.error) {
        await loadUserProfile(user.id)
      }
      return result
    }
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook to use auth context
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export default AuthContext
