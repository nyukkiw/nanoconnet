import { supabase } from './supabaseClient'

/**
 * User Profile Service
 * Handles user profile operations
 */

export const userService = {
  /**
   * Get user profile
   */
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Get influencer profile with details
   */
  async getInfluencerProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('influencers')
        .select(`
          *,
          users(*)
        `)
        .eq('user_id', userId)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Get SME profile with details
   */
  async getSMEProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('smes')
        .select(`
          *,
          users(*)
        `)
        .eq('user_id', userId)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Update user profile
   */
  async updateUserProfile(userId, updates) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()

      if (error) throw error
      return { data: data?.[0], error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Update influencer profile
   */
  async updateInfluencerProfile(userId, updates) {
    try {
      const { data, error } = await supabase
        .from('influencers')
        .update(updates)
        .eq('user_id', userId)
        .select()

      if (error) throw error
      return { data: data?.[0], error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Upload profile image
   */
  async uploadProfileImage(userId, file) {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}-profile.${fileExt}`

      const { data, error } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file, { upsert: true })

      if (error) throw error

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName)

      // Update user profile with image URL
      await this.updateUserProfile(userId, { profile_image_url: publicUrl })

      return { publicUrl, error: null }
    } catch (error) {
      return { publicUrl: null, error: error.message }
    }
  }
}

export default userService
