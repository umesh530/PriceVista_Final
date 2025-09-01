import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from "../assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-dark-900 text-white border-t border-gray-700 dark:border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <motion.div 
              className="flex items-center mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img 
                  src={logo}
                  alt="PriceVista" 
                  className="h-8 w-8 mr-2 rounded-lg"
                />
                <div className="absolute inset-0 bg-primary-500/20 rounded-lg animate-pulse-slow"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent">
                PriceVista
              </span>
            </motion.div>
            <motion.p 
              className="text-gray-300 dark:text-gray-400 mb-6 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Your trusted companion for smart price tracking and finding the best deals 
              across multiple retailers. Save money and shop smarter with PriceVista.
            </motion.p>
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-dark-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-dark-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-dark-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 dark:text-gray-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/tracker" className="text-gray-300 dark:text-gray-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Price Tracker</span>
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-300 dark:text-gray-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Search Products</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 dark:text-gray-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">About Us</span>
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-gray-300 dark:text-gray-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Contact Us</span>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Help Center</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Privacy Policy</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Terms of Service</span>
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-gray-700 dark:border-dark-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            © 2024 PriceVista. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-primary-400 dark:hover:text-primary-300 text-sm transition-colors duration-200">
              Privacy
            </a>
            <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-primary-400 dark:hover:text-primary-300 text-sm transition-colors duration-200">
              Terms
            </a>
            <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-primary-400 dark:hover:text-primary-300 text-sm transition-colors duration-200">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer 