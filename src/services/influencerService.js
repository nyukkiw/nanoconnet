import { supabase } from './supabaseClient'

/**
 * Influencer Service
 * Handles influencer data operations
 */

export const influencerService = {
  /**
   * Get all influencers with optional filters
   */
  async getInfluencers(filters = {}) {
    try {
      let query = supabase
        .from('influencers')
        .select(`
          id,
          user_id,
          followers_count,
          engagement_rate,
          niche,
          price_per_post,
          currency,
          bio_extended,
          instagram_handle,
          tiktok_handle,
          youtube_channel,
          rating,
          total_reviews,
          users (id, name, profile_image_url, location)
        `)

      // Apply filters
      if (filters.niche) {
        query = query.eq('niche', filters.niche)
      }
      if (filters.minPrice && filters.maxPrice) {
        query = query.gte('price_per_post', filters.minPrice)
          .lte('price_per_post', filters.maxPrice)
      }
      if (filters.location) {
        query = query.eq('users.location', filters.location)
      }
      if (filters.minEngagement) {
        query = query.gte('engagement_rate', filters.minEngagement)
      }

      // Sort by rating
      query = query.order('rating', { ascending: false })

      const { data, error } = await query

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Get single influencer by ID
   */
  async getInfluencerById(id) {
    try {
      const { data, error } = await supabase
        .from('influencers')
        .select(`
          id,
          user_id,
          followers_count,
          engagement_rate,
          niche,
          price_per_post,
          currency,
          bio_extended,
          instagram_handle,
          tiktok_handle,
          youtube_channel,
          collaboration_rate,
          response_time_hours,
          previous_collaborations,
          rating,
          total_reviews,
          users (id, name, profile_image_url, location, bio, phone)
        `)
        .eq('id', id)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Search influencers by name
   */
  async searchInfluencers(searchTerm) {
    try {
      const { data, error } = await supabase
        .from('influencers')
        .select(`
          id,
          niche,
          price_per_post,
          rating,
          users (name, profile_image_url)
        `)
        .ilike('users.name', `%${searchTerm}%`)
        .limit(10)

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Get influencer reviews
   */
  async getInfluencerReviews(influencerId) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          id,
          rating,
          comment,
          created_at,
          users (name, profile_image_url)
        `)
        .eq('influencer_id', influencerId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Get top influencers by rating
   */
  async getTopInfluencers(limit = 5) {
    try {
      const { data, error } = await supabase
        .from('influencers')
        .select(`
          id,
          niche,
          price_per_post,
          rating,
          users (name, profile_image_url, location)
        `)
        .order('rating', { ascending: false })
        .limit(limit)

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  }
}

export default influencerService
