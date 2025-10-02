import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { useTheme } from '../context/ThemeContext';
import { useParallax } from '../utils/useParallax';
import MicroButton from '../components/MicroButton';

const HomePage = () => {

  const [featuredProducts, setFeaturedProducts] = useState([])
  const [trendingProducts, setTrendingProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { isDark } = useTheme()
  const heroBgRef = useRef(null);
  const controls = useAnimation();

  useParallax(heroBgRef, 0.15);
  useEffect(() => { controls.start('visible'); }, [controls]);

  useEffect(() => {
    fetchHomeData()
  }, [])

  const fetchHomeData = async () => {
    try {
      setLoading(true)
      const mockFeatured = generateMockProducts(6)
      const mockTrending = generateMockProducts(8)
      setFeaturedProducts(mockFeatured)
      setTrendingProducts(mockTrending)
    } catch (error) {
      console.error('Failed to fetch home data:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateMockProducts = (count) => {
    const products = []
    const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Toys']
    const retailers = ['Amazon', 'Walmart', 'Target', 'Best Buy', 'eBay']
    const productTemplates = {
      'Electronics': ['Laptop', 'Smartphone', 'Headphones', 'Camera', 'TV', 'Monitor'],
      'Fashion': ['Shirt', 'Dress', 'Shoes', 'Watch', 'Jacket'],
      'Home & Garden': ['Furniture', 'Sofa', 'Table', 'Chair', 'Lamp'],
      'Sports': ['Football', 'Basketball', 'Tennis Racket', 'Yoga Mat'],
      'Books': ['Book', 'Novel', 'Textbook', 'Magazine'],
      'Toys': ['Toy', 'Lego Set', 'Doll', 'Board Game']
    }
    for (let i = 0; i < count; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)]
      const templates = productTemplates[category] || ['Product']
      const template = templates[Math.floor(Math.random() * templates.length)]
      const basePrice = 50 + Math.random() * 200
      const discount = Math.random() > 0.5 ? Math.random() * 30 : 0
      const price = basePrice - (basePrice * discount / 100)
      const brandNames = ['Premium', 'Elite', 'Pro', 'Max', 'Ultra', 'Smart']
      const brand = brandNames[Math.floor(Math.random() * brandNames.length)]
      const productName = `${brand} ${template} ${i + 1}`
      products.push({
        id: i + 1,
        name: productName,
        image: `https://picsum.photos/300/200?random=${i + 1}`,
        price: Math.round(price * 100) / 100,
        originalPrice: Math.round(basePrice * 100) / 100,
        retailer: retailers[Math.floor(Math.random() * retailers.length)],
        rating: 3.5 + Math.random() * 1.5,
        reviewCount: Math.floor(Math.random() * 1000) + 50,
        inStock: Math.random() > 0.2,
        discount: Math.round(discount),
        category: category
      })
    }
    return products
  }

  const features = [
    {
      title: "Smart Price Tracking",
      description: "Monitor price changes and get notified when your desired products go on sale.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Multi-Retailer Comparison",
      description: "Compare prices across different stores to find the best deals available.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      title: "Price History & Trends",
      description: "View price history and trends to make informed purchasing decisions.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6zM4 13h6V7H4v6zM4 1h6V1H4v6z" />
        </svg>
      )
    },
    {
      title: "Real-time Alerts",
      description: "Get instant notifications when prices drop on your tracked items.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ]

  if (loading) {
    return <Loader fullScreen text="Loading PriceVista..." />
  }

  return (
    <div className={`min-h-screen pt-16 text-white relative overflow-hidden transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-r from-slate-900 via-gray-900 to-black' 
        : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600'
    }`}>
      {/* Parallax animated background shapes */}
      <div ref={heroBgRef} className="absolute inset-0 opacity-25 pointer-events-none select-none">
        {/* ...existing background shapes, can be further enhanced with GSAP if needed... */}
        <motion.div 
          className={`absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl ${isDark ? 'bg-slate-600/40' : 'bg-blue-400/40'}`}
          animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className={`absolute bottom-32 right-32 w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-gray-600/40' : 'bg-purple-500/40'}`}
          animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 0.8, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className={`absolute top-1/2 left-1/3 w-80 h-80 rounded-full blur-3xl ${isDark ? 'bg-slate-500/30' : 'bg-indigo-400/30'}`}
          animate={{ x: [0, 60, 0], y: [0, -50, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        <motion.div 
          className={`absolute top-1/3 right-1/4 w-64 h-64 rounded-full blur-2xl ${isDark ? 'bg-gray-500/25' : 'bg-cyan-400/25'}`}
          animate={{ x: [0, -30, 0], y: [0, 30, 0], scale: [1, 0.9, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        {/* ...existing floating particles... */}
        <motion.div 
          className={`absolute top-1/4 right-1/3 w-4 h-4 rounded-full ${isDark ? 'bg-gray-400/20' : 'bg-white/20'}`}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className={`absolute bottom-1/4 left-1/4 w-3 h-3 rounded-full ${isDark ? 'bg-gray-400/15' : 'bg-white/15'}`}
          animate={{ y: [0, -15, 0], opacity: [0.1, 0.6, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className={`absolute top-3/4 right-1/2 w-2 h-2 rounded-full ${isDark ? 'bg-gray-400/25' : 'bg-white/25'}`}
          animate={{ y: [0, -10, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Hero Section with advanced stagger and magnetic buttons */}
      <section className="relative py-20 lg:py-32 text-center">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight cursor-default"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } }
          }}
        >
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            Track Prices,
          </motion.span>{' '}
          <motion.span
            className="inline-block bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 bg-clip-text text-transparent"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            initial={{ backgroundPosition: '0% 50%' }}
            animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
            transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
            style={{ backgroundSize: '200% 200%' }}
          >
            Save Money
          </motion.span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed font-light text-blue-100"
          initial="hidden"
          animate={controls}
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          transition={{ delay: 0.2 }}
        >
          Never overpay again. PriceVista tracks prices across multiple retailers
          and alerts you when prices drop on your favorite products.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial="hidden"
          animate={controls}
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          transition={{ delay: 0.4 }}
        >
          <MicroButton onClick={() => window.location.href = '/search'}>
            Start Searching
          </MicroButton>
          <MicroButton className="bg-purple-700/80 text-white border border-white/30">
            <span onClick={() => window.location.href = '/tracker'}>Price Tracker</span>
          </MicroButton>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className={`py-20 backdrop-blur-md rounded-t-3xl relative z-10 transition-all duration-500 ${
        isDark ? 'bg-gray-800/20' : 'bg-white/20'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Why Choose PriceVista?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Powerful features designed to help you save money and make smarter purchasing decisions.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`text-center p-8 rounded-2xl shadow-xl border transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 hover:shadow-2xl' 
                    : 'bg-white border-gray-100 hover:shadow-2xl'
                }`}
              >
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white">
                    {feature.icon}
                  </div>
                <h3 className={`text-xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  {feature.title}
                </h3>
                <p className={`leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={`py-20 relative z-10 backdrop-blur-md transition-all duration-500 ${
        isDark ? 'bg-gray-800/30' : 'bg-white/30'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
              Featured Products
            </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard product={product} index={index} key={product.id} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className={`py-20 relative z-10 backdrop-blur-md transition-all duration-500 ${
        isDark 
          ? 'bg-gradient-to-r from-gray-700/30 via-gray-600/30 to-gray-800/30' 
          : 'bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-indigo-500/30'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
              Trending Now
            </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, index) => (
              <ProductCard product={product} index={index} key={product.id} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              Ready to Start Saving?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
              Join thousands of smart shoppers who are already saving money with PriceVista.
            </p>
        <Link
          to="/auth"
          className={`inline-block font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 ${
            isDark 
              ? 'bg-white text-gray-800 hover:bg-gray-100' 
              : 'bg-white text-purple-800 hover:bg-gray-50'
          }`}
        >
          Get Started Free
        </Link>
      </section>
    </div>
  )
}

export default HomePage 
