import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            <span className="text-black">NANO</span>
            <span className="text-gray-600">Connect</span>
          </h1>
          <p className="text-center text-gray-600 mb-8">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-black hover:underline">Forgot password?</a>
            </div>

            <button 
              type="submit"
              className="w-full btn-primary"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 border-t pt-6">
            <p className="text-center text-gray-600">
              Don't have an account? 
              <Link to="/register" className="text-black font-semibold hover:underline ml-1">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
