import React, { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'

const PriceTracker = () => {
  const [trackedProducts, setTrackedProducts] = useState([])
  const [loading, setLoading] = useState(true)

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Price Tracker</h1>
      
      {trackedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trackedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No products being tracked yet.</p>
        </div>
      )}
    </div>
  )
}

export default PriceTracker