import React, { useState } from "react";
import { motion } from "framer-motion";

export default function LoginSignup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your login/signup logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <motion.label
            htmlFor="username"
            className="block text-gray-700"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Username
            <motion.input
              type="text"
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={handleInputChange}
              onFocus={() => setFocusedField("username")}
              onBlur={() => setFocusedField(null)}
              whileFocus={{ scale: 1.02 }}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </motion.label>

          {/* Email */}
          <motion.label
            htmlFor="email"
            className="block text-gray-700"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            Email Address
            <motion.input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              whileFocus={{ scale: 1.02 }}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </motion.label>

          {/* Password */}
          <motion.label
            htmlFor="password"
            className="block text-gray-700"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Password
            <motion.input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              whileFocus={{ scale: 1.02 }}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </motion.label>

          {/* Confirm Password */}
          <motion.label
            htmlFor="confirmPassword"
            className="block text-gray-700"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            Confirm Password
            <motion.input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onFocus={() => setFocusedField("confirmPassword")}
              onBlur={() => setFocusedField(null)}
              whileFocus={{ scale: 1.02 }}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </motion.label>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 font-semibold shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
