import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function RegisterPage() {
  const [userType, setUserType] = useState('sme')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Register:', { userType })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            <span className="text-black">NANO</span>
            <span className="text-gray-600">Connect</span>
          </h1>
          <p className="text-center text-gray-600 mb-8">Create your account</p>

          <div className="mb-6 flex gap-4">
            <button 
              onClick={() => setUserType('sme')}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${
                userType === 'sme' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              SME / Business
            </button>
            <button 
              onClick={() => setUserType('influencer')}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${
                userType === 'influencer' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              Influencer
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Full Name</label>
              <input 
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Email Address</label>
              <input 
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Password</label>
              <input 
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Confirm Password</label>
              <input 
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                required
              />
            </div>

            {userType === 'influencer' && (
              <div>
                <label className="block font-semibold mb-2">Niche / Category</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black">
                  <option>Select your niche</option>
                  <option>Beauty & Cosmetics</option>
                  <option>Fashion</option>
                  <option>Technology</option>
                  <option>Fitness & Wellness</option>
                  <option>Food & Lifestyle</option>
                </select>
              </div>
            )}

            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" required />
              I agree to the <Link to="/terms" className="text-black font-semibold hover:underline ml-1">Terms & Conditions</Link>
            </label>

            <button 
              type="submit"
              className="w-full btn-primary"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 border-t pt-6">
            <p className="text-center text-gray-600">
              Already have an account? 
              <Link to="/login" className="text-black font-semibold hover:underline ml-1">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
