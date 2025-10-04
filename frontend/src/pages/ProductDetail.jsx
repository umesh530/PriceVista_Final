import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProductDetails()
    // eslint-disable-next-line
  }, [id])

  const fetchProductDetails = async () => {
    try {
      setLoading(true)
      // Mock data for now
      const mockProduct = {
        id: id,
        name: `Product ${id}`,
        description: 'This is a sample product description.',
        image: `https://picsum.photos/600/400?random=${id}`,
        price: 99.99,
        originalPrice: 129.99,
        retailer: 'Amazon',
        rating: 4.5,
        reviewCount: 250,
        inStock: true,
        discount: 23
      }
      setProduct(mockProduct)
    } catch (error) {
      console.error('Failed to fetch product details:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center text-xl py-20 text-gray-700 dark:text-white">Loading product details...</div>
  }

  if (!product) {
    return <div className="text-center text-xl py-20 text-red-600">Product not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-4xl font-bold text-black dark:text-green-400">
                {product.price.toFixed(2)} INR
              </span>
              <span className="text-2xl text-white line-through font-semibold">
                {product.originalPrice.toFixed(2)} INR
              </span>
            </div>
            <p className="text-white mb-6">{product.description}</p>
            <button className="px-6 py-2 rounded-lg font-semibold text-white transition
                bg-blue-600 hover:bg-blue-700
                dark:bg-gradient-to-r dark:from-black dark:via-gray-800 dark:to-gray-900 dark:hover:from-gray-700 dark:hover:to-black">
              Add to Cart
            </button>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Price History</h2>
          <div className="bg-white dark:bg-[#181a2a] rounded-lg shadow p-6 text-center text-gray-700 dark:text-gray-200">
            {/* Replace with your PriceChart component if you have one */}
            Price History Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail