import React from 'react';
import { motion } from 'framer-motion';

/**
 * MicroInput - Input with animated focus glow and subtle micro-interactions
 * Usage: <MicroInput ...props />
 */
const MicroInput = React.forwardRef(({ className = '', ...props }, ref) => (
  <motion.input
    ref={ref}
    className={`px-4 py-3 rounded-lg border-2 border-primary-400 bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 shadow-sm ${className}`}
    whileFocus={{ boxShadow: '0 0 0 4px rgba(139,92,246,0.15)' }}
    whileHover={{ scale: 1.03 }}
    {...props}
  />
));

export default MicroInput;
