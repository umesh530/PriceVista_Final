import React, { useState } from "react"

const ContactPage = () => {
  const [showForms, setShowForms] = useState(false)

  return (
    <div className="relative min-h-screen flex items-center justify-center 
      bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 
      dark:from-gray-900 dark:via-black dark:to-gray-900 
      mt-16 px-4 transition-colors duration-500">

   {/* Page Heading */}
<div className="absolute top-20 w-full flex justify-center">
  <h1 className="text-[40px] font-bold text-center text-dark-blue dark:text-gray-200">
    Contact Us
  </h1>
</div>


      {/* Main Card */}
      <div
        className="
          relative w-full max-w-5xl rounded-2xl overflow-hidden 
          shadow-lg hover:shadow-2xl transition-shadow duration-500
          transform hover:scale-[1.02] hover:-translate-y-1
          bg-white dark:bg-gray-900
        "
      >
        {!showForms ? (
          // Background Image with Button
          <div className="relative w-full h-[400px] flex items-center justify-center">
            <img
              src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Team Collaboration"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>

            <button
              onClick={() => setShowForms(true)}
              className="relative z-10 px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold text-lg shadow-md hover:shadow-xl hover:scale-105 transition-all"
            >
              Contact Us / Feedback
            </button>
          </div>
        ) : (
          // Contact + Feedback Forms Grid
          <div className="relative z-10 p-10 bg-white/95 dark:bg-gray-900 transition-colors duration-500">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Contact Us */}
              <div className="p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-white dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-center text-blue-900 dark:text-white mb-4">
                  Contact Us
                </h2>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-3 py-2 border-2 border-pink-500 rounded-md bg-white dark:bg-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-pink-500"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-3 py-2 border-2 border-pink-500 rounded-md bg-white dark:bg-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-pink-500"
                  />
                  <textarea
                    rows="4"
                    placeholder="Your Message"
                    className="w-full px-3 py-2 border-2 border-pink-500 rounded-md bg-white dark:bg-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-pink-500"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full py-2 rounded-md bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Feedback */}
              <div className="p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-white dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-center text-blue-900 dark:text-white mb-4">
                  Feedback
                </h2>
                <form className="space-y-4">
                  <textarea
                    rows="6"
                    placeholder="Write your feedback..."
                    className="w-full px-3 py-2 border-2 border-purple-500 rounded-md bg-white dark:bg-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full py-2 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
                  >
                    Submit Feedback
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContactPage
