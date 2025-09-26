import React from "react"

const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-md overflow-hidden w-full h-full">
      {/* Product Image with Discount Badge */}
      <div className="relative w-full h-32 md:h-36 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col p-3 flex-grow">
        {/* Name */}
        <h3 className="text-sm md:text-base font-semibold mb-1 line-clamp-1">
          {product.name}
        </h3>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-base font-bold text-green-600">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs text-gray-500 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        </div>

        {/* Retailer */}
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
          Sold by <span className="font-medium">{product.retailer}</span>
        </p>

        {/* Rating + Reviews */}
        <div className="flex items-center text-xs text-yellow-500 mb-1">
          <span>⭐ {product.rating.toFixed(1)}</span>
          <span className="ml-2 text-gray-500 dark:text-gray-400">
            ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Stock */}
        <p
          className={`text-xs mt-auto ${
            product.inStock ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </p>
      </div>
    </div>
  )
}

export default ProductCard
