import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../context/UserContext"
import { useTheme } from "../context/ThemeContext"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ email: "", password: "", name: "" })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [focusIndex, setFocusIndex] = useState(-1)
  const { login } = useUser()
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const bgRef = useRef(null)

  // Animate background with GSAP
  useEffect(() => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        backgroundPosition: "200% 0%",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      })
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      if (isLogin) {
        login({ email: formData.email, name: formData.email.split("@")[0] })
      } else {
        login({ email: formData.email, name: formData.name })
      }
      navigate("/dashboard")
    } catch (error) {
      console.error("Authentication failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div
      ref={bgRef}
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-500 relative overflow-hidden ${
        isDark
          ? "bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white"
          : "bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 text-gray-900"
      }`}
      style={{ backgroundSize: '400% 400%', backgroundPosition: '0% 0%' }}
    >
      {/* Card Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? 'login' : 'signup'}
          className={`relative w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-2xl border ${
            isDark ? "bg-gray-900/90 border-gray-700" : "bg-white border-gray-300"
          }`}
          initial={{ opacity: 0, x: isLogin ? 80 : -80, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: isLogin ? -80 : 80, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 32, duration: 0.7 }}
        >
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-white text-gray-900">
          <motion.h2
            className="text-3xl font-semibold mb-6 text-center bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 bg-clip-text text-transparent"
            initial={{ backgroundPosition: '0% 50%' }}
            animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
            transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
            style={{ backgroundSize: '200% 200%' }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.4 }}
                >
                  <label className="block text-lg mb-2 font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg bg-transparent border-2 border-pink-400 outline-none transition-shadow duration-300 ${focusIndex === 0 ? "ring-2 ring-pink-400 shadow-pink-200" : ""}`}
                    onFocus={() => setFocusIndex(0)}
                    onBlur={() => setFocusIndex(-1)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              key="email"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <label className="block text-lg mb-2 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 rounded-lg bg-transparent border-2 border-pink-400 outline-none transition-shadow duration-300 ${focusIndex === 1 ? "ring-2 ring-pink-400 shadow-pink-200" : ""}`}
                onFocus={() => setFocusIndex(1)}
                onBlur={() => setFocusIndex(-1)}
              />
            </motion.div>

            <motion.div
              key="password"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <label className="block text-lg mb-2 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg bg-transparent border-2 border-pink-400 outline-none transition-shadow duration-300 pr-12 ${focusIndex === 2 ? "ring-2 ring-pink-400 shadow-pink-200" : ""}`}
                  onFocus={() => setFocusIndex(2)}
                  onBlur={() => setFocusIndex(-1)}
                />
                <motion.button
                  type="button"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-pink-400 hover:text-pink-600 focus:outline-none"
                  onClick={() => setShowPassword((v) => !v)}
                  whileTap={{ scale: 0.8, rotate: 20 }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M9.88 9.88A3 3 0 0012 15a3 3 0 002.12-5.12M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 3.866-3.582 7-8 7a8.96 8.96 0 01-4.62-1.26M6.18 6.18A8.96 8.96 0 004 12c0 3.866 3.582 7 8 7 1.61 0 3.13-.38 4.42-1.06" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 3.866-3.582 7-8 7s-8-3.134-8-7 3.582-7 8-7 8 3.134 8 7z" />
                    </svg>
                  )}
                </motion.button>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 shadow-lg relative overflow-hidden ${
                isDark
                  ? "bg-gradient-to-r from-black via-gray-800 to-black"
                  : "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
              }`}
              whileHover={{ scale: loading ? 1 : 1.07, boxShadow: loading ? undefined : '0 8px 32px 0 rgba(80,0,180,0.18)' }}
              whileTap={{ scale: loading ? 1 : 0.97 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {loading ? (
                  <motion.span
                    key="processing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                      Processing...
                    </span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="submit"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isLogin ? "Login" : "Sign Up"}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>

          {/* Toggle Link */}
          <div className="mt-6 text-center text-sm">
            {isLogin ? (
              <p>
                Don’t have an account?{" "}
                <motion.button
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 hover:underline"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  Sign Up
                </motion.button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <motion.button
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 hover:underline"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  Login
                </motion.button>
              </p>
            )}
          </div>
        </div>

        {/* Right Info Section with Gradient Divider */}
        <div className="hidden md:flex w-1/2 relative">
          {/* Gradient white divider */}
          <div className="absolute left-0 top-0 h-full w-[4px] bg-gradient-to-b from-transparent via-white to-transparent opacity-70" />

          <motion.div
            className={`flex-1 flex items-center justify-center p-10 ${
              isDark
                ? "bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white"
                : "bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 text-white"
            }`}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="text-center">
              <h3 className="text-5xl font-extrabold mb-4">PriceVista</h3>
              <p className="text-xl leading-relaxed text-white/90">
                Track your prices, save your money, and stay ahead with PriceVista.
              </p>
            </div>
          </motion.div>
        </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default LoginSignup
