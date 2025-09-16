'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function ContactPage() {
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
    window.location.href = 'http://kazviskrealty.com';
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Kaz Viskanta - Realtor',
        text: 'Connect with Kaz Viskanta, your trusted real estate professional at Vanguard Properties.',
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-blue-500 to-blue-700">
        <Image
          src="/headerbackground.jpg"
          alt="Golden Gate Bridge"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src="/kazviskimg.jpg"
                alt="Kaz Viskanta"
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="bg-white pt-8 pb-4">
        <div className="max-w-md mx-auto text-center px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kaz Viskanta</h1>
          <p className="text-xl text-blue-600 font-semibold mb-1">Vanguard Properties</p>
          <p className="text-gray-600 mb-6">Realtor® | DRE#: [License Number]</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-md mx-auto px-6 pb-6">
        {/* Primary Actions */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <button
            onClick={handleEmailClick}
            className="flex flex-col items-center p-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span className="text-sm">Email</span>
          </button>

          <button
            onClick={handleCallClick}
            className="flex flex-col items-center p-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <span className="text-sm">Call</span>
          </button>

          <button
            onClick={handleTextClick}
            className="flex flex-col items-center p-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"/>
            </svg>
            <span className="text-sm">Text</span>
          </button>

          <button
            onClick={() => window.location.href = 'http://kazviskrealty.com'}
            className="flex flex-col items-center p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span className="text-sm">Connect</span>
          </button>
        </div>

        {/* Social Media */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <button className="flex flex-col items-center p-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="text-sm">Facebook</span>
          </button>

          <button className="flex flex-col items-center p-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="text-sm">LinkedIn</span>
          </button>

          <button className="flex flex-col items-center p-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            <span className="text-sm">Twitter</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={downloadVCard}
            className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
            <span className="font-semibold">ADD TO CONTACTS</span>
          </button>

          <button
            onClick={handleShareClick}
            className="flex items-center justify-center p-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
            </svg>
            <span className="font-semibold">SHARE</span>
          </button>
        </div>

        {/* Website Button */}
        <button
          onClick={handleWebsiteClick}
          className="w-full p-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <span className="font-semibold">Website</span>
        </button>
      </div>
    </div>
  );
}