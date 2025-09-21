import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'


const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [trendingProducts, setTrendingProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHomeData()
  }, [])

  const fetchHomeData = async () => {
    try {
      setLoading(true)
      // Mock data for now - replace with actual API calls
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
    
    // Product name templates based on categories
    const productTemplates = {
      'Electronics': [
        'Laptop', 'Smartphone', 'Headphones', 'Camera', 'TV', 'Monitor', 'Gaming Console',
        'Tablet', 'Speaker', 'Microphone', 'Keyboard', 'Mouse', 'Webcam', 'Printer'
      ],
      'Fashion': [
        'Shirt', 'Dress', 'Jeans', 'Shoes', 'Jacket', 'Watch', 'Necklace', 'Ring',
        'Sneakers', 'Sunglasses', 'Handbag', 'Wallet', 'Belt', 'Scarf'
      ],
      'Home & Garden': [
        'Furniture', 'Sofa', 'Table', 'Chair', 'Bed', 'Kitchen Appliance', 'Garden Tool',
        'Plant', 'Lamp', 'Mirror', 'Cushion', 'Curtain', 'Rug', 'Vase'
      ],
      'Sports': [
        'Football', 'Basketball', 'Tennis Racket', 'Gym Equipment', 'Fitness Tracker',
        'Running Shoes', 'Sports Jersey', 'Water Bottle', 'Yoga Mat', 'Dumbbells'
      ],
      'Books': [
        'Book', 'Novel', 'Textbook', 'Magazine', 'Comic', 'Dictionary', 'Encyclopedia',
        'Biography', 'Fiction', 'Non-fiction', 'Poetry', 'Self-help'
      ],
      'Toys': [
        'Toy', 'Lego Set', 'Doll', 'Board Game', 'Puzzle', 'Action Figure', 'Stuffed Animal',
        'Building Blocks', 'Art Supplies', 'Educational Toy', 'Remote Control Car'
      ]
    }
    
    for (let i = 0; i < count; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)]
      const templates = productTemplates[category] || ['Product']
      const template = templates[Math.floor(Math.random() * templates.length)]
      
      const basePrice = 50 + Math.random() * 200
      const discount = Math.random() > 0.5 ? Math.random() * 30 : 0
      const price = basePrice - (basePrice * discount / 100)
      
      // Create a more realistic product name
      const brandNames = ['Premium', 'Elite', 'Pro', 'Max', 'Ultra', 'Smart', 'Advanced', 'Modern']
      const brand = brandNames[Math.floor(Math.random() * brandNames.length)]
      const productName = `${brand} ${template} ${i + 1}`
      
      products.push({
        id: i + 1,
        name: productName,
        image: `https://picsum.photos/300/200?random=${i + 1}`, // This will be overridden by ProductCard
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
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Smart Price Tracking",
      description: "Monitor price changes and get notified when your desired products go on sale."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: "Multi-Retailer Comparison",
      description: "Compare prices across different stores to find the best deals available."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6zM4 13h6V7H4v6zM4 1h6V1H4v6z" />
        </svg>
      ),
      title: "Price History & Trends",
      description: "View price history and trends to make informed purchasing decisions."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Real-time Alerts",
      description: "Get instant notifications when prices drop on your tracked items."
    }
  ]

  if (loading) {
    return <Loader fullScreen text="Loading PriceVista..." />
  }

  return (
    <div className="min-h-screen pt-16 bg-pattern">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero text-white py-20 lg:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full floating backdrop-blur-sm"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-white/20 rounded-full floating" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-white/20 rounded-full floating" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-32 right-1/3 w-36 h-36 bg-white/20 rounded-full floating" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 rounded-full floating" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Track Prices,{' '}
            <span className="gradient-text-hero">
              Save Money
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-10 text-blue-100 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Never overpay again. PriceVista tracks prices across multiple retailers 
            and alerts you when prices drop on your favorite products.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/search"
                className="inline-block btn-glass font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 hover:shadow-glow transform hover:scale-105 hover:-translate-y-1"
              >
                Start Searching
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/tracker"
                className="inline-block bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 shadow-glass hover:shadow-glow"
              >
                Price Tracker
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-dark-800 dark:to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Why Choose PriceVista?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
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
                className="text-center group"
              >
                <div className="glass-card p-8 hover:shadow-glow transition-all duration-300 dark:bg-dark-800/20 dark:border-dark-600/30">
                  <div className="bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white/50 dark:bg-dark-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              Featured Products
            </h2>
            <Link
              to="/search"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-all duration-300 flex items-center group"
            >
              View All 
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-dark-800 dark:to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              Trending Now
            </h2>
            <Link
              to="/search"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-all duration-300 flex items-center group"
            >
              View All 
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white/20 rounded-full floating"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/20 rounded-full floating" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full floating" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to Start Saving?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
              Join thousands of smart shoppers who are already saving money with PriceVista.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/auth"
                className="inline-block btn-glass font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 hover:shadow-glow transform hover:scale-105 hover:-translate-y-1"
              >
                Get Started Free
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage 