import { supabase } from './supabaseClient'

/**
 * Authentication Service
 * Handles user login, registration, and session management
 */

export const authService = {
  /**
   * Register new user
   */
  async register(email, password, userData) {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: userData.user_type,
            name: userData.name,
          }
        }
      })

      if (authError) throw authError

      // Create user profile
      if (authData.user) {
        // Build user object dengan hanya field yang diperlukan
        const userObj = {
          id: authData.user.id,
          email,
          name: userData.name,
          user_type: userData.user_type,
          phone: userData.phone || null,
          location: userData.location || null,
          is_active: true,
          // Password tidak disimpan di database, hanya di Supabase Auth
          // profile_image_url, bio, created_at akan handle oleh Supabase
        }

        const { error: profileError } = await supabase
          .from('users')
          .insert([userObj])

        if (profileError) {
          console.error('Profile creation error:', profileError)
          throw profileError
        }

        // Create influencer profile if user is influencer
        if (userData.user_type === 'influencer' && userData.niche) {
          const { error: influencerError } = await supabase
            .from('influencers')
            .insert([
              {
                user_id: authData.user.id,
                niche: userData.niche,
                price_per_post: 0, // Default price, can be updated later
                currency: 'USD',
                engagement_rate: 0,
                followers_count: 0,
                rating: 0,
                total_reviews: 0,
              }
            ])

          if (influencerError) {
            console.error('Error creating influencer profile:', influencerError)
            // Don't throw, user can still use the account
          }
        }

        // Sign out the user after registration so they're not automatically logged in
        // User must login manually after registration
        await supabase.auth.signOut()
      }

      return { user: authData.user, error: null }
    } catch (error) {
      return { user: null, error: error.message }
    }
  },

  /**
   * Login user
   */
  async login(email, password) {
    try {
      const trimmedEmail = email.trim().toLowerCase()
      const trimmedPassword = password.trim()
      
      console.log('🔐 Login attempt:', { email: trimmedEmail, password: '***' })
      console.log('📡 Supabase client:', { url: supabase.supabaseUrl, hasKey: !!supabase.supabaseKey })
      
      // CHECK: Apakah user ada di users table?
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, email, name')
        .eq('email', trimmedEmail)
        .single()
      
      if (userError) {
        console.warn('⚠️ User tidak ditemukan di users table:', userError)
        console.log('Email yang dicari:', trimmedEmail)
      } else {
        console.log('✅ User ditemukan di database:', userData)
      }
      
      // Attempt login dengan Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password: trimmedPassword
      })

      if (error) {
        console.error('❌ Login error dari Supabase Auth:', error)
        console.error('Error status:', error.status)
        console.error('Error message:', error.message)
        console.log('📝 Full error object:', JSON.stringify(error, null, 2))
        throw error
      }
      
      console.log('✅ Login success:', data.user?.email)
      return { user: data.user, error: null }
    } catch (error) {
      console.error('❌ Login exception:', error.message)
      return { user: null, error: error.message }
    }
  },

  /**
   * Login with OAuth provider
   */
  async loginWithProvider(provider) {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Logout user
   */
  async logout() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error.message }
    }
  },

  /**
   * Get current user session
   */
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return { user, error: null }
    } catch (error) {
      return { user: null, error: error.message }
    }
  },

  /**
   * Reset password
   */
  async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error.message }
    }
  },

  /**
   * Listen to auth state changes
   */
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }
}

export default authService
