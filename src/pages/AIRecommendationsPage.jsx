import { useState } from 'react'

export default function AIRecommendationsPage() {
  const [recommendations] = useState([
    {
      id: 1,
      name: "Sarah Beauty",
      niche: "Beauty & Cosmetics",
      matchScore: 95,
      reason: "Perfect budget alignment and niche match"
    },
    {
      id: 2,
      name: "Fit Fiona",
      niche: "Fitness & Wellness",
      matchScore: 87,
      reason: "Strong audience overlap with your metrics"
    },
    {
      id: 3,
      name: "Tech Tim",
      niche: "Technology",
      matchScore: 78,
      reason: "Good engagement rate for your budget"
    },
  ])

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="section-title mb-4">AI Recommendations</h1>
      <p className="text-gray-600 mb-12">Get personalized influencer suggestions powered by AI</p>

      <div className="max-w-3xl mx-auto mb-12">
        <div className="card">
          <h2 className="text-lg font-bold mb-4">Tell us about your campaign</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Campaign Niche</label>
              <input 
                type="text"
                placeholder="e.g., Beauty, Fashion, Tech"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-2">Budget ($)</label>
                <input 
                  type="number"
                  placeholder="5000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Location</label>
                <input 
                  type="text"
                  placeholder="Jakarta"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <button className="w-full btn-primary">
              <i className="fas fa-magic mr-2"></i> Get AI Recommendations
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Your Recommendations</h2>
      <div className="space-y-4">
        {recommendations.map(rec => (
          <div key={rec.id} className="card flex items-center justify-between">
            <div className="flex-grow">
              <h3 className="font-bold text-lg mb-1">{rec.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{rec.niche}</p>
              <p className="text-gray-500 text-sm"><i className="fas fa-lightbulb mr-2"></i>{rec.reason}</p>
            </div>
            
            <div className="text-right ml-8">
              <div className="text-4xl font-bold text-black mb-2">{rec.matchScore}%</div>
              <p className="text-sm text-gray-600 mb-3">Match Score</p>
              <a 
                href={`/influencers/${rec.id}`}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition inline-block"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
