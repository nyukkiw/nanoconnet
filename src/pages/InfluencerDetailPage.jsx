import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../services/AuthContext'

export default function InfluencerDetailPage() {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()
  const [influencer, setInfluencer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadInfluencerDetail()
  }, [id])

  const loadInfluencerDetail = async () => {
    try {
      setLoading(true)
      setError('')

      const { data, error: dbError } = await supabase
        .from('influencers')
        .select(`
          id,
          niche,
          price_per_post,
          currency,
          engagement_rate,
          followers_count,
          rating,
          total_reviews,
          bio_extended,
          users!user_id (
            id,
            name,
            location,
            profile_image_url,
            is_active
          )
        `)
        .eq('id', id)
        .single()

      if (dbError) {
        throw new Error(dbError.message)
      }

      if (!data) {
        setError('Influencer not found')
        return
      }

      console.log('✅ Successfully fetched influencer detail:', data)
      setInfluencer(data)
    } catch (err) {
      console.error('❌ Error fetching influencer detail:', err.message)
      setError(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Link to="/influencers" className="text-gray-600 hover:text-black mb-6 flex items-center gap-2">
          <i className="fas fa-arrow-left"></i> Back to Influencers
        </Link>
        <div className="text-center py-20">
          <div className="spinner mb-4">
            <i className="fas fa-spinner fa-spin text-4xl text-black"></i>
          </div>
          <p className="text-gray-600 font-medium">Loading influencer details...</p>
        </div>
      </div>
    )
  }

  if (error || !influencer) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Link to="/influencers" className="text-gray-600 hover:text-black mb-6 flex items-center gap-2">
          <i className="fas fa-arrow-left"></i> Back to Influencers
        </Link>
        <div className="text-center py-20">
          <i className="fas fa-exclamation-triangle text-5xl text-red-500 mb-4 block"></i>
          <p className="text-gray-600 font-medium text-lg">{error || 'Influencer not found'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Link to="/influencers" className="text-gray-600 hover:text-black mb-6 flex items-center gap-2">
        <i className="fas fa-arrow-left"></i> Back to Influencers
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="mb-6 rounded-lg bg-gray-200 h-96 overflow-hidden">
            <img 
              src={influencer.users?.profile_image_url || "https://via.placeholder.com/400"}
              alt={influencer.users?.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="card mb-6">
            <h1 className="text-3xl font-bold mb-2">{influencer.users?.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-black text-white px-3 py-1 rounded text-sm">{influencer.niche}</span>
              <span>
                <i className="fas fa-star text-yellow-400"></i> {influencer.rating || 'N/A'} 
                {influencer.total_reviews && <span className="text-gray-600 ml-1">({influencer.total_reviews} reviews)</span>}
              </span>
            </div>

            {influencer.bio_extended && (
              <p className="text-gray-600 mb-6">{influencer.bio_extended}</p>
            )}

            <div className="space-y-3 text-sm text-gray-600">
              <p><i className="fas fa-users mr-2 text-gray-400"></i><span className="font-medium">{influencer.followers_count?.toLocaleString() || 0}</span> followers</p>
              <p><i className="fas fa-fire mr-2 text-orange-500"></i><span className="font-medium">{influencer.engagement_rate}%</span> engagement rate</p>
              <p><i className="fas fa-map-marker-alt mr-2 text-red-500"></i>{influencer.users?.location || 'Unknown'}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="card sticky top-24">
            <div className="mb-6">
              <p className="text-gray-600 mb-2">Price per Post</p>
              <p className="text-4xl font-bold">
                {influencer.currency === 'USD' ? '$' : 'Rp'}{influencer.price_per_post}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-gray-600 text-sm">Engagement Rate</p>
                <p className="font-semibold">{influencer.engagement_rate}%</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Followers</p>
                <p className="font-semibold">{influencer.followers_count?.toLocaleString() || 0}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Location</p>
                <p className="font-semibold">{influencer.users?.location || 'Unknown'}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Rating</p>
                <p className="font-semibold">{influencer.rating || 'N/A'}</p>
              </div>
            </div>

            {isAuthenticated ? (
              <Link 
                to={`/booking?influencerId=${influencer.id}`}
                className="w-full btn-primary block text-center"
              >
                <i className="fas fa-shopping-cart mr-2"></i> Order Form
              </Link>
            ) : (
              <Link 
                to="/login"
                className="w-full btn-primary block text-center"
              >
                <i className="fas fa-sign-in-alt mr-2"></i> Login to Order
              </Link>
            )}

            <button className="w-full mt-3 btn-secondary">
              <i className="fas fa-envelope mr-2"></i> Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

