import authService from './authService'
import influencerService from './influencerService'
import bookingService from './bookingService'
import matchingService from './matchingService'
import userService from './userService'
import { supabase } from './supabaseClient'

/**
 * Export all services
 * This is the main entry point for all API calls
 */

export {
  supabase,
  authService,
  influencerService,
  bookingService,
  matchingService,
  userService
}

// Convenience export
export const api = {
  auth: authService,
  influencer: influencerService,
  booking: bookingService,
  matching: matchingService,
  user: userService
}

export default api
