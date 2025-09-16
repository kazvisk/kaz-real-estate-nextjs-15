'use client';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function KazContactPage() {
  const [isVCardDownloaded, setIsVCardDownloaded] = useState(false);

  const downloadVCard = () => {
    window.location.href = '/kaz-contact-download';
    setIsVCardDownloaded(true);
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:kaz@kazviskrealty.com';
  };

  const handleCallClick = () => {
    window.location.href = 'tel:4155133387';
  };

  const handleTextClick = () => {
    window.location.href = 'sms:4155133387';
  };

  const handleWebsiteClick = () => {
    window.location.href = 'https://kazviskrealty.com';
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Kaz Viskanta - San Francisco REALTOR®',
        text: 'Connect with Kaz Viskanta, your trusted real estate professional at Vanguard Properties.',
        url: window.location.href,
      });
    }
  };

  return (
    <div 
      className="min-h-dvh"
      style={{ backgroundColor: '#131925', fontFamily: 'Manrope, sans-serif' }}
    >
      {/* Hero Section */}
      <div className="relative h-[clamp(10rem,26vh,18rem)]">
        <Image
          src="/videos/poster.jpg"
          alt="Kaz Viskanta Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        {/* Circular profile, half overlapping the bottom of the hero */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-10">
          <div className="w-[clamp(8rem,22vh,12rem)] h-[clamp(8rem,22vh,12rem)] rounded-full overflow-hidden border border-white/20 shadow-2xl">
            <Image
              src="/headshot.jpg"
              alt="Kaz Viskanta"
              width={208}
              height={208}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Contact Info Section with Overlapping Profile */}
      <div className="relative" style={{ backgroundColor: '#131925' }}>
        <div className="pt-[clamp(5rem,12vh,6.5rem)] pb-4">
          <div className="max-w-md mx-auto text-center px-6">
            <h1 className="text-4xl font-medium text-white mb-2">Kaz Viskanta</h1>
            <p className="text-xl text-gray-400 font-medium mb-1">Vanguard Properties</p>
            <p className="text-gray-400 mb-6">San Francisco REALTOR® — CA DRE #02318574</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-md mx-auto px-6 pb-6">
          {/* Main CTA - Add Contact */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={downloadVCard}
            className="w-full p-5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-xl mb-6 flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-semibold text-lg">Add to Contacts</span>
          </motion.button>

          {/* Primary Actions */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-4 gap-3 mb-6"
          >
            <button
              onClick={handleEmailClick}
              className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-lg hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-xl"
            >
              <svg className="w-7 h-7 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-medium">Email</span>
            </button>

            <button
              onClick={handleCallClick}
              className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-lg hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-xl"
            >
              <svg className="w-7 h-7 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-xs font-medium">Call</span>
            </button>

            <button
              onClick={handleTextClick}
              className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-lg hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-xl"
            >
              <svg className="w-7 h-7 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-xs font-medium">Text</span>
            </button>

            <button
              onClick={handleWebsiteClick}
              className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-lg hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-xl"
            >
              <svg className="w-7 h-7 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="text-xs font-medium">Website</span>
            </button>
          </motion.div>

          {/* Share Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            onClick={handleShareClick}
            className="w-full p-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-lg hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span className="font-medium">Share Contact</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}