import { supabase } from './supabaseClient'

/**
 * Matching Service
 * Handles AI-powered matching algorithm
 */

export const matchingService = {
  /**
   * Calculate match score between SME and Influencer
   */
  async calculateMatchScore(smeId, influencerId) {
    try {
      // Fetch SME data
      const { data: sme, error: smeError } = await supabase
        .from('smes')
        .select('budget, niche, target_audience, location')
        .eq('id', smeId)
        .single()

      if (smeError) throw smeError

      // Fetch Influencer data
      const { data: influencer, error: influencerError } = await supabase
        .from('influencers')
        .select('price_per_post, niche, engagement_rate, rating, users(location)')
        .eq('id', influencerId)
        .single()

      if (influencerError) throw influencerError

      // Calculate match score
      let score = 0
      const factors = {}

      // Budget alignment (40 points max)
      const budgetFactor = Math.min(sme.budget / influencer.price_per_post, 1) * 40
      score += budgetFactor
      factors.budget = budgetFactor

      // Niche compatibility (35 points max)
      const nicheFactor = sme.niche.toLowerCase() === influencer.niche.toLowerCase() 
        ? 35 
        : 20
      score += nicheFactor
      factors.niche = nicheFactor

      // Engagement rate (15 points max)
      const engagementFactor = Math.min(influencer.engagement_rate / 10, 1) * 15
      score += engagementFactor
      factors.engagement = engagementFactor

      // Location proximity (10 points max)
      const locationFactor = sme.location === influencer.users?.location ? 10 : 5
      score += locationFactor
      factors.location = locationFactor

      return {
        matchScore: Math.round(Math.min(score, 100)),
        factors,
        error: null
      }
    } catch (error) {
      return { matchScore: 0, factors: {}, error: error.message }
    }
  },

  /**
   * Get AI-powered recommendations for SME
   */
  async getRecommendations(smeId, limit = 5) {
    try {
      // Get SME info
      const { data: sme, error: smeError } = await supabase
        .from('smes')
        .select('budget, niche, location')
        .eq('id', smeId)
        .single()

      if (smeError) throw smeError

      // Get matching influencers
      const { data: influencers, error: influencersError } = await supabase
        .from('influencers')
        .select(`
          id,
          niche,
          price_per_post,
          engagement_rate,
          rating,
          users(id, name, profile_image_url, location)
        `)
        .eq('niche', sme.niche)
        .order('rating', { ascending: false })
        .limit(limit * 2)

      if (influencersError) throw influencersError

      // Calculate scores and sort
      const recommendations = await Promise.all(
        influencers.map(async (influencer) => {
          const { matchScore } = await this.calculateMatchScore(smeId, influencer.id)
          return { ...influencer, matchScore }
        })
      )

      // Sort by match score and return top N
      return {
        recommendations: recommendations
          .sort((a, b) => b.matchScore - a.matchScore)
          .slice(0, limit),
        error: null
      }
    } catch (error) {
      return { recommendations: [], error: error.message }
    }
  },

  /**
   * Save match score to database
   */
  async saveMatchScore(smeId, influencerId, score) {
    try {
      const { error } = await supabase
        .from('matches')
        .insert([
          {
            sme_id: smeId,
            influencer_id: influencerId,
            score,
            calculated_at: new Date()
          }
        ])

      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error.message }
    }
  }
}

export default matchingService
