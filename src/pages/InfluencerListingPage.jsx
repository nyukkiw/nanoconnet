import React, { useState, useEffect } from 'react'
import { influencerService} from '../services'
import { supabase } from '../services/supabaseClient'

export default function InfluencerListingPage() {
  const [influencers, setInfluencers] = useState([])
  const [filteredInfluencers, setFilteredInfluencers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedNiche, setSelectedNiche] = useState('All')
  const [niches, setNiches] = useState(['All'])

  useEffect(() => {
    loadInfluencers()
  }, [])

  // Filter whenever search term or selected niche changes
  useEffect(() => {
    applyFilters()
  }, [searchTerm, selectedNiche, influencers])

  const applyFilters = () => {
    let filtered = influencers

    // Filter by niche
    if (selectedNiche !== 'All') {
      filtered = filtered.filter(inf => inf.niche === selectedNiche)
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(inf =>
        inf.users?.name?.toLowerCase().includes(term) ||
        inf.niche?.toLowerCase().includes(term) ||
        inf.bio_extended?.toLowerCase().includes(term)
      )
    }

    setFilteredInfluencers(filtered)
  }

  useEffect(() => {
    loadInfluencers()
  }, [])

  const loadInfluencers = async () => {
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
        .eq('users.is_active', true)
        .order('rating', { ascending: false })

      if (dbError) {
        throw new Error(dbError.message)
      }

      if (!data || data.length === 0) {
        setError('No influencers found. Using sample data.')
        const sampleData = getSampleData()
        setInfluencers(sampleData)
        extractNiches(sampleData)
        return
      }

      console.log('✅ Successfully fetched influencers from Supabase:', data)
      setInfluencers(data)
      extractNiches(data)
    } catch (err) {
      console.error('❌ Error fetching influencers:', err.message)
      setError(`Error: ${err.message}. Using sample data.`)
      const sampleData = getSampleData()
      setInfluencers(sampleData)
      extractNiches(sampleData)
    } finally {
      setLoading(false)
    }
  }

  const extractNiches = (data) => {
    const uniqueNiches = ['All', ...new Set(data.map(inf => inf.niche))]
    setNiches(uniqueNiches)
  }

  const getSampleData = () => [
    {
      id: 1,
      niche: "Beauty & Cosmetics",
      price_per_post: 500,
      currency: 'USD',
      engagement_rate: 8.5,
      followers_count: 12500,
      rating: 4.8,
      total_reviews: 45,
      bio_extended: "Passionate about makeup, skincare, and beauty trends",
      users: { 
        id: 'user1',
        name: "Sarah Beauty", 
        profile_image_url: "https://via.placeholder.com/150?text=Sarah", 
        location: "Jakarta",
        is_active: true 
      }
    },
    {
      id: 2,
      niche: "Technology",
      price_per_post: 400,
      currency: 'USD',
      engagement_rate: 7.2,
      followers_count: 8900,
      rating: 4.6,
      total_reviews: 32,
      bio_extended: "Tech enthusiast and gadget reviewer",
      users: { 
        id: 'user2',
        name: "Tech Tim", 
        profile_image_url: "https://via.placeholder.com/150?text=Tim", 
        location: "Bandung",
        is_active: true 
      }
    },
    {
      id: 3,
      niche: "Fitness & Wellness",
      price_per_post: 600,
      currency: 'USD',
      engagement_rate: 9.1,
      followers_count: 15200,
      rating: 4.9,
      total_reviews: 58,
      bio_extended: "Fitness coach and wellness advocate",
      users: { 
        id: 'user3',
        name: "Fit Fiona", 
        profile_image_url: "https://via.placeholder.com/150?text=Fiona", 
        location: "Surabaya",
        is_active: true 
      }
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="section-title mb-4">Explore Influencers</h1>
      <p className="text-gray-600 mb-12">Find the perfect nano influencer for your brand</p>

      {error && (
        <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          {error}
        </div>
      )}

      <div className="mb-8 flex flex-wrap gap-4">
      <input 
          type="text" 
          placeholder="Search by name, niche or bio..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
        />
        <select 
          value={selectedNiche}
          onChange={(e) => setSelectedNiche(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black font-medium"
        >
          {niches.map(niche => (
            <option key={niche} value={niche}>{niche}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="spinner mb-4">
            <i className="fas fa-spinner fa-spin text-4xl text-black"></i>
          </div>
          <p className="text-gray-600 font-medium">Loading influencers...</p>
        </div>
      ) : filteredInfluencers.length === 0 ? (
        <div className="text-center py-20">
          <i className="fas fa-search text-5xl text-gray-300 mb-4 block"></i>
          <p className="text-gray-600 font-medium text-lg">No influencers found</p>
          <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div>
          <p className="text-gray-600 mb-6 font-medium">
            Found <span className="text-black font-bold">{filteredInfluencers.length}</span> influencer{filteredInfluencers.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInfluencers.map(influencer => (
              <div key={influencer.id} className="card group hover:shadow-xl transition-all duration-300">
                <div className="mb-4 relative overflow-hidden rounded-lg bg-gray-200 h-40">
                  <img 
                    src={influencer.users?.profile_image_url || "https://via.placeholder.com/150"}
                    alt={influencer.users?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{influencer.users?.name}</h3>
                    <p className="text-xs bg-black text-white px-2 py-1 rounded-full w-fit">{influencer.niche}</p>
                  </div>
                  {influencer.rating >= 4.5 && (
                    <div className="text-yellow-500">
                      <i className="fas fa-star"></i>
                    </div>
                  )}
                </div>

                {influencer.bio_extended && (
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{influencer.bio_extended}</p>
                )}
                
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <p><i className="fas fa-users mr-2 text-gray-400"></i><span className="font-medium">{influencer.followers_count?.toLocaleString() || 0}</span> followers</p>
                  <p><i className="fas fa-fire mr-2 text-orange-500"></i><span className="font-medium">{influencer.engagement_rate}%</span> engagement</p>
                  <p><i className="fas fa-map-marker-alt mr-2 text-red-500"></i>{influencer.users?.location || 'Unknown'}</p>
                  <div className="flex items-center justify-between">
                    <p>
                      <i className="fas fa-star mr-2 text-yellow-400"></i>
                      <span className="font-medium">{influencer.rating || 'N/A'}</span>
                      {influencer.total_reviews && <span className="text-gray-400 ml-1">({influencer.total_reviews})</span>}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-lg font-bold text-black mb-3">
                    ${influencer.price_per_post}<span className="text-sm text-gray-600">/post</span>
                  </p>
                  <a 
                    href={`/influencers/${influencer.id}`}
                    className="w-full block text-center bg-black text-white py-2 rounded hover:bg-gray-800 transition font-semibold"
                  >
                    <i className="fas fa-eye mr-2"></i>View Detail
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


