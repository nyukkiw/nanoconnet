import { supabase } from './supabaseClient'

/**
 * Booking Service
 * Handles booking and collaboration operations
 */

export const bookingService = {
  /**
   * Create new booking request
   */
  async createBooking(bookingData) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            sme_id: bookingData.smeId,
            influencer_id: bookingData.influencerId,
            campaign_name: bookingData.campaignName,
            budget: bookingData.budget,
            num_posts: bookingData.numPosts,
            start_date: bookingData.startDate,
            end_date: bookingData.endDate,
            description: bookingData.description,
            status: 'pending'
          }
        ])
        .select()

      if (error) throw error
      return { data: data?.[0], error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Get bookings for user
   */
  async getUserBookings(userId, userType = 'sme') {
    try {
      const column = userType === 'sme' ? 'sme_id' : 'influencer_id'
      
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          campaign_name,
          budget,
          num_posts,
          start_date,
          end_date,
          description,
          status,
          created_at,
          ${userType === 'sme' ? 'influencers (id, niche, price_per_post, users(name, profile_image_url))' : 'smes (id, name, users(profile_image_url))'}
        `)
        .eq(column, userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Get single booking details
   */
  async getBookingById(bookingId) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          campaign_name,
          budget,
          num_posts,
          start_date,
          end_date,
          description,
          status,
          created_at,
          smes (id, name, users(name, profile_image_url, email)),
          influencers (id, niche, price_per_post, users(name, profile_image_url, email))
        `)
        .eq('id', bookingId)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Update booking status
   */
  async updateBookingStatus(bookingId, status) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status, updated_at: new Date() })
        .eq('id', bookingId)
        .select()

      if (error) throw error
      return { data: data?.[0], error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Cancel booking
   */
  async cancelBooking(bookingId, reason = '') {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ 
          status: 'cancelled',
          cancellation_reason: reason,
          updated_at: new Date() 
        })
        .eq('id', bookingId)
        .select()

      if (error) throw error
      return { data: data?.[0], error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  }
}

export default bookingService
