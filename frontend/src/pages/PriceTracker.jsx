<<<<<<< HEAD
import React, { useEffect, useRef } from "react"
import { useTheme } from "../context/ThemeContext"

const ProductCard = ({ product, animated }) => {
  return (
    <div
      className={`flex flex-col bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-md overflow-hidden w-full h-full min-h-[340px] transform transition duration-300 hover:scale-105 hover:shadow-xl
        ${animated ? "opacity-0 animate-fadeIn" : ""}
      `}
      style={{ animationDelay: animated ? `${0.1 * (product.idx || 0)}s` : "0s" }}
    >
      <div className="relative w-full h-44 md:h-52 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      {/* Info section with white background in dark mode */}
      <div className="flex flex-col p-4 gap-1 flex-grow bg-white/95 dark:bg-white dark:text-gray-900 transition-colors">
        <h3 className="text-sm md:text-base font-semibold line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-green-600">${product.priceNow.toFixed(2)}</span>
          {product.priceBefore > product.priceNow && (
            <span className="text-xs text-gray-500 line-through">${product.priceBefore.toFixed(2)}</span>
          )}
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-700">Sold by <span className="font-medium">{product.retailer}</span></p>
        <div className="flex items-center text-xs text-yellow-500">
          <span>⭐ {Number(product.rating || 0).toFixed(1)}</span>
          <span className="ml-2 text-gray-500 dark:text-gray-700">({product.reviewCount || 0} reviews)</span>
        </div>
        <div className={`mt-auto text-xs ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </div>
      </div>
    </div>
  )
}

// Helper to prepare product data (discount, priceNow, priceBefore)
const prepareProduct = (p, idx) => {
  const priceNow = Number(p.price) || 0
  const priceBefore = Number(p.originalPrice) || priceNow
  const discount = Math.max(0, Math.round(((priceBefore - priceNow) / (priceBefore || 1)) * 100))
  return { ...p, priceNow, priceBefore, discount, idx }
}

const PriceTracker = () => {
  const { isDark } = useTheme()

  // Demo images for products
  const demoImages = [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80", // Laptop
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80", // Headphones
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80", // Mouse (using laptop img as demo)
    "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80", // Watch
  ];

  // Example: All products
  const products = [
    { name: "ASUS VivoBook 15” i5 12th Gen, 16GB/512GB", image: demoImages[0], price: 699.99, originalPrice: 899.99, retailer: "Amazon", rating: 4.4, reviewCount: 1321, inStock: true },
    { name: "Sony WH-CH720N Noise Cancelling Headphones", image: demoImages[1], price: 119.99, originalPrice: 149.99, retailer: "BestBuy", rating: 4.5, reviewCount: 846, inStock: true },
    { name: "Logitech MX Master 3S Wireless Mouse", image: demoImages[2], price: 89.99, originalPrice: 99.99, retailer: "Amazon", rating: 4.8, reviewCount: 5021, inStock: true },
    { name: "Apple Watch SE (2nd Gen) 44mm", image: demoImages[3], price: 229.0, originalPrice: 279.0, retailer: "Apple", rating: 4.7, reviewCount: 12890, inStock: true },
  ].map(prepareProduct)

  // Example: Tracked products (subset or different)
  const trackedProducts = [
    { name: "Sony WH-CH720N Noise Cancelling Headphones", image: demoImages[1], price: 119.99, originalPrice: 149.99, retailer: "BestBuy", rating: 4.5, reviewCount: 846, inStock: true },
    { name: "Apple Watch SE (2nd Gen) 44mm", image: demoImages[3], price: 229.0, originalPrice: 279.0, retailer: "Apple", rating: 4.7, reviewCount: 12890, inStock: true },
  ].map(prepareProduct)

  // Animation for tracked section
  const trackedRef = useRef(null)
  useEffect(() => {
    if (trackedRef.current) {
      trackedRef.current.classList.add("animate-slideDownFade")
    }
  }, [])

  return (
    <div className={`min-h-screen px-4 py-10 mt-16 transition-colors ${isDark ? 'bg-gradient-to-r from-gray-900 via-black to-gray-900' : 'bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-white">
          <h1 className="text-3xl font-extrabold">Price Tracker</h1>
          <p className="opacity-90">Track product prices across retailers and catch drops instantly.</p>
        </div>

        {/* Tracked by you section */}
        <div ref={trackedRef} className="mb-10 opacity-0">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span role="img" aria-label="star">⭐</span> Tracked by You
          </h2>
          {trackedProducts.length === 0 ? (
            <div className="text-white/80 italic">You are not tracking any products yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {trackedProducts.map((p, idx) => (
                <ProductCard key={idx} product={p} animated />
              ))}
            </div>
          )}
        </div>

        {/* All products section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">All Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p, idx) => (
              <ProductCard key={idx} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Animations (Tailwind CSS custom keyframes) */}
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1) forwards;
        }
        @keyframes slideDownFade {
          from { opacity: 0; transform: translateY(-30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-slideDownFade {
          animation: slideDownFade 0.8s cubic-bezier(.4,0,.2,1) forwards;
        }
        `}
      </style>
    </div>
  )
}

export default PriceTracker
=======

// src/pages/PriceTracker.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
// import mockTrackedProducts from wherever it is defined
import mockTrackedProducts from "../mockData/mockTrackedProducts.js";

export default function PriceTracker() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (!isMounted) return;
      try {
        setProducts(mockTrackedProducts);
      } catch (err) {
        setError("Failed to load tracked products");
      } finally {
        setLoading(false);
      }
    }, 800);
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return <Loader fullScreen text="Loading your tracked products..." />;
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-2">{error}</h2>
        <button className="btn-primary" onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ type: "spring", stiffness: 110, damping: 18 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <motion.h1
          className="text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ backgroundPosition: '0% 50%' }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
          style={{ backgroundSize: '200% 200%' }}
        >
          Your Tracked Products
        </motion.h1>
        {products.length === 0 ? (
          <motion.div className="text-center py-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products being tracked</h3>
              <p className="text-gray-600 dark:text-gray-300">Start tracking products to see them here.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } }
            }}
          >
            {products.map((product, idx) => (
              <ProductCard product={product} index={idx} key={product.id} />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
>>>>>>> e91a5d3c430d161a53adcc76e1265ac2568a660b
