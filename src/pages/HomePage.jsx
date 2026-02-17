import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Tinder for UMKM &<br />Nano Influencers
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect your small business with local nano influencers perfectly matched to your budget, niche, and audience.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/influencers" className="btn-primary">
              Find Influencers
            </Link>
            <Link to="/register" className="btn-secondary">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="section-title text-center mb-12">Why NANOConnect?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card">
            <i className="fas fa-rocket text-4xl text-black mb-4"></i>
            <h3 className="text-xl font-bold mb-3">Smart Matching</h3>
            <p className="text-gray-600">AI-powered algorithm matches your budget with the right influencers for your campaign.</p>
          </div>

          <div className="card">
            <i className="fas fa-map-marker-alt text-4xl text-black mb-4"></i>
            <h3 className="text-xl font-bold mb-3">Location Aware</h3>
            <p className="text-gray-600">Find local nano influencers in your area to connect with your target audience.</p>
          </div>

          <div className="card">
            <i className="fas fa-lightning-bolt text-4xl text-black mb-4"></i>
            <h3 className="text-xl font-bold mb-3">Real-Time Updates</h3>
            <p className="text-gray-600">Edge computing ensures low latency and instant data synchronization.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title mb-6">Ready to grow your business?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Join thousands of SMEs and nano influencers already partnering on NANOConnect.
          </p>
          <Link to="/register" className="btn-primary">
            Start Your Journey Now
          </Link>
        </div>
      </section>
    </div>
  )
}
