import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'

const PriceTracker = () => {
  const [trackedProducts, setTrackedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    if (darkMode) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    fetchTrackedProducts()
  }, [])

  const fetchTrackedProducts = async () => {
    try {
      setLoading(true)
      // Mock data for now
      const mockProducts = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        name: `Tracked Product ${i + 1}`,
        image: `https://picsum.photos/300/200?random=${i + 300}`,
        price: 89.99 + Math.random() * 50,
        originalPrice: 120 + Math.random() * 50,
        retailer: 'Amazon',
        rating: 4.0 + Math.random() * 1,
        reviewCount: Math.floor(Math.random() * 1000) + 100,
        inStock: true,
        discount: Math.floor(Math.random() * 30)
      }))
      setTrackedProducts(mockProducts)
    } catch (error) {
      console.error('Failed to fetch tracked products:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loader fullScreen text="Loading tracked products..." />
  }

  // New bubble styles
  const bubbleStyles = [
    { width: 80, height: 80, left: 40, bottom: 60, background: 'rgba(255,255,255,0.15)', animation: 'bubbleMove1 12s linear infinite' },
    { width: 120, height: 120, right: 120, top: 40, background: 'rgba(255,255,255,0.10)', animation: 'bubbleMove2 14s linear infinite' },
    { width: 100, height: 100, right: 80, bottom: 40, background: 'rgba(255,255,255,0.12)', animation: 'bubbleMove3 10s linear infinite' },
    { width: 60, height: 60, left: 100, top: 120, background: 'rgba(255,255,255,0.18)', animation: 'bubbleMove4 16s linear infinite' },
    { width: 90, height: 90, right: 40, top: 200, background: 'rgba(255,255,255,0.13)', animation: 'bubbleMove5 18s linear infinite' },
    { width: 70, height: 70, left: 200, bottom: 120, background: 'rgba(255,255,255,0.14)', animation: 'bubbleMove6 15s linear infinite' },
    { width: 50, height: 50, right: 180, bottom: 100, background: 'rgba(255,255,255,0.16)', animation: 'bubbleMove7 13s linear infinite' }
  ]

  return (
    <div
      className={`
        relative w-full min-h-screen overflow-hidden px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-8
        flex flex-col items-center text-white mt-16 transition-all duration-500
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

      {/* Toggle Dark/Light Mode */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md text-sm font-medium hover:scale-105 transition z-10"
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      {/* Title */}
      <motion.h1
        className="relative text-4xl font-extrabold mb-10 text-center z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Price Tracker
      </motion.h1>

      {/* Product grid */}
      {trackedProducts.length > 0 ? (
        <motion.div
          className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 z-10"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
          {trackedProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="relative text-center py-16 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gray-200 text-lg">No products being tracked yet.</p>
        </motion.div>
      )}

      {/* Bubble animations */}
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
        `}
      </style>
    </div>
  )
}

export default PriceTracker
