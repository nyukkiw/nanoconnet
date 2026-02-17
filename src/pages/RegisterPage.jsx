import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../services/AuthContext'

export default function RegisterPage() {
  const [userType, setUserType] = useState('sme')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    niche: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { sign } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validation
      if (!formData.name || !formData.email || !formData.password) {
        throw new Error('Please fill in all required fields')
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match')
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }

      if (userType === 'influencer' && !formData.niche) {
        throw new Error('Please select a niche')
      }

      // Register user
      const result = await sign.register(formData.email, formData.password, {
        name: formData.name,
        user_type: userType,
        niche: userType === 'influencer' ? formData.niche : null
      })

      if (result.error) {
        setError(result.error)
      } else {
        // Navigate to home on successful registration
        navigate('/')
      }
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
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

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

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
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Email Address</label>
              <input 
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Password</label>
              <input 
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Confirm Password</label>
              <input 
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                required
              />
            </div>

            {userType === 'influencer' && (
              <div>
                <label className="block font-semibold mb-2">Niche / Category</label>
                <select 
                  name="niche"
                  value={formData.niche}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  required
                >
                  <option value="">Select your niche</option>
                  <option value="Beauty & Cosmetics">Beauty & Cosmetics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Technology">Technology</option>
                  <option value="Fitness & Wellness">Fitness & Wellness</option>
                  <option value="Food & Lifestyle">Food & Lifestyle</option>
                </select>
              </div>
            )}

            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" required />
              I agree to the <Link to="/terms" className="text-black font-semibold hover:underline ml-1">Terms & Conditions</Link>
            </label>

            <button 
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
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
