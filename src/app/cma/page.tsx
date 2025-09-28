'use client'

import { motion } from 'framer-motion'

export default function CMA() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="py-20 px-6 md:px-16"
        style={{ backgroundColor: '#131925' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center"
            >
              {/* Page Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-6xl font-medium text-white mb-4"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Free Home Valuation
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-gray-400 mb-8 font-medium"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Get an accurate Comparative Market Analysis (CMA) for your San Francisco property
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-300 mb-8 leading-relaxed"
              >
                Curious about your home's current market value? I'll provide you with a comprehensive analysis of recent comparable sales, current market trends, and an accurate estimate of your property's worth in today's San Francisco market.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-6"
              >
                <a
                  href="https://tally.so/r/w8OYPA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-xl"
                >
                  Request Your Free CMA
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </motion.div>
            </motion.div>

            {/* Visual Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] w-full max-w-lg mx-auto lg:mx-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 shadow-xl">
                <div className="text-white h-full flex flex-col justify-center">
                  <div className="text-4xl font-bold mb-4">CMA</div>
                  <div className="text-lg mb-6">Comparative Market Analysis</div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      <span>Recent Comparable Sales</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      <span>Current Market Trends</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      <span>Accurate Property Valuation</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      <span>Professional Analysis</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 px-6 md:px-16" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-medium text-gray-800 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
              What's Included in Your CMA
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              A comprehensive analysis tailored specifically to your San Francisco property.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Comparable Sales */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Comparable Sales</h3>
              <p className="text-gray-700 leading-relaxed">
                Analysis of similar properties that have sold in your neighborhood within the last 6 months, including sale prices and key features.
              </p>
            </motion.div>

            {/* Market Trends */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Current Market Trends</h3>
              <p className="text-gray-700 leading-relaxed">
                Local market conditions, price trends, inventory levels, and days on market specific to your San Francisco neighborhood.
              </p>
            </motion.div>

            {/* Property Assessment */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0H7m5 0v-9a3 3 0 00-6 0v9m6 0a3 3 0 006 0v-9a3 3 0 00-6 0v9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Property Assessment</h3>
              <p className="text-gray-700 leading-relaxed">
                Detailed evaluation of your property's unique features, condition, and improvements that impact market value.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 md:px-16" style={{ backgroundColor: '#131925' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Getting your free CMA is simple and takes just a few minutes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Submit Your Request</h3>
              <p className="text-gray-300 leading-relaxed">
                Fill out the simple form with your property details and contact information.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Market Research</h3>
              <p className="text-gray-300 leading-relaxed">
                I'll analyze recent sales, current listings, and market data specific to your property and area.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Receive Your CMA</h3>
              <p className="text-gray-300 leading-relaxed">
                Get your comprehensive market analysis within 24-48 hours, delivered to your email.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Your Real Estate Agents Section */}
      <section className="py-20 px-6 md:px-16" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-medium text-gray-800 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Your Real Estate Agents
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Meet the experienced professionals who will prepare your comprehensive market analysis.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Kaz Viskanta */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <img
                  src="/headshot.jpg"
                  alt="Kaz Viskanta - San Francisco Real Estate Agent"
                  className="w-full h-full object-cover rounded-full shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Kaz Viskanta</h3>
              <p className="text-blue-600 font-medium mb-4">CA DRE #02318574</p>
              <p className="text-gray-700 leading-relaxed mb-6">
                San Francisco real estate specialist with extensive experience in luxury properties,
                market analysis, and helping clients navigate complex transactions.
              </p>
              <div className="space-y-2">
                <a
                  href="mailto:kaz@kazviskrealty.com"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  kaz@kazviskrealty.com
                </a>
                <div className="flex items-center justify-center text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  (415) 513-3387
                </div>
              </div>
            </motion.div>

            {/* Nicholas Ramos */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">NR</span>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Nicholas Ramos</h3>
              <p className="text-green-600 font-medium mb-4">Coldwell Banker Realty</p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Experienced real estate professional specializing in residential properties
                and providing comprehensive market analysis for informed decision-making.
              </p>
              <div className="space-y-2">
                <a
                  href="mailto:nicholas.ramos@cbrealty.com"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  nicholas.ramos@cbrealty.com
                </a>
                <div className="flex items-center justify-center text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  (512) 375-1378
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 px-6 md:px-16"
        style={{ backgroundColor: '#131925' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-5xl font-medium text-white mb-8"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Ready to Learn Your Home's Value?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-xl text-gray-300 mb-12 leading-relaxed"
          >
            Get your free, no-obligation Comparative Market Analysis today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <a
              href="https://tally.so/r/w8OYPA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-xl"
            >
              Request Your Free CMA
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>

            <a
              href="mailto:kaz@kazviskrealty.com?subject=CMA Request&body=Hi Kaz, I'd like to request a Comparative Market Analysis for my property."
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-medium rounded-lg hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-xl"
            >
              Questions? Email Me
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}