
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
