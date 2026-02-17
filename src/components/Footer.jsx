import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-lg mb-4">NANOConnect</h4>
            <p className="text-gray-400">Connecting SMEs with nano influencers.</p>
          </div>
          
          <div>
            <h5 className="font-bold mb-4">Quick Links</h5>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About</Link></li>
              <li><Link to="/influencers" className="hover:text-white transition">Influencers</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-4">Resources</h5>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-4">Follow Us</h5>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-400 transition"><i className="fab fa-facebook"></i></a>
              <a href="#" className="hover:text-gray-400 transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-gray-400 transition"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2026 NANOConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
