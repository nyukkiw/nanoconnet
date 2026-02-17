export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="section-title mb-8">About NANOConnect</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            NANOConnect bridges the gap between small and medium enterprises (SMEs) and nano influencers, 
            creating meaningful partnerships that drive business growth.
          </p>
          <p className="text-gray-600">
            We believe in the power of authentic connections and aim to make influencer marketing accessible 
            to businesses of all sizes.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-600 mb-4">
            To revolutionize how SMEs connect with influencers by leveraging AI-powered matching, 
            edge computing, and real-time collaboration.
          </p>
          <p className="text-gray-600">
            We envision a platform where every business, regardless of size, can find the perfect brand ambassador 
            within their budget and target market.
          </p>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card">
            <div className="text-2xl font-bold text-black mb-3">1</div>
            <h3 className="font-bold mb-2">Create Profile</h3>
            <p className="text-gray-600 text-sm">Set up your SME or influencer profile with your details and preferences.</p>
          </div>

          <div className="card">
            <div className="text-2xl font-bold text-black mb-3">2</div>
            <h3 className="font-bold mb-2">AI Matching</h3>
            <p className="text-gray-600 text-sm">Our algorithm finds perfect matches based on niche, budget, and audience.</p>
          </div>

          <div className="card">
            <div className="text-2xl font-bold text-black mb-3">3</div>
            <h3 className="font-bold mb-2">Collaborate</h3>
            <p className="text-gray-600 text-sm">Connect with influencers and plan your collaboration campaigns.</p>
          </div>

          <div className="card">
            <div className="text-2xl font-bold text-black mb-3">4</div>
            <h3 className="font-bold mb-2">Succeed</h3>
            <p className="text-gray-600 text-sm">Track results and grow your business with authentic partnerships.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Our Team</h2>
        <p className="text-gray-600">
          NANOConnect is built by passionate individuals dedicated to democratizing influencer marketing 
          and empowering SMEs and nano influencers to succeed together.
        </p>
      </section>
    </div>
  )
}
