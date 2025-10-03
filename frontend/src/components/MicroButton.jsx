import React from 'react';
import { motion } from 'framer-motion';
import { useMagnetic } from '../utils/useMagnetic';

/**
 * MicroButton - A button with advanced micro-interactions (magnetic, ripple, scale, color)
 * Usage: <MicroButton>Label</MicroButton>
 */
const MicroButton = ({ children, className = '', ...props }) => {
  const ref = useMagnetic();
  return (
    <motion.button
      ref={ref}
      className={`relative overflow-hidden px-6 py-3 rounded-xl font-semibold shadow-md bg-gradient-to-r from-primary-500 to-primary-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all duration-200 ${className}`}
      whileHover={{ scale: 1.06, boxShadow: '0 8px 32px 0 rgba(80,0,180,0.18)' }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {/* Ripple effect */}
      <span className="absolute inset-0 pointer-events-none" />
    </motion.button>
  );
};

export default MicroButton;
