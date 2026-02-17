import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './services/AuthContext'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import InfluencerListingPage from './pages/InfluencerListingPage'
import InfluencerDetailPage from './pages/InfluencerDetailPage'
import BookingPage from './pages/BookingPage'
import AIRecommendationsPage from './pages/AIRecommendationsPage'
import TermsPage from './pages/TermsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/influencers" element={<InfluencerListingPage />} />
              <Route path="/influencers/:id" element={<InfluencerDetailPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/recommendations" element={<AIRecommendationsPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
