import React, { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'

const Dashboard = () => {
  const { user } = useUser()
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
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Welcome back, {user?.name || 'User'}!
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Favorites</h2>
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {favorites.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No favorite products yet.</p>
          )}
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Stats</h2>
          <div className="space-y-4">
            <div className="card">
              <h3 className="font-semibold text-gray-900">Products Tracked</h3>
              <p className="text-2xl font-bold text-primary-600">5</p>
            </div>
            <div className="card">
              <h3 className="font-semibold text-gray-900">Total Saved</h3>
              <p className="text-2xl font-bold text-green-600">$45.67</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Dashboard 