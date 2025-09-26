import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../context/UserContext"
import { useTheme } from "../context/ThemeContext"
import { motion } from "framer-motion"

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ email: "", password: "", name: "" })
  const [loading, setLoading] = useState(false)
  const { login } = useUser()
  const { isDark } = useTheme()
  const navigate = useNavigate()

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
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white"
          : "bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 text-gray-900"
      }`}
    >
      {/* Card Container */}
      <motion.div
        className={`relative w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-2xl border ${
          isDark ? "bg-gray-900/90 border-gray-700" : "bg-white border-gray-300"
        }`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-white text-gray-900">
          <motion.h2
            className="text-3xl font-semibold mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-lg mb-2 font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-pink-400 focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-lg mb-2 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-pink-400 focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-lg mb-2 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-pink-400 focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 shadow-lg ${
                isDark
                  ? "bg-gradient-to-r from-black via-gray-800 to-black hover:from-gray-900 hover:to-gray-700"
                  : "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
            </motion.button>
          </form>

          {/* Toggle Link */}
          <div className="mt-6 text-center text-sm">
            {isLogin ? (
              <p>
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 hover:underline"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 hover:underline"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Right Info Section with Gradient Divider */}
        <div className="hidden md:flex w-1/2 relative">
          {/* Gradient white divider */}
          <div className="absolute left-0 top-0 h-full w-[4px] bg-gradient-to-b from-transparent via-white to-transparent opacity-70" />

          <div
            className={`flex-1 flex items-center justify-center p-10 ${
              isDark
                ? "bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white"
                : "bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 text-white"
            }`}
          >
            <div className="text-center">
              <h3 className="text-5xl font-extrabold mb-4">PriceVista</h3>
              <p className="text-xl leading-relaxed text-white/90">
                Track your prices, save your money, and stay ahead with PriceVista.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginSignup
