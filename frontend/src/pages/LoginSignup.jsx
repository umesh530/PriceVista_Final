import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../context/UserContext"
import { useTheme } from "../context/ThemeContext"
import { motion, AnimatePresence } from "framer-motion"

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ email: "", password: "", name: "" })
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const { login } = useUser()
  const { isDark } = useTheme()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 1500))
      if (isLogin) {
        login({ email: formData.email, name: formData.email.split("@")[0] })
      } else {
        login({ email: formData.email, name: formData.name });
      }
      navigate("/dashboard")
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }))
  }

  return ( 
    <motion.div 
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-900 dark:via-gray-900 dark:to-black transition-all duration-500 mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Background Elements */}
      <motion.div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-10 left-10 w-20 h-20 bg-white/30 dark:bg-slate-600/40 rounded-full"
          animate={{
            y: [-10, 10, -10],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-32 right-20 w-16 h-16 bg-white/20 dark:bg-gray-600/30 rounded-full"
          animate={{
            y: [-10, 10, -10],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/25 dark:bg-slate-500/35 rounded-full"
          animate={{
            y: [-10, 10, -10],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        <motion.div 
          className="absolute bottom-32 right-1/3 w-24 h-24 bg-white/15 dark:bg-gray-500/25 rounded-full"
          animate={{
            y: [-10, 10, -10],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </motion.div>

      {/* Gradient Overlays */}
      <motion.div 
        className="absolute inset-0 pointer-events-none dark:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5" />
        <div className="absolute inset-0 bg-gradient-to-bl from-white/15 via-transparent to-white/10" />
      </motion.div>

      {/* Main Form Card */}
      <motion.div
        className="max-w-md w-full space-y-8 rounded-xl p-8 relative z-10 backdrop-blur-sm bg-white/95 dark:bg-dark-800 border border-white/20 dark:border-dark-700 shadow-xl"
        initial={{ 
          opacity: 0, 
          y: 50, 
          scale: 0.9,
          rotateX: -15
        }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          rotateX: 0
        }}
        transition={{ 
          duration: 0.8, 
          delay: 0.3,
          ease: "easeOut"
        }}
        whileHover={{
          y: -5,
          transition: { duration: 0.3 }
        }}
        style={{
          transformStyle: "preserve-3d",
          boxShadow: isDark 
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            : "0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.h2 
            className="mt-2 text-center text-3xl font-extrabold text-blue-900 dark:text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {isLogin ? "Sign in to your account" : "Create your account"}
          </motion.h2>
          <motion.p 
            className="mt-2 text-center text-sm text-blue-700 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {isLogin ? "Welcome back!" : "Join us and get started"}
          </motion.p>
        </motion.div>

        {/* Form */}
        <motion.form 
          className="mt-8 space-y-6" 
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <motion.label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-blue-800 dark:text-gray-200"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Full Name
                  </motion.label>
                  <motion.input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="mt-1 block w-full px-3 py-2 border border-blue-300 dark:border-dark-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-primary-500 focus:border-blue-500 dark:focus:border-transparent bg-white/90 dark:bg-dark-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-150"
                    whileFocus={{ scale: 1.02, y: -2 }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.label 
                htmlFor="email" 
                className="block text-sm font-medium text-blue-800 dark:text-gray-200"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="mt-1 block w-full px-3 py-2 border border-blue-300 dark:border-dark-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-primary-500 focus:border-blue-500 dark:focus:border-transparent bg-white/90 dark:bg-dark-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-150"
                whileFocus={{ scale: 1.02, y: -2 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.label 
                htmlFor="password" 
                className="block text-sm font-medium text-blue-800 dark:text-gray-200"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className="mt-1 block w-full px-3 py-2 border border-blue-300 dark:border-dark-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-primary-500 focus:border-blue-500 dark:focus:border-transparent bg-white/90 dark:bg-dark-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-150"
                whileFocus={{ scale: 1.02, y: -2 }}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-400 to-blue-500 dark:from-primary-600 dark:to-primary-700 hover:from-blue-500 hover:to-blue-600 dark:hover:from-primary-700 dark:hover:to-primary-800 text-white dark:text-white font-semibold py-2 px-4 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 dark:focus:ring-primary-500 disabled:opacity-50 transition-all duration-150 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              whileFocus={{ scale: 1.02 }}
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center justify-center"
                  >
                    <motion.div
                      className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Processing...
                  </motion.div>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {isLogin ? "Sign In" : "Sign Up"}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </motion.form>

        {/* Toggle Link */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-800 dark:text-primary-400 hover:text-blue-900 dark:hover:text-primary-300 font-medium transition-all duration-150"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              key={isLogin ? "signup" : "signin"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default LoginSignup

