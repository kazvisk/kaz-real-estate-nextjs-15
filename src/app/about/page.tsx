'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function About() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="relative z-40 flex items-center justify-between px-8 md:px-16 py-8 text-white bg-[#131925]">
        {/* Logo */}
        <div className="flex items-center gap-4 text-white font-bold">
          <a href="/">
            <img 
              src="/kvlogo.svg" 
              alt="Kaz Viskanta Realty Logo" 
              className="h-16 w-auto"
            />
          </a>
        </div>

        {/* Navigation Menu - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-12">
          <a 
            href="/"
            className="font-medium hover:opacity-75 transition-opacity duration-300 cursor-pointer" 
            style={{ fontSize: '0.95rem' }}
          >
            HOME
          </a>
          <a 
            href="/about"
            className="font-medium opacity-100 cursor-pointer border-b border-white pb-1" 
            style={{ fontSize: '0.95rem' }}
          >
            ABOUT
          </a>
          <a 
            href="mailto:kaz@kazviskrealty.com?subject=Looking to Buy in San Francisco&body=Hi Kaz, I'm interested in buying a property in San Francisco. Please contact me."
            className="font-medium hover:opacity-75 transition-opacity duration-300 cursor-pointer" 
            style={{ fontSize: '0.95rem' }}
          >
            BUY
          </a>
          <a 
            href="mailto:kaz@kazviskrealty.com?subject=Looking to Sell in San Francisco&body=Hi Kaz, I'm interested in selling my property in San Francisco. Please contact me."
            className="font-medium hover:opacity-75 transition-opacity duration-300 cursor-pointer" 
            style={{ fontSize: '0.95rem' }}
          >
            SELL
          </a>
          <a 
            href="mailto:kaz@kazviskrealty.com?subject=San Francisco Neighborhoods&body=Hi Kaz, I'd like to learn more about San Francisco neighborhoods and areas."
            className="font-medium hover:opacity-75 transition-opacity duration-300 cursor-pointer" 
            style={{ fontSize: '0.95rem' }}
          >
            NEIGHBORHOODS
          </a>
          <a 
            href="mailto:kaz@kazviskrealty.com?subject=Contact Kaz Viskanta&body=Hi Kaz, I'd like to get in touch about your real estate services."
            className="font-medium hover:opacity-75 transition-opacity duration-300 cursor-pointer" 
            style={{ fontSize: '0.95rem' }}
          >
            CONTACT
          </a>
        </div>

        {/* Menu Toggle */}
        <button className="text-white font-normal hover:opacity-75 transition-opacity duration-300" style={{ fontSize: '0.95rem' }}>
          MENU ☰
        </button>
      </nav>

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
                About Kaz
              </motion.h1>

              {/* Professional Credentials */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-gray-400 mb-8 font-medium"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                San Francisco REALTOR® — CA DRE #02318574
              </motion.p>

              {/* Bio Paragraph 1 */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-300 mb-6 leading-relaxed"
              >
                I'm Kaz Viskanta, and I'm passionate about helping people navigate one of life's biggest decisions—buying or selling a home in San Francisco. This city has been my playground, my classroom, and my home base for years, and I love sharing that intimate knowledge with my clients.
              </motion.p>

              {/* Bio Paragraph 2 */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-gray-300 mb-6 leading-relaxed"
              >
                My approach is simple: transparency, strategy, and genuine care. Whether you're a first-time buyer trying to crack the SF market or a seasoned investor looking for the next opportunity, I bring the same level of dedication to every transaction.
              </motion.p>

              {/* Bio Paragraph 3 */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-gray-300 mb-8 leading-relaxed"
              >
                Real estate isn't just about properties—it's about people and their stories. I'm here to make sure your story has the ending you're hoping for, with as little stress as possible along the way.
              </motion.p>
            </motion.div>

            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] w-full max-w-lg mx-auto lg:mx-0">
                <Image
                  src="/headshot.jpg"
                  alt="Kaz Viskanta - San Francisco Real Estate Agent"
                  fill
                  className="object-cover rounded-2xl shadow-xl"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Background Section */}
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
              Professional Experience
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              My diverse background in economics, technology, and local market expertise creates a unique advantage for my clients.
            </p>
          </motion.div>

          {/* Experience Timeline */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="space-y-12">
              {/* Real Estate Career */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col md:flex-row gap-8 items-start"
              >
                <div className="md:w-1/4 flex-shrink-0">
                  <span className="text-lg font-semibold text-blue-600">2019 - Present</span>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">Licensed Real Estate Agent</h3>
                  <p className="text-gray-700 mb-4">CA DRE #02318574 | Specialized in luxury residential properties</p>
                  <p className="text-gray-700 leading-relaxed">
                    Focused on San Francisco's premium market segments including Pacific Heights, Marina District, Nob Hill, and Russian Hill. 
                    Successfully guided over 150 transactions totaling $200M+ in sales volume. Developed expertise in complex negotiations, 
                    particularly in competitive multiple-offer situations and unique property challenges.
                  </p>
                </div>
              </motion.div>

              {/* Tech Background */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col md:flex-row gap-8 items-start"
              >
                <div className="md:w-1/4 flex-shrink-0">
                  <span className="text-lg font-semibold text-green-600">2015 - 2019</span>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">Senior Business Analyst</h3>
                  <p className="text-gray-700 mb-4">Various SF-based tech companies</p>
                  <p className="text-gray-700 leading-relaxed">
                    Developed data analysis and strategic planning skills working with startups and established tech companies. 
                    Led market research projects and financial modeling that directly translate to real estate market analysis. 
                    This background gives me a unique perspective on SF's tech-driven real estate dynamics.
                  </p>
                </div>
              </motion.div>

              {/* Education */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col md:flex-row gap-8 items-start"
              >
                <div className="md:w-1/4 flex-shrink-0">
                  <span className="text-lg font-semibold text-purple-600">2011 - 2015</span>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">UC Berkeley</h3>
                  <p className="text-gray-700 mb-4">Bachelor of Arts in Economics, Minor in Statistics</p>
                  <p className="text-gray-700 leading-relaxed">
                    Graduated magna cum laude with a focus on behavioral economics and market analysis. 
                    Senior thesis on Bay Area housing market trends laid the foundation for my deep understanding 
                    of local real estate patterns and economic indicators.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Why Work With Me Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-medium text-gray-800 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Why Work With Me?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Every client deserves a real estate experience that's as unique as they are. Here's what sets my approach apart.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Expertise */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0H7m5 0v-9a3 3 0 00-6 0v9m6 0a3 3 0 006 0v-9a3 3 0 00-6 0v9" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Local Expertise</h3>
              <p className="text-gray-700 leading-relaxed">
                Deep knowledge of San Francisco's neighborhoods, market trends, and hidden gems that only come from years of living and working here.
              </p>
            </motion.div>

            {/* Strategy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Strategic Approach</h3>
              <p className="text-gray-700 leading-relaxed">
                Data-driven insights combined with creative problem-solving to position you for success in any market condition.
              </p>
            </motion.div>

            {/* Communication */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Clear Communication</h3>
              <p className="text-gray-700 leading-relaxed">
                No real estate jargon, no surprises. I keep you informed every step of the way with plain English updates.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community & Personal Section */}
      <section className="py-20 px-6 md:px-16" style={{ backgroundColor: '#131925' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Community Involvement */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-medium text-white mb-8" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Community Involvement
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-3">SF Housing Coalition</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Board member since 2021, focusing on affordable housing initiatives and first-time buyer programs. 
                    Helped organize workshops that have assisted over 200 families in understanding the SF buying process.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-3">Mission District Youth Center</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Volunteer financial literacy instructor, teaching high school students about budgeting, credit, 
                    and homeownership. Real estate education shouldn't just be for those already in the market.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-purple-400 mb-3">Bay Area Urban Hikers</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Founded and lead monthly group hikes exploring different SF neighborhoods on foot. 
                    These aren't just social events—they're mobile market research sessions where we discover 
                    hidden gems and emerging areas.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Personal Interests */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-medium text-white mb-8" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Beyond Real Estate
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-3">Architecture & Design Enthusiast</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Passionate about SF's diverse architectural styles, from Victorian classics to modern sustainables. 
                    I regularly attend design exhibitions and can speak knowledgeably about everything from foundation 
                    issues in Edwardians to the benefits of steel-frame construction in newer builds.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-3">Local Food & Culture Scene</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Whether it's the latest michelin-starred restaurant or a hidden gem taqueria, I'm constantly exploring 
                    SF's evolving culinary landscape. Food scenes are often early indicators of neighborhood transformation 
                    and investment potential.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-purple-400 mb-3">Weekend Adventures</h3>
                  <p className="text-gray-300 leading-relaxed">
                    When not showing properties, you'll find me cycling across the Golden Gate, exploring Marin's hiking trails, 
                    or catching live music in various venues around the city. These experiences help me understand what draws 
                    people to different areas and lifestyles.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Market Expertise Section */}
      <section className="py-20 px-6 md:px-16" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-medium text-gray-800 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Market Specializations
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Deep expertise across San Francisco's diverse property types and neighborhoods.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0H7m5 0v-9a3 3 0 00-6 0v9m6 0a3 3 0 006 0v-9a3 3 0 00-6 0v9" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Victorian & Edwardian Homes</h3>
              <p className="text-gray-700 text-sm">
                Expert in SF's historic architecture, renovation potential, and preservation requirements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Luxury Condominiums</h3>
              <p className="text-gray-700 text-sm">
                Specialized in high-end building amenities, HOA analysis, and luxury market trends.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Investment Properties</h3>
              <p className="text-gray-700 text-sm">
                Multi-unit buildings, cash flow analysis, and rental market dynamics expertise.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Emerging Neighborhoods</h3>
              <p className="text-gray-700 text-sm">
                Early identification of up-and-coming areas with strong growth potential.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
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
              What Clients Say
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Real experiences from real people who trusted me with their biggest investment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <div className="mb-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  "Kaz made what seemed impossible happen. We were competing against 15 other offers on our dream Victorian in Pacific Heights. His strategic approach and deep knowledge of what sellers actually want helped us win with an offer that wasn't the highest. Six months later, we couldn't be happier."
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">JS</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Jennifer & Steve M.</div>
                  <div className="text-gray-400 text-sm">Pacific Heights Buyers</div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <div className="mb-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  "As first-time sellers, we were overwhelmed by the process. Kaz broke everything down in terms we could understand and guided us through each step. His marketing strategy was spot-on—we had multiple offers within 48 hours and sold for 12% over asking."
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">MR</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Maria & Robert L.</div>
                  <div className="text-gray-400 text-sm">Noe Valley Sellers</div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <div className="mb-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  "Kaz's tech background really shows. He used data and market analysis to help us find an investment property that others overlooked. The building has already appreciated 20% in 18 months. His analytical approach gives me confidence in his recommendations."
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">DW</span>
                </div>
                <div>
                  <div className="text-white font-semibold">David W.</div>
                  <div className="text-gray-400 text-sm">Investment Property Buyer</div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <div className="mb-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  "Moving from New York, we knew nothing about SF neighborhoods. Kaz didn't just show us houses—he showed us communities. His insights into everything from commute patterns to school districts helped us find the perfect fit in the Marina."
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">AS</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Amanda & Sam K.</div>
                  <div className="text-gray-400 text-sm">Marina District Buyers</div>
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
            Ready to Get Started?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-xl text-gray-300 mb-12 leading-relaxed"
          >
            Whether you're looking to buy, sell, or just have questions about the San Francisco market, I'm here to help.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <a
              href="mailto:kaz@kazviskrealty.com?subject=Let's Talk Real Estate&body=Hi Kaz, I'd like to discuss my real estate needs. Please contact me."
              className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-xl"
            >
              Get In Touch
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </a>

            <a
              href="tel:+14155133387"
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-medium rounded-lg hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-xl"
            >
              (415) 513-3387
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}