import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MicroAlert - Animated alert/notification with entrance/exit and micro-interactions
 * Usage: <MicroAlert type="success|error|info|warning" show={show} onClose={...}>Message</MicroAlert>
 */
const alertColors = {
  success: 'from-green-400 to-green-600',
  error: 'from-red-400 to-red-600',
  info: 'from-blue-400 to-blue-600',
  warning: 'from-yellow-400 to-yellow-600',
};

const MicroAlert = ({ type = 'info', show, onClose, children }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ y: -40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -40, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-lg bg-gradient-to-r ${alertColors[type]} text-white flex items-center gap-3`}
        role="alert"
      >
        <span className="flex-1">{children}</span>
        {onClose && (
          <motion.button
            onClick={onClose}
            className="ml-2 p-1 rounded-full bg-white/20 hover:bg-white/30 transition"
            whileTap={{ scale: 0.8 }}
            aria-label="Close alert"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </motion.button>
        )}
      </motion.div>
    )}
  </AnimatePresence>
);

export default MicroAlert;
