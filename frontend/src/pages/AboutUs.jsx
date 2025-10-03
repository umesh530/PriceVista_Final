import React, { useState } from 'react'
import { useTheme } from "../context/ThemeContext"
import { motion } from "framer-motion"

const AboutUs = () => {
  const { isDark } = useTheme()
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div
      className={`
        w-full min-h-screen px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-8 flex flex-col items-center relative
        mt-16 transition-all duration-500
        ${isDark 
          ? 'bg-gradient-to-r from-gray-900 via-black to-gray-900' 
          : 'bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600'
        }
      `}
    >
      {/* Hero Section */}
      <div className="w-full max-w-6xl mb-12 relative overflow-hidden rounded-2xl shadow-lg">
        <div className="absolute inset-0 -z-10">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/logo.jpg"
          >
            <source src="https://cdn.coverr.co/videos/coverr-shopping-cart-9153/1080p.mp4" type="video/mp4" />
          </video>
          <div className={`${isDark ? 'bg-black/80' : 'bg-indigo-950/60'} absolute inset-0`} />
        </div>
        <div className="px-6 sm:px-10 py-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-md mb-4">
            Smarter Shopping Starts Here
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-6">
            PriceVista tracks prices across stores, alerts you on drops, and helps you buy at the right time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            <div className="bg-white dark:bg-[#181a2a]/95 rounded-xl p-5 shadow border border-white/20 dark:border-white/10 h-full flex flex-col">
              <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-300 mb-1">Real-time Alerts</div>
              <div className="text-[#1a237e] dark:text-[#e3e6f5] font-bold mb-1">Never miss a price drop</div>
              <p className="text-[#283593] dark:text-[#bfc3d9] text-sm">Instant notifications when products hit your target price.</p>
            </div>
            <div className="bg-white dark:bg-[#181a2a]/95 rounded-xl p-5 shadow border border-white/20 dark:border-white/10 h-full flex flex-col">
              <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-300 mb-1">Smart Comparisons</div>
              <div className="text-[#1a237e] dark:text-[#e3e6f5] font-bold mb-1">See the best retailer</div>
              <p className="text-[#283593] dark:text-[#bfc3d9] text-sm">Compare across stores with fees and shipping considered.</p>
            </div>
            <div className="bg-white dark:bg-[#181a2a]/95 rounded-xl p-5 shadow border border-white/20 dark:border-white/10 h-full flex flex-col">
              <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-300 mb-1">Historical Insights</div>
              <div className="text-[#1a237e] dark:text-[#e3e6f5] font-bold mb-1">Buy at the right time</div>
              <p className="text-[#283593] dark:text-[#bfc3d9] text-sm">Trend charts show if now is the best moment to purchase.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 relative z-10 items-stretch">
        <div className="bg-white/90 dark:bg-[#181a2a] rounded-xl p-4 text-center shadow h-full flex flex-col justify-center">
          <div className="text-2xl font-extrabold text-[#1a237e] dark:text-[#e3e6f5]">50k+</div>
          <div className="text-xs text-[#283593] dark:text-[#bfc3d9]">Active Users</div>
        </div>
        <div className="bg-white/90 dark:bg-[#181a2a] rounded-xl p-4 text-center shadow h-full flex flex-col justify-center">
          <div className="text-2xl font-extrabold text-[#1a237e] dark:text-[#e3e6f5]">1M+</div>
          <div className="text-xs text-[#283593] dark:text-[#bfc3d9]">Prices Tracked</div>
        </div>
        <div className="bg-white/90 dark:bg-[#181a2a] rounded-xl p-4 text-center shadow h-full flex flex-col justify-center">
          <div className="text-2xl font-extrabold text-[#1a237e] dark:text-[#e3e6f5]">$3.2M</div>
          <div className="text-xs text-[#283593] dark:text-[#bfc3d9]">Saved by Users</div>
        </div>
        <div className="bg-white/90 dark:bg-[#181a2a] rounded-xl p-4 text-center shadow h-full flex flex-col justify-center">
          <div className="text-2xl font-extrabold text-[#1a237e] dark:text-[#e3e6f5]">120+</div>
          <div className="text-xs text-[#283593] dark:text-[#bfc3d9]">Retailers Covered</div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 relative z-10">
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="rounded-lg p-6 bg-black/60 dark:bg-[#0a0d17]/80 shadow-lg border border-white/20"
        >
          <h2 className="text-2xl font-extrabold text-[white] dark:text-white mb-4">Our Mission</h2>
          <p className="text-xl text-white leading-relaxed">
            PriceVista was founded with a simple goal: to eliminate the frustration 
            of overpaying for products. We believe that every consumer deserves 
            access to accurate, real-time pricing information to make informed decisions.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="rounded-lg p-6 bg-black/60 dark:bg-[#0a0d17]/80 shadow-lg border border-white/20"
        >
          <h2 className="text-2xl font-extrabold text-[white] dark:text-white mb-4">Our Vision</h2>
          <p className="text-xl text-white leading-relaxed">
            We envision a world where price transparency is the norm, not the exception. 
            Our platform empowers users to track prices, compare retailers, and 
            never miss the best deals available.
          </p>
        </motion.div>
      </div>

      {/* Roadmap */}
      <div className="w-full max-w-6xl text-center mb-16 relative z-10 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 -z-10">
          {/* Demo background image for roadmap */}
          <img 
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80" 
            className="w-full h-full object-cover" 
            alt="Roadmap background"
          />
          <div className={`${isDark ? 'bg-black/70' : 'bg-white/60'} absolute inset-0`} />
        </div>
        <h2 className="text-3xl font-bold text-[#1a237e] dark:text-white mb-6">Our Roadmap</h2>
        <div className="relative mx-auto max-w-3xl">
          <div className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] ${isDark ? 'bg-white/30' : 'bg-indigo-800/20'}`} />
          {[
            { title: 'Q1: Advanced Alerts', desc: 'AI-powered signals and better thresholds.' },
            { title: 'Q2: More Stores', desc: 'Expanding coverage to international retailers.' },
            { title: 'Q3: Collections', desc: 'Track product bundles and wishlists.' },
          ].map((step, i) => (
            <div key={i} className={`relative flex items-start gap-4 mb-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className="w-1/2" />
              <div className="relative rounded-lg shadow w-1/2 overflow-hidden">
                {/* Demo image for each roadmap step */}
                <img 
                  src={'https://slidemodel.com/wp-content/uploads/00_product-roadmap-cover.png'} 
                  alt="" 
                  aria-hidden="true" 
                  className="absolute inset-0 w-full h-full object-cover opacity-20" 
                />
                <div className="absolute inset-0 bg-white/85 dark:bg-[#181a2a]/85" />
                <div className="relative p-4">
                  <div className="absolute -left-2 top-4 w-4 h-4 rounded-full bg-indigo-600 dark:bg-indigo-400 border-2 border-white dark:border-[#181a2a]" />
                  <div className="font-semibold text-[#1a237e] dark:text-[#e3e6f5]">{step.title}</div>
                  <p className="text-sm text-[#283593] dark:text-[#bfc3d9]">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="w-full max-w-6xl mb-16 relative z-10">
        <h2 className="text-3xl font-bold text-[#1a237e] dark:text-[#e3e6f5] mb-6 text-center">What Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Aarav', quote: 'PriceVista helped me time my laptop purchase and saved 18%.', role: 'Student' },
            { name: 'Meera', quote: 'The alerts are spot on. I finally stopped refreshing product pages.', role: 'Designer' },
            { name: 'Rahul', quote: 'Love the history charts. Makes it easy to decide when to buy.', role: 'Engineer' },
          ].map((t, i) => (
            <div key={i} className="bg-white/90 dark:bg-[#181a2a] rounded-xl shadow p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-[#1a237e] dark:text-[#e3e6f5]">{t.name}</div>
                  <div className="text-xs text-[#283593] dark:text-[#bfc3d9]">{t.role}</div>
                </div>
              </div>
              <p className="text-[#283593] dark:text-[#bfc3d9]">“{t.quote}”</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Values (darker + bigger font) */}
      <div 
        className={`w-full max-w-5xl mb-16 relative z-10 rounded-lg p-8 sm:p-12 
          ${isDark 
            ? 'bg-[#05060f]/95' 
            : 'bg-gradient-to-r from-blue-700 via-purple-600 to-blue-700'
          }`}
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center">
            <h4 className="font-semibold text-blue-200 mb-3 text-xl">Transparency</h4>
            <p className="text-blue-100 text-lg leading-relaxed">
              We are committed to open, honest pricing data. Every user deserves clarity and fairness in every purchase.
            </p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-blue-200 mb-3 text-xl">Integrity</h4>
            <p className="text-blue-100 text-lg leading-relaxed">
              Our platform is built on trust. We never compromise your privacy or the accuracy of our information.
            </p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-blue-200 mb-3 text-xl">Innovation</h4>
            <p className="text-blue-100 text-lg leading-relaxed">
              We constantly evolve, bringing you smarter tools and new features to help you save more, every day.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="w-full max-w-5xl mb-16 relative z-10">
        <h2 className="text-2xl font-bold text-[#1a237e] dark:text-[#e3e6f5] mb-4 text-center">FAQs</h2>
        {[
          { q: 'Is PriceVista free to use?', a: 'Yes, core features are free. Advanced tools may be offered later.' },
          { q: 'Which stores are supported?', a: 'We track major retailers and are continuously adding more.' },
          { q: 'How often are prices updated?', a: 'We refresh frequently and notify you about meaningful changes.' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-[#181a2a] rounded-lg shadow p-4 mb-3">
            <button
              className="w-full flex items-center justify-between text-left"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              aria-expanded={openFaq === idx}
            >
              <span className="font-semibold text-[#1a237e] dark:text-[#e3e6f5]">{item.q}</span>
              <span className="text-[#283593] dark:text-[#bfc3d9]">{openFaq === idx ? '−' : '+'}</span>
            </button>
            {openFaq === idx && (
              <p className="mt-2 text-[#283593] dark:text-[#bfc3d9]">{item.a}</p>
            )}
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="w-full max-w-5xl text-center relative z-10 bg-[#1a237e] dark:bg-[#0a0d17] rounded-lg p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-white mb-4">Join Our Community</h2>
        <p className="text-blue-100 mb-2 font-semibold">
          Take control of your shopping. Discover the power of PriceVista and never miss a deal again.
        </p>
        <p className="text-blue-100 mb-6">
          Need help or have questions? <span className="font-bold">We're here for you.</span> Email us at <a href="mailto:support@pricevista.com" className="text-blue-300 underline">support@pricevista.com</a>
        </p>
        <div className="flex items-center justify-center gap-3">
          <a href="/signup" className="px-5 py-3 rounded-lg font-semibold text-white bg-indigo-600/90 hover:bg-indigo-600 transition">
            Get Started Free
          </a>
          <a href="/tracker" className="px-5 py-3 rounded-lg font-semibold text-blue-200 bg-white/10 hover:bg-white/20 border border-white/20 transition">
            Try the Tracker
          </a>
        </div>
      </div>

      {/* Team Section (with boxes and labels) */}
      <div className="w-full max-w-6xl mb-16 relative z-10">
        <h2 className="text-2xl font-bold text-[#1a237e] dark:text-[#e3e6f5] mb-3 text-center">Meet the Team</h2>

        <div className="relative">
          <div className="h-20 md:h-24 w-full rounded-t-2xl bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 dark:from-gray-800 dark:via-gray-900 dark:to-black" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 -mt-10 md:-mt-12 items-stretch">
            {[
              { name: 'Prerna Supe', img: 'https://randomuser.me/api/portraits/women/68.jpg' },
              { name: 'Umesh Lokhare', img: 'https://randomuser.me/api/portraits/men/65.jpg' },
              { name: 'Praj Bhairamangikar', img: 'https://randomuser.me/api/portraits/men/66.jpg' },
              { name: 'Sharval Mokat', img: 'https://randomuser.me/api/portraits/men/67.jpg' }
            ].map((m, i) => (
              <div key={i} className="flex flex-col items-center bg-white dark:bg-[#181a2a] rounded-xl shadow-lg p-4">
                {/* Role box above name */}
                <div className="mb-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-600/90 dark:bg-indigo-400/80 text-white dark:text-[#181a2a] text-xs font-semibold shadow">
                    Co-founder
                  </span>
                </div>
                <img src={m.img} alt={m.name} className="w-full h-32 object-cover rounded-xl shadow mb-2" />
                <div className="p-1 text-center">
                  <div className="font-semibold text-[#1a237e] dark:text-[#e3e6f5]">{m.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default AboutUs
