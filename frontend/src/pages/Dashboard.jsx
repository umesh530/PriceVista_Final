import React, { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'
import { useTheme } from '../context/ThemeContext'

const demoProducts = [
  {
    name: 'Favorite Product 1',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    priceNow: '₹92.29',
    priceBefore: '₹113.86',
    retailer: 'Amazon',
    rating: 4,
    reviewCount: 238,
    discount: 19
  },
  {
    name: 'Favorite Product 2',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    priceNow: '₹95.77',
    priceBefore: '₹116.92',
    retailer: 'Amazon',
    rating: 4,
    reviewCount: 580,
    discount: 18
  }
]

const Dashboard = () => {
  const { user } = useUser()
  const { isDark } = useTheme ? useTheme() : { isDark: false }
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      // Mock data for now
      const mockFavorites = Array.from({ length: 3 }, (_, i) => ({
        id: i + 1,
        name: `Favorite Product ${i + 1}`,
        image: `https://picsum.photos/300/200?random=${i + 400}`,
        price: 79.99 + Math.random() * 40,
        originalPrice: 100 + Math.random() * 40,
        retailer: 'Amazon',
        rating: 4.2 + Math.random() * 0.8,
        reviewCount: Math.floor(Math.random() * 800) + 200,
        inStock: true,
        discount: Math.floor(Math.random() * 25)
      }))
      setFavorites(mockFavorites)
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loader fullScreen text="Loading dashboard..." />
  }

  return (
    <div className={`min-h-screen px-4 py-10 transition-colors ${isDark ? "bg-gradient-to-r from-gray-900 via-black to-gray-900" : "bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600"}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white mt-12">Welcome back, User!</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Favorites */}
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Your Favorites</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {demoProducts.map((product, idx) => (
                <div key={idx} className="bg-white dark:bg-[#181a2a] rounded-xl shadow-md overflow-hidden min-h-[340px] flex flex-col">
                  <div className="relative w-full h-44 md:h-52 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      -{product.discount}%
                    </span>
                  </div>
                  {/* Info section with white background in both light and dark mode */}
                  <div className="flex flex-col p-4 gap-1 flex-grow bg-white dark:bg-white dark:text-gray-900 transition-colors">
                    <h3 className="text-base font-semibold">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-green-600">{product.priceNow}</span>
                      <span className="text-xs text-gray-500 line-through">{product.priceBefore}</span>
                    </div>
                    <p className="text-xs text-gray-600">Sold by <span className="font-medium">{product.retailer}</span></p>
                    <div className="flex items-center text-xs text-yellow-500">
                      <span>⭐ {product.rating}</span>
                      <span className="ml-2 text-gray-500">({product.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <button
                    className="bg-black text-white rounded-b-xl py-2 font-semibold hover:bg-gray-900 transition"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Quick Stats */}
          <div className="w-full md:w-72 flex flex-col gap-4">
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Quick Stats</h2>
            <div className="rounded-xl bg-[#ede7f6] dark:bg-[#23263a] p-6 shadow text-gray-900 dark:text-white">
              <div>Products Tracked</div>
              <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">5</div>
            </div>
            <div className="rounded-xl bg-[#ede7f6] dark:bg-[#23263a] p-6 shadow text-gray-900 dark:text-white">
              <div>Total Saved</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">$45.67</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard