import { useState } from 'react'

export default function InfluencerListingPage() {
  const [influencers] = useState([
    {
      id: 1,
      name: "Sarah Beauty",
      niche: "Beauty & Cosmetics",
      followers: 12500,
      engagement: 8.5,
      price: 500,
      location: "Jakarta",
      rating: 4.8,
      image: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      name: "Tech Tim",
      niche: "Technology",
      followers: 8900,
      engagement: 7.2,
      price: 400,
      location: "Bandung",
      rating: 4.6,
      image: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      name: "Fit Fiona",
      niche: "Fitness & Wellness",
      followers: 15200,
      engagement: 9.1,
      price: 600,
      location: "Surabaya",
      rating: 4.9,
      image: "https://via.placeholder.com/150"
    },
  ])

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="section-title mb-4">Explore Influencers</h1>
      <p className="text-gray-600 mb-12">Find the perfect nano influencer for your brand</p>

      <div className="mb-8 flex flex-wrap gap-4">
        <input 
          type="text" 
          placeholder="Search by name or niche..." 
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black">
          <option>All Niches</option>
          <option>Beauty</option>
          <option>Technology</option>
          <option>Fitness</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {influencers.map(influencer => (
          <div key={influencer.id} className="card group">
            <div className="mb-4">
              <img 
                src={influencer.image} 
                alt={influencer.name}
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
            <h3 className="font-bold text-lg mb-2">{influencer.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{influencer.niche}</p>
            
            <div className="space-y-2 mb-4 text-sm text-gray-600">
              <p><i className="fas fa-users mr-2"></i>{influencer.followers.toLocaleString()} followers</p>
              <p><i className="fas fa-fire mr-2"></i>{influencer.engagement}% engagement</p>
              <p><i className="fas fa-map-marker-alt mr-2"></i>{influencer.location}</p>
              <p><i className="fas fa-star mr-2"></i>{influencer.rating} rating</p>
            </div>

            <div className="border-t pt-4">
              <p className="text-lg font-bold text-black mb-3">${influencer.price}/post</p>
              <a 
                href={`/influencers/${influencer.id}`}
                className="w-full block text-center bg-black text-white py-2 rounded hover:bg-gray-800 transition"
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
