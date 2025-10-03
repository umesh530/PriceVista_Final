// PageTransition.jsx
// Reusable animated page transition wrapper using Framer Motion
import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  initial: {
    opacity: 0,
    x: 80,
    filter: 'blur(8px)',
  },
  animate: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 18,
      mass: 0.7,
      when: 'beforeChildren',
      staggerChildren: 0.12,
    },
  },
  exit: {
    opacity: 0,
    x: -80,
    filter: 'blur(8px)',
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 18,
      mass: 0.7,
    },
  },
};

export default function PageTransition({ children, style, className }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}
