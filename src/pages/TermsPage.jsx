export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="section-title mb-8">Terms & Conditions</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p className="text-gray-600">
            Welcome to NANOConnect ("Platform"). These Terms & Conditions govern your use of our platform 
            for connecting SMEs and nano influencers. By accessing or using NANOConnect, you agree to be 
            bound by these terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. User Eligibility</h2>
          <p className="text-gray-600 mb-3">
            You must be at least 18 years old and have the legal capacity to enter into these Terms. 
            You represent that all information provided during registration is accurate and complete.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Maintain the confidentiality of your login credentials</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Do not engage in prohibited activities (spam, harassment, etc.)</li>
            <li>Respect intellectual property rights of others</li>
            <li>Provide honest and accurate information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
          <p className="text-gray-600">
            All content on NANOConnect, including text, graphics, logos, and software, is the property of 
            NANOConnect or its content suppliers and is protected by copyright laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
          <p className="text-gray-600">
            NANOConnect is provided "as is" without warranties. We are not liable for any indirect, 
            incidental, or consequential damages arising from your use of the platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. Termination</h2>
          <p className="text-gray-600">
            We reserve the right to terminate your account and access to the platform if you violate 
            these Terms & Conditions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">7. Changes to Terms</h2>
          <p className="text-gray-600">
            We may update these Terms & Conditions at any time. Continued use of the platform after 
            updates constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
          <p className="text-gray-600">
            For questions about these Terms & Conditions, please contact us at support@nanoconnect.com
          </p>
        </section>
      </div>
    </div>
  )
}
