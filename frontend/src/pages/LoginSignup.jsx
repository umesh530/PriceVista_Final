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
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark
            ? "bg-gradient-to-r from-gray-900 via-black to-gray-900"
            : "bg-gradient-to-r from-blue-800 via-purple-500 to-blue-800"
        }`}
      />

      {/* Card Container */}
      <motion.div
        className={`relative w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-2xl ${
          isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="text-center mb-6">
            <h1
              className={`text-4xl font-bold ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              PriceVista
            </h1>
          </div>

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
                <label className="block text-lg font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-pink-500 outline-none ${
                    isDark
                      ? "bg-gray-800 border-gray-600 text-white"
                      : "bg-white border-gray-400 text-gray-900"
                  }`}
                />
              </div>
            )}

            <div>
              <label className="block text-lg font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-pink-500 outline-none ${
                  isDark
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-400 text-gray-900"
                }`}
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-pink-500 outline-none ${
                  isDark
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-400 text-gray-900"
                }`}
              />
            </div>

            {/* Black Gradient Login Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-black to-gray-700 hover:from-gray-800 hover:to-black transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm">
            {isLogin ? (
              <p>
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>

        {/* White gradient border + Right Section */}
        <div className="hidden md:flex w-1/2 relative">
          {/* White gradient "border" between sections */}
          <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-white via-white to-white" />

          <div
            className={`flex-1 flex items-center justify-center p-10 ${
              isDark
                ? "bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white"
                : "bg-gradient-to-r from-blue-800 via-purple-500 to-blue-800 text-white"
            }`}
          >
            <div className="text-center">
              <h3 className="text-4xl font-bold mb-4">WELCOME BACK!</h3>
              <p className="text-lg leading-relaxed text-white/90">
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
