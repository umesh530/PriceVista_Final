import React from 'react';
import { motion } from 'framer-motion';

/**
 * MicroToggle - Morphing dark/light toggle with radial crossfade
 * Usage: <MicroToggle checked={isDark} onChange={toggleTheme} />
 */
const MicroToggle = ({ checked, onChange }) => (
  <motion.button
    onClick={onChange}
    className="relative w-14 h-8 rounded-full bg-gradient-to-r from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900 flex items-center p-1 transition-colors duration-300 focus:outline-none"
    initial={false}
    animate={{ background: checked ? 'linear-gradient(90deg,#22223b,#4a4e69)' : 'linear-gradient(90deg,#f8fafc,#e0e7ef)' }}
    whileTap={{ scale: 0.95 }}
    aria-label="Toggle dark mode"
  >
    <motion.span
      className="absolute left-1 top-1 w-6 h-6 rounded-full bg-white dark:bg-gray-800 shadow-md"
      layout
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      animate={{ x: checked ? 24 : 0 }}
    >
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{ opacity: checked ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Moon icon */}
        <svg className="w-4 h-4 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{ opacity: checked ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Sun icon */}
        <svg className="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      </motion.span>
    </motion.span>
    {/* Radial crossfade background */}
    <motion.span
      className="absolute inset-0 rounded-full pointer-events-none"
      initial={false}
      animate={{
        background: checked
          ? 'radial-gradient(circle at 70% 30%, #facc15 0%, #22223b 100%)'
          : 'radial-gradient(circle at 30% 70%, #fbbf24 0%, #e0e7ef 100%)',
        opacity: 0.18
      }}
      transition={{ duration: 0.5 }}
    />
  </motion.button>
);

export default MicroToggle;
