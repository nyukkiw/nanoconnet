# Node Functions - Business Logic

// Import Supabase client
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL || 'your-supabase-url',
  process.env.SUPABASE_ANON_KEY || 'your-supabase-anon-key'
);

/**
 * Matching Algorithm Function
 * Calculates compatibility between SME and Influencer
 */
async function calculateMatchScore(smeId, influencerId) {
  try {
    const { data: sme } = await supabase
      .from('smes')
      .select('*')
      .eq('id', smeId)
      .single();

    const { data: influencer } = await supabase
      .from('influencers')
      .select('*')
      .eq('id', influencerId)
      .single();

    if (!sme || !influencer) {
      return { error: 'SME or Influencer not found' };
    }

    // Calculate match score based on multiple factors
    let score = 0;
    
    // Budget alignment (max 40 points)
    if (sme.budget >= influencer.price_per_post) {
      score += 40;
    } else {
      score += Math.round((sme.budget / influencer.price_per_post) * 40);
    }

    // Niche compatibility (max 30 points)
    if (sme.niche.toLowerCase() === influencer.niche.toLowerCase()) {
      score += 30;
    } else if (sme.niche.toLowerCase().includes(influencer.niche.toLowerCase())) {
      score += 20;
    }

    // Location proximity (max 20 points)
    if (sme.location === influencer.location) {
      score += 20;
    } else {
      score += 10;
    }

    // Engagement rate (max 10 points)
    if (influencer.engagement_rate > 5) {
      score += 10;
    }

    return {
      matchScore: Math.min(score, 100),
      smeName: sme.name,
      influencerName: influencer.name,
      reason: score > 80 ? 'Excellent match' : score > 60 ? 'Good match' : 'Fair match'
    };
  } catch (error) {
    return { error: error.message };
  }
}

/**
 * Get AI Recommendations
 */
async function getAIRecommendations(smeId) {
  try {
    const { data: sme } = await supabase
      .from('smes')
      .select('*')
      .eq('id', smeId)
      .single();

    const { data: influencers } = await supabase
      .from('influencers')
      .select('*')
      .eq('niche', sme.niche)
      .order('rating', { ascending: false })
      .limit(5);

    const recommendations = [];
    for (const influencer of influencers) {
      const { matchScore } = await calculateMatchScore(smeId, influencer.id);
      recommendations.push({
        ...influencer,
        matchScore
      });
    }

    return recommendations.sort((a, b) => b.matchScore - a.matchScore);
  } catch (error) {
    return { error: error.message };
  }
}

module.exports = {
  calculateMatchScore,
  getAIRecommendations
};
