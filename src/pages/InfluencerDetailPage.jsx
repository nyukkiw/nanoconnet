import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function InfluencerDetailPage() {
  const { id } = useParams()

  return (
    <div className="container mx-auto px-4 py-16">
      <Link to="/influencers" className="text-gray-600 hover:text-black mb-6 flex items-center gap-2">
        <i className="fas fa-arrow-left"></i> Back to Influencers
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <img 
            src="https://via.placeholder.com/400"
            alt="Influencer"
            className="w-full rounded-lg mb-6"
          />

          <div className="card mb-6">
            <h1 className="text-3xl font-bold mb-2">Sarah Beauty</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-black text-white px-3 py-1 rounded text-sm">Beauty & Cosmetics</span>
              <span><i className="fas fa-star text-yellow-400"></i> 4.8 (120 reviews)</span>
            </div>

            <p className="text-gray-600 mb-6">
              Passionate beauty influencer with 5+ years of experience in makeup, skincare, and product reviews.
              Specializing in affordable and sustainable beauty products for everyday women.
            </p>

            <h2 className="text-xl font-bold mb-4">Platform Presence</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <i className="fab fa-instagram text-2xl text-black mb-2"></i>
                <p className="font-semibold">12.5K</p>
                <p className="text-sm text-gray-600">Instagram</p>
              </div>
              <div className="text-center">
                <i className="fab fa-tiktok text-2xl text-black mb-2"></i>
                <p className="font-semibold">8.2K</p>
                <p className="text-sm text-gray-600">TikTok</p>
              </div>
              <div className="text-center">
                <i className="fab fa-youtube text-2xl text-black mb-2"></i>
                <p className="font-semibold">5.1K</p>
                <p className="text-sm text-gray-600">YouTube</p>
              </div>
              <div className="text-center">
                <i className="fab fa-twitter text-2xl text-black mb-2"></i>
                <p className="font-semibold">3.2K</p>
                <p className="text-sm text-gray-600">Twitter</p>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Portfolio</h2>
            <p className="text-gray-600">120+ successful collaborations with various beauty brands</p>
          </div>
        </div>

        <div>
          <div className="card sticky top-24">
            <div className="mb-6">
              <p className="text-gray-600 mb-2">Price per Post</p>
              <p className="text-4xl font-bold">$500</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-gray-600 text-sm">Engagement Rate</p>
                <p className="font-semibold">8.5%</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Avg Response Time</p>
                <p className="font-semibold">24 hours</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Location</p>
                <p className="font-semibold">Jakarta, Indonesia</p>
              </div>
            </div>

            <Link 
              to="/booking"
              className="w-full btn-primary block text-center"
            >
              Book Collaboration
            </Link>

            <button className="w-full mt-3 btn-secondary">
              <i className="fas fa-envelope mr-2"></i> Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
