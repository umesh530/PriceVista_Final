import React, { useEffect, useState } from 'react'

const bubbleStyles = [
  { width: 80, height: 80, left: 40, bottom: 60, background: "rgba(255,255,255,0.15)", animation: "bubbleMove1 12s linear infinite" },
  { width: 120, height: 120, right: 120, top: 40, background: "rgba(255,255,255,0.10)", animation: "bubbleMove2 14s linear infinite" },
  { width: 100, height: 100, right: 80, bottom: 40, background: "rgba(255,255,255,0.12)", animation: "bubbleMove3 10s linear infinite" },
  { width: 60, height: 60, left: 100, top: 120, background: "rgba(255,255,255,0.18)", animation: "bubbleMove4 16s linear infinite" },
  { width: 90, height: 90, right: 40, top: 200, background: "rgba(255,255,255,0.13)", animation: "bubbleMove5 18s linear infinite" },
  { width: 70, height: 70, left: 200, bottom: 120, background: "rgba(255,255,255,0.14)", animation: "bubbleMove6 15s linear infinite" },
  { width: 50, height: 50, right: 180, bottom: 100, background: "rgba(255,255,255,0.16)", animation: "bubbleMove7 13s linear infinite" },
];

const AboutUs = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div
      className={`
        w-full min-h-screen px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-8 flex flex-col items-center relative
        mt-16 transition-all duration-500
        ${darkMode 
          ? 'bg-gradient-to-r from-slate-900 via-gray-900 to-black' 
          : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600'
        }
      `}
    >
      {/* Animated bubbles */}
      {bubbleStyles.map((style, idx) => (
        <div
          key={idx}
          className="absolute rounded-full bubble"
          style={{
            ...style,
            zIndex: 0,
          }}
        />
      ))}
      {/* Extra bubbles for dark theme */}
      {darkMode && (
        <>
          <div
            className="absolute rounded-full bubble"
            style={{
              width: 110,
              height: 110,
              left: 80,
              top: 180,
              background: "rgba(60,70,100,0.25)",
              animation: "bubbleDark1 18s linear infinite",
              zIndex: 0,
            }}
          />
          <div
            className="absolute rounded-full bubble"
            style={{
              width: 70,
              height: 70,
              right: 60,
              bottom: 180,
              background: "rgba(60,70,100,0.20)",
              animation: "bubbleDark2 22s linear infinite",
              zIndex: 0,
            }}
          />
          <div
            className="absolute rounded-full bubble"
            style={{
              width: 90,
              height: 90,
              left: 300,
              top: 60,
              background: "rgba(60,70,100,0.18)",
              animation: "bubbleDark3 20s linear infinite",
              zIndex: 0,
            }}
          />
        </>
      )}
      <style>
        {`
          .dark .bubble {
            background: rgba(60,70,100,0.18) !important;
          }
          @keyframes bubbleMove1 { 0%{transform:translateY(0)scale(1);} 50%{transform:translateY(-30px)scale(1.1);} 100%{transform:translateY(0)scale(1);} }
          @keyframes bubbleMove2 { 0%{transform:translateY(0)scale(1);} 50%{transform:translateY(40px)scale(0.95);} 100%{transform:translateY(0)scale(1);} }
          @keyframes bubbleMove3 { 0%{transform:translateX(0)scale(1);} 50%{transform:translateX(-30px)scale(1.08);} 100%{transform:translateX(0)scale(1);} }
          @keyframes bubbleMove4 { 0%{transform:translateY(0)scale(1);} 50%{transform:translateY(-20px)scale(1.05);} 100%{transform:translateY(0)scale(1);} }
          @keyframes bubbleMove5 { 0%{transform:translateX(0)scale(1);} 50%{transform:translateX(30px)scale(0.92);} 100%{transform:translateX(0)scale(1);} }
          @keyframes bubbleMove6 { 0%{transform:translateY(0)scale(1);} 50%{transform:translateY(25px)scale(1.07);} 100%{transform:translateY(0)scale(1);} }
          @keyframes bubbleMove7 { 0%{transform:translateX(0)scale(1);} 50%{transform:translateX(-20px)scale(1.03);} 100%{transform:translateX(0)scale(1);} }
          @keyframes bubbleDark1 { 0%{transform:translateY(0)scale(1);} 50%{transform:translateY(-40px)scale(1.12);} 100%{transform:translateY(0)scale(1);} }
          @keyframes bubbleDark2 { 0%{transform:translateX(0)scale(1);} 50%{transform:translateX(40px)scale(1.08);} 100%{transform:translateX(0)scale(1);} }
          @keyframes bubbleDark3 { 0%{transform:translateY(0)scale(1);} 50%{transform:translateY(30px)scale(0.95);} 100%{transform:translateY(0)scale(1);} }
        `}
      </style>
      <div className="w-full max-w-4xl text-center mb-12 relative z-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1a237e] dark:text-[#e3e6f5] mb-4">About PriceVista</h1>
        <p className="text-lg sm:text-xl text-[#283593] dark:text-[#bfc3d9] max-w-3xl mx-auto">
          We're on a mission to help consumers make smarter purchasing decisions 
          by providing transparent price tracking and comparison tools.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 relative z-10">
        <div className="rounded-lg p-6">
          <h2 className="text-2xl font-bold text-[#1a237e] dark:text-white mb-4">Our Mission</h2>
          <p className="text-[#283593] dark:text-[#181a2a] leading-relaxed">
            PriceVista was founded with a simple goal: to eliminate the frustration 
            of overpaying for products. We believe that every consumer deserves 
            access to accurate, real-time pricing information to make informed decisions.
          </p>
        </div>
        <div className="rounded-lg p-6">
          <h2 className="text-2xl font-bold text-[#1a237e] dark:text-white mb-4">Our Vision</h2>
          <p className="text-[#283593] dark:text-[#181a2a] leading-relaxed">
            We envision a world where price transparency is the norm, not the exception. 
            Our platform empowers users to track prices, compare retailers, and 
            never miss the best deals available.
          </p>
        </div>
      </div>

      <div className="w-full max-w-5xl bg-gray-50 dark:bg-[#181a2a] rounded-lg p-4 sm:p-8 mb-16 relative z-10">
        <h2 className="text-2xl font-bold text-[#1a237e] dark:text-[#e3e6f5] mb-6 text-center">Why Choose PriceVista?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#1a237e] dark:text-[#e3e6f5] mb-2">Real-time Updates</h3>
            <p className="text-[#283593] dark:text-[#bfc3d9]">Get instant notifications when prices drop on your tracked products.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#1a237e] dark:text-[#e3e6f5] mb-2">Comprehensive Tracking</h3>
            <p className="text-[#283593] dark:text-[#bfc3d9]">Monitor prices across multiple retailers and platforms in one place.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#1a237e] dark:text-[#e3e6f5] mb-2">Secure & Private</h3>
            <p className="text-[#283593] dark:text-[#bfc3d9]">Your data is protected with industry-standard security measures.</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl text-center mb-16 relative z-10">
        <h2 className="text-2xl font-bold text-[#1a237e] dark:text-[#e3e6f5] mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-[#181a2a] rounded-lg shadow p-6 text-center">
            <h4 className="font-semibold text-primary-700 dark:text-blue-200 mb-2">1. Track Products</h4>
            <p className="text-[#283593] dark:text-[#bfc3d9]">Add products you want to monitor. We’ll keep an eye on prices for you.</p>
          </div>
          <div className="bg-white dark:bg-[#181a2a] rounded-lg shadow p-6 text-center">
            <h4 className="font-semibold text-primary-700 dark:text-blue-200 mb-2">2. Get Alerts</h4>
            <p className="text-[#283593] dark:text-[#bfc3d9]">Receive instant notifications when prices drop or deals are available.</p>
          </div>
          <div className="bg-white dark:bg-[#181a2a] rounded-lg shadow p-6 text-center">
            <h4 className="font-semibold text-primary-700 dark:text-blue-200 mb-2">3. Compare & Save</h4>
            <p className="text-[#283593] dark:text-[#bfc3d9]">Compare prices across retailers and make the smartest purchase.</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mb-16 relative z-10 bg-[#1a237e] dark:bg-[#0a0d17] rounded-lg p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h4 className="font-semibold text-blue-200 mb-2">Transparency</h4>
            <p className="text-blue-100">
              We are committed to open, honest pricing data. Every user deserves clarity and fairness in every purchase.
            </p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-blue-200 mb-2">Integrity</h4>
            <p className="text-blue-100">
              Our platform is built on trust. We never compromise your privacy or the accuracy of our information.
            </p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-blue-200 mb-2">Innovation</h4>
            <p className="text-blue-100">
              We constantly evolve, bringing you smarter tools and new features to help you save more, every day.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl text-center relative z-10 bg-[#1a237e] dark:bg-[#0a0d17] rounded-lg p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-white mb-4">Join Our Community</h2>
        <p className="text-blue-100 mb-2 font-semibold">
          Take control of your shopping. Discover the power of PriceVista and never miss a deal again.
        </p>
        <p className="text-blue-100 mb-6">
          Need help or have questions? <span className="font-bold">We're here for you.</span> Email us at <a href="mailto:support@pricevista.com" className="text-blue-300 underline">support@pricevista.com</a>
        </p>
        <button className="btn-primary text-lg px-8 py-3 mb-2 font-bold">
          Get Started Free
        </button>
        <div className="mt-2">
          <a href="/signup" className="text-blue-300 underline text-sm font-semibold">Create your free account</a>
        </div>
      </div>

      <div className="w-full max-w-5xl mb-16 text-center relative z-10">
        <h2 className="text-2xl font-bold text-[#1a237e] dark:text-[#e3e6f5] mb-4">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center">
          <div className="bg-white bg-opacity-80 dark:bg-[#181a2a] dark:bg-opacity-100 rounded-lg shadow p-4 flex flex-col items-center">
            <img src="/team/prerna.jpg" alt="Prerna Supe" className="w-24 h-24 rounded-full mb-2 object-cover" />
            <span className="font-bold text-[#1a237e] dark:text-[#e3e6f5]">Prerna Supe</span>
          </div>
          <div className="bg-white bg-opacity-80 dark:bg-[#181a2a] dark:bg-opacity-100 rounded-lg shadow p-4 flex flex-col items-center">
            <img src="/team/umesh.jpg" alt="Umesh Lokhare" className="w-24 h-24 rounded-full mb-2 object-cover" />
            <span className="font-bold text-[#1a237e] dark:text-[#e3e6f5]">Umesh Lokhare</span>
          </div>
          <div className="bg-white bg-opacity-80 dark:bg-[#181a2a] dark:bg-opacity-100 rounded-lg shadow p-4 flex flex-col items-center">
            <img src="/team/praj.jpg" alt="Praj" className="w-24 h-24 rounded-full mb-2 object-cover" />
            <span className="font-bold text-[#1a237e] dark:text-[#e3e6f5]">Praj</span>
          </div>
          <div className="bg-white bg-opacity-80 dark:bg-[#181a2a] dark:bg-opacity-100 rounded-lg shadow p-4 flex flex-col items-center">
            <img src="/team/sharval.jpg" alt="Sharval Mokat" className="w-24 h-24 rounded-full mb-2 object-cover" />
            <span className="font-bold text-[#1a237e] dark:text-[#e3e6f5]">Sharval Mokat</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs