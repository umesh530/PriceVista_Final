import React, { useState, useRef, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '../context/UserContext'
import { useTheme } from '../context/ThemeContext'
import gsap from 'gsap'
import logo from "../assets/logo.jpg";

// Import custom scroll blur hook
import { useScrollBlur } from '../utils/useScrollBlur';

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { user, logout, isAuthenticated } = useUser()
  const { isDark, toggleTheme } = useTheme()
  const bgMorphRef = useRef(null)
  // Animate radial background morph on theme change
  useEffect(() => {
    if (bgMorphRef.current) {
      gsap.fromTo(
        bgMorphRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1.2, duration: 0.7, ease: 'power2.out',
          onComplete: () => {
            gsap.to(bgMorphRef.current, { opacity: 0, scale: 1.4, duration: 0.7, delay: 0.2 })
          }
        }
      )
    }
  }, [isDark])
  const navigate = useNavigate()
  // Use custom scroll blur hook for navbar effects
  const isScrolled = useScrollBlur(24)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setIsMenuOpen(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
  }

  // ✅ Admin Panel visible only for admins
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/tracker', label: 'Price Tracker', isLink: true },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/auth', label: 'Login / Signup' },
    ...(user?.role === 'admin' ? [{ to: '/admin', label: 'Admin Panel' }] : [])
  ]

  return (
    <>
      {/* Radial morphing background for theme switch */}
      <div
        ref={bgMorphRef}
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 70% 30%, #18181b 0%, #232946 100%)'
            : 'radial-gradient(circle at 30% 70%, #f3e8ff 0%, #e0e7ff 100%)',
          opacity: 0,
          transition: 'background 0.7s',
        }}
      />
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-dark-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-dark-700/50' 
            : 'bg-white dark:bg-dark-900'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink to="/" className="flex items-center">
              <div className="relative">
                <img 
                  src={logo} 
                  alt="PriceVista" 
                  className="h-8 w-8 mr-2 rounded-lg"
                />
                <div className="absolute inset-0 bg-primary-500/20 rounded-lg animate-pulse-slow"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-400 dark:to-primary-500 bg-clip-text text-transparent">
                PriceVista
              </span>
            </NavLink>
          </motion.div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Navigation Links - Desktop */}
          {/* Desktop Navigation Links with Animated Underline */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              link.isLink ? (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 rounded-lg transition-colors duration-200 ${window.location.pathname === link.to ? 'text-primary-700 dark:text-primary-400 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Animated underline for active link */}
                  {window.location.pathname === link.to && (
                    <motion.span
                      layoutId="navbar-underline"
                      className="absolute left-2 right-2 -bottom-1 h-1 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600"
                      initial={{ opacity: 0, scaleX: 0.5 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0.5 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    />
                  )}
                </Link>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'text-primary-700 dark:text-primary-400 font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-600'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{link.label}</span>
                      {/* Animated underline for active NavLink */}
                      {isActive && (
                        <motion.span
                          layoutId="navbar-underline"
                          className="absolute left-2 right-2 -bottom-1 h-1 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600"
                          initial={{ opacity: 0, scaleX: 0.5 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          exit={{ opacity: 0, scaleX: 0.5 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              )
            ))}


            {/* ✅ Dark/Light Theme Button */}
              <motion.button
                onClick={toggleTheme}
                className="ml-4 p-2 rounded-full bg-white/20 dark:bg-black/30 hover:bg-white/30 dark:hover:bg-black/40 transition flex items-center justify-center"
                aria-label="Toggle dark mode"
                whileTap={{ scale: 0.9, rotate: 30 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isDark ? 'sun' : 'moon'}
                    initial={{ scale: 0.7, rotate: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    exit={{ scale: 0.7, rotate: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="relative"
                  >
                    <motion.div
                      className={`absolute inset-0 rounded-full ${isDark ? 'bg-yellow-300/60' : 'bg-gray-200/60'}`}
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ scale: 1.2, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0.5 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                    />
                    {isDark ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="12" cy="12" r="5" fill="#fde047" />
                        <g stroke="#fde047" strokeWidth="2">
                          <line x1="12" y1="2" x2="12" y2="4" />
                          <line x1="12" y1="20" x2="12" y2="22" />
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                          <line x1="2" y1="12" x2="4" y2="12" />
                          <line x1="20" y1="12" x2="22" y2="12" />
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </g>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-200 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="#a3a3a3" />
                      </svg>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 p-2"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 dark:border-dark-700"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navLinks.map((link) => (
                  link.isLink ? (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-3 py-2 rounded-lg transition-colors duration-200 ${window.location.pathname === link.to ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600'}`}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        isActive
                          ? "block px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md transition-all duration-200"
                          : "block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
                      }
                    >
                      {link.label}
                    </NavLink>
                  )
                ))}

                {/* Dark/Light Toggle - Mobile */}
                <motion.button
                  onClick={toggleTheme}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="mt-2 p-2 rounded-lg bg-gray-100 dark:bg-dark-700 w-full hover:bg-gray-200 dark:hover:bg-dark-600 transition-all"
                  aria-label="Toggle theme"
                >
                  {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
    </>
  )
}

export default Navbar
