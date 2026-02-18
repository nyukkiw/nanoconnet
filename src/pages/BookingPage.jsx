import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'

export default function BookingPage() {
  const [searchParams] = useSearchParams()
  const influencerId = searchParams.get('influencerId')
  
  const [influencer, setInfluencer] = useState(null)
  const [loading, setLoading] = useState(!!influencerId)
  const [formData, setFormData] = useState({
    campaignName: '',
    budget: '',
    numberOfPosts: '',
    startDate: '',
    endDate: '',
    description: ''
  })

  useEffect(() => {
    if (influencerId) {
      loadInfluencerData()
    }
  }, [influencerId])

  const loadInfluencerData = async () => {
    try {
      const { data, error } = await supabase
        .from('influencers')
        .select(`
          id,
          price_per_post,
          currency,
          users!user_id (
            id,
            name,
            profile_image_url
          )
        `)
        .eq('id', influencerId)
        .single()

      if (error) throw error
      setInfluencer(data)
    } catch (err) {
      console.error('Error loading influencer:', err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Booking submitted:', {
      influencerId,
      ...formData
    })
    alert('Booking request submitted successfully!')
    setFormData({
      campaignName: '',
      budget: '',
      numberOfPosts: '',
      startDate: '',
      endDate: '',
      description: ''
    })
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Link to="/influencers" className="text-gray-600 hover:text-black mb-6 flex items-center gap-2">
        <i className="fas fa-arrow-left"></i> Back to Influencers
      </Link>

      <h1 className="section-title mb-4">Order Form</h1>
      <p className="text-gray-600 mb-12">Plan your collaboration campaign</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {influencer && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-4">
                    <img 
                      src={influencer.users?.profile_image_url || "https://via.placeholder.com/60"}
                      alt={influencer.users?.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{influencer.users?.name}</h3>
                      <p className="text-gray-600">
                        {influencer.currency === 'USD' ? '$' : 'Rp'}{influencer.price_per_post}/post
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block font-semibold mb-2">Campaign Name</label>
                <input 
                  type="text"
                  name="campaignName"
                  value={formData.campaignName}
                  onChange={handleChange}
                  placeholder="e.g., Summer Beauty Promotion"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2">Budget ({influencer?.currency || 'USD'})</label>
                  <input 
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="1000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Number of Posts</label>
                  <input 
                    type="number"
                    name="numberOfPosts"
                    value={formData.numberOfPosts}
                    onChange={handleChange}
                    placeholder="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2">Start Date</label>
                  <input 
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">End Date</label>
                  <input 
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-2">Campaign Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your campaign goals and requirements..."
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full btn-primary"
              >
                <i className="fas fa-check mr-2"></i>Send Booking Request
              </button>
            </form>
          </div>
        </div>

        {influencer && (
          <div className="card">
            <h3 className="font-bold text-lg mb-4">Campaign Summary</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-600">Influencer</p>
                <p className="font-semibold">{influencer.users?.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Price per Post</p>
                <p className="font-semibold">
                  {influencer.currency === 'USD' ? '$' : 'Rp'}{influencer.price_per_post}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Estimated Total</p>
                <p className="font-semibold text-lg">
                  {influencer.currency === 'USD' ? '$' : 'Rp'}{(influencer.price_per_post * (parseInt(formData.numberOfPosts) || 0)).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
