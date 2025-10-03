import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { getProductImage } from '../utils/productImageHelper';
import MicroButton from './MicroButton';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      type: 'spring',
      stiffness: 60
    }
  })
}

const ProductCard = ({ product, index }) => {
  const { isAuthenticated } = useUser();
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
    discount,
    category
  } = product;

  const priceDifference = originalPrice - price;
  const discountPercentage = Math.round((priceDifference / originalPrice) * 100);
  const productImage = getProductImage(name, category);



  return (
    <motion.div
      className="card-gradient transition-all duration-300 group dark:from-dark-800/90 dark:to-dark-700/90 dark:shadow-xl dark:border-dark-600/30"
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      // Only simple fade-in/slide-up, no hover/3D/tilt
      style={{ position: 'relative', zIndex: 1 }}
    >
      {/* Product Image */}
      <div className="relative mb-6 overflow-hidden rounded-2xl">
        <img
          src={productImage}
          alt={name}
          className="w-full h-56 object-cover transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop';
          }}
        />
        {discount > 0 && (
          <div
            className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-xl shadow-lg backdrop-blur-sm"
            style={{ zIndex: 2 }}
          >
            -{discountPercentage}%
          </div>
        )}
        {!inStock && (
          <div
            className="absolute top-3 right-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white text-sm font-bold px-3 py-1 rounded-xl shadow-lg backdrop-blur-sm"
            style={{ zIndex: 2 }}
          >
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 text-lg">
          <Link to={`/product/${id}`}>
            {name}
          </Link>
        </h3>
        
        {/* Price */}
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold gradient-text">
            ₹{price.toFixed(2)}
          </span>
          {originalPrice > price && (
            <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
              ₹{originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Retailer */}
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Sold by <span className="font-semibold text-gray-900 dark:text-white">{retailer}</span>
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            ({reviewCount} reviews)
          </span>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 pt-4">
          <Link
            to={`/product/${id}`}
            className="flex-1 text-center z-10"
            style={{ pointerEvents: 'auto', zIndex: 10 }}
          >
            <MicroButton className="w-full">View Details</MicroButton>
          </Link>
          {isAuthenticated && (
            <MicroButton
              className="p-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 dark:from-dark-700 dark:to-dark-600 dark:text-gray-200"
              title="Add to favorites"
              style={{ width: 48, height: 48, minWidth: 48, minHeight: 48 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </MicroButton>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard 