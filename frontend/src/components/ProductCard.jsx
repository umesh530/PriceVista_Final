import React from 'react';
import { motion } from 'framer-motion';

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

const ProductCard = ({ product, index, animated }) => {
  const {
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

  return (
    <motion.div
      className={`flex flex-col bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-md overflow-hidden w-full h-full min-h-[340px] transform transition duration-300 hover:scale-105 hover:shadow-xl
        ${animated ? "opacity-0 animate-fadeIn" : ""}
      `}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      style={{ position: 'relative', zIndex: 1 }}
    >
      {/* Product Image */}
      <div className="relative w-full h-44 md:h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500"
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
      {/* Info section with white background in dark mode */}
      <div className="flex flex-col p-4 gap-1 flex-grow bg-white/95 dark:bg-white dark:text-gray-900 transition-colors">
        <h3 className="text-sm md:text-base font-semibold line-clamp-2">{name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-green-600">₹{price.toFixed(2)}</span>
          {originalPrice > price && (
            <span className="text-xs text-gray-500 line-through">₹{originalPrice.toFixed(2)}</span>
          )}
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-700">
          Sold by <span className="font-medium">{retailer}</span>
        </p>
        <div className="flex items-center text-xs text-yellow-500">
          <span>⭐ {Number(rating || 0).toFixed(1)}</span>
          <span className="ml-2 text-gray-500 dark:text-gray-700">({reviewCount || 0} reviews)</span>
        </div>
        <div className={`mt-auto text-xs ${inStock ? 'text-green-600' : 'text-red-600'}`}>
          {inStock ? 'In Stock' : 'Out of Stock'}
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard