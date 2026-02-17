import { Link } from 'react-router-dom'
import { useAuth } from '../services/AuthContext'
import { useState } from 'react'

export default function Navigation() {
  const { user, userProfile, sign, isAuthenticated } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await sign.logout()
  }

  return (
    <nav className="bg-black text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link to="/">
              <span className="text-white">NANO</span>
              <span className="text-gray-400">Connect</span>
            </Link>
          </div>
          
          <ul className="hidden md:flex gap-6">
            <li><Link to="/" className="hover:text-gray-300 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-gray-300 transition">About</Link></li>
            <li><Link to="/influencers" className="hover:text-gray-300 transition">Influencers</Link></li>
            <li><Link to="/recommendations" className="hover:text-gray-300 transition">AI Match</Link></li>
          </ul>

          <div className="flex gap-3 items-center">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm">
                  {userProfile?.name || user?.email}
                </span>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition font-semibold">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
