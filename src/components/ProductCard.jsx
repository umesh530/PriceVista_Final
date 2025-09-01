import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useUser } from '../context/UserContext'

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useUser()
  
  const {
    id,
    name,
    image,
    price,
    originalPrice,
    retailer,
    rating,
    reviewCount,
    inStock,
    discount
  } = product

  const priceDifference = originalPrice - price
  const discountPercentage = Math.round((priceDifference / originalPrice) * 100)

  return (
    <motion.div 
      className="card hover:shadow-xl transition-all duration-300 group"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Product Image */}
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
            -{discountPercentage}%
          </div>
        )}
        {!inStock && (
          <div className="absolute top-2 right-2 bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
          <Link to={`/product/${id}`}>
            {name}
          </Link>
        </h3>
        
        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {price.toFixed(2)}INR
          </span>
          {originalPrice > price && (
            <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
              {originalPrice.toFixed(2)}INR
            </span>
          )}
        </div>

        {/* Retailer */}
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Sold by <span className="font-medium text-gray-900 dark:text-white">{retailer}</span>
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            ({reviewCount} reviews)
          </span>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-3">
          <Link
            to={`/product/${id}`}
            className="btn-primary flex-1 text-center"
          >
            View Details
          </Link>
          
          {isAuthenticated && (
            <motion.button
              className="btn-secondary px-3"
              title="Add to favorites"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard 