import { useState } from 'react'

export default function BookingPage() {
  const [formData, setFormData] = useState({
    influencerId: '',
    campaignName: '',
    budget: '',
    startDate: '',
    endDate: '',
    description: '',
    attachments: []
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Booking submitted:', formData)
    alert('Booking request submitted successfully!')
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="section-title mb-4">Create a Booking</h1>
      <p className="text-gray-600 mb-12">Plan your collaboration with a nano influencer</p>

      <div className="max-w-2xl mx-auto card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-2">Influencer</label>
            <select 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              required
            >
              <option>Select an influencer</option>
              <option value="1">Sarah Beauty - $500/post</option>
              <option value="2">Tech Tim - $400/post</option>
              <option value="3">Fit Fiona - $600/post</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">Campaign Name</label>
            <input 
              type="text"
              placeholder="e.g., Summer Beauty Promotion"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Budget ($)</label>
              <input 
                type="number"
                placeholder="1000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Number of Posts</label>
              <input 
                type="number"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">End Date</label>
              <input 
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2">Campaign Description</label>
            <textarea 
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
            Send Booking Request
          </button>
        </form>
      </div>
    </div>
  )
}
