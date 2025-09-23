import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <motion.section 
      className="relative overflow-hidden text-white py-24 lg:py-40 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 animate-gradient-xy"></div>
      <div className="absolute inset-0 backdrop-blur-3xl"></div>

      {/* Floating Shapes */}
      <motion.div 
        className="absolute w-72 h-72 bg-pink-500/30 rounded-full mix-blend-overlay blur-3xl top-10 left-20"
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div 
        className="absolute w-96 h-96 bg-cyan-500/30 rounded-full mix-blend-overlay blur-3xl bottom-10 right-20"
        animate={{ y: [0, 30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Hero Text */}
      <motion.h1 
        className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-center max-w-5xl leading-tight z-10"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Track Prices in <span className="text-yellow-300">Real-Time</span>, Save Smarter 🚀
      </motion.h1>

      {/* Subtitle */}
      <motion.p 
        className="mt-6 text-lg md:text-2xl text-blue-100 max-w-3xl text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Compare across Amazon, Flipkart, Meesho & Blinkit. Get the lowest deals instantly.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div 
        className="mt-10 flex flex-col sm:flex-row gap-6 z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <Link to="/signup" className="bg-yellow-400 text-black px-8 py-4 text-lg rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all">
          Start Free
        </Link>
        <Link to="/about" className="bg-white/20 px-8 py-4 text-lg rounded-xl border border-white/30 hover:bg-white/30 transition-all">
          Learn More
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
