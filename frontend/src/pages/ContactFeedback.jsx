import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
// import gsap from "gsap";

const ContactPage = () => {
  const [showForms, setShowForms] = useState(false)

  // Animation variants
  const fadeSlide = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  }

  // Field animation
  const fieldVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.12 * i, duration: 0.5, ease: 'easeOut' }
    })
  }

  // Focus state for animated glow
  const [focusIndex, setFocusIndex] = useState(-1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <motion.div className="relative min-h-screen flex items-center justify-center 
      bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 
      dark:from-gray-900 dark:via-black dark:to-gray-900 
      mt-16 px-4 transition-colors duration-500"
      initial="hidden"
      animate="visible"
      variants={fadeSlide}
    >

   {/* Page Heading */}
      <motion.div className="absolute top-20 w-full flex justify-center" initial="hidden" animate="visible" variants={fadeSlide}>
        <motion.h1
          className="text-[40px] font-bold text-center text-dark-blue dark:text-gray-200"
          initial={{ backgroundPosition: '0% 50%' }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
          style={{
            background: 'linear-gradient(90deg, #facc15, #f472b6, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            backgroundSize: '200% 200%'
          }}
        >
          Contact Us
        </motion.h1>
      </motion.div>


      {/* Main Card */}
      <motion.div
        className="
          relative w-full max-w-5xl rounded-2xl overflow-hidden 
          shadow-lg hover:shadow-2xl transition-shadow duration-500
          transform hover:scale-[1.02] hover:-translate-y-1
          bg-white dark:bg-gray-900
        "
        initial="hidden"
        animate="visible"
        variants={fadeSlide}
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

            <motion.button
              onClick={() => setShowForms(true)}
              className="relative z-10 px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold text-lg shadow-md transition-all"
              whileHover={{ scale: 1.07, boxShadow: '0 8px 32px 0 rgba(80,0,180,0.18)' }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Us / Feedback
            </motion.button>
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
                <form className="space-y-4" onSubmit={async (e) => {
                  e.preventDefault();
                  setSubmitting(true);
                  setTimeout(() => {
                    setSubmitting(false);
                    setSubmitted(true);
                    setTimeout(() => setSubmitted(false), 1800);
                  }, 1400);
                }}>
                  <AnimatePresence>
                    {["Your Name", "Your Email", "Your Message"].map((ph, i) => (
                      <motion.div
                        key={ph}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={fieldVariants}
                      >
                        {ph !== "Your Message" ? (
                          <input
                            type={ph === "Your Email" ? "email" : "text"}
                            placeholder={ph}
                            className={`w-full px-3 py-2 border-2 border-pink-500 rounded-md bg-white dark:bg-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-shadow duration-300 ${focusIndex === i ? "ring-2 ring-pink-400 shadow-pink-200 dark:shadow-pink-900" : ""}`}
                            onFocus={() => setFocusIndex(i)}
                            onBlur={() => setFocusIndex(-1)}
                          />
                        ) : (
                          <textarea
                            rows="4"
                            placeholder={ph}
                            className={`w-full px-3 py-2 border-2 border-pink-500 rounded-md bg-white dark:bg-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-shadow duration-300 ${focusIndex === i ? "ring-2 ring-pink-400 shadow-pink-200 dark:shadow-pink-900" : ""}`}
                            onFocus={() => setFocusIndex(i)}
                            onBlur={() => setFocusIndex(-1)}
                          ></textarea>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <motion.button
                    type="submit"
                    className="w-full py-2 rounded-md bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold shadow-md transition relative overflow-hidden"
                    whileHover={{ scale: submitting || submitted ? 1 : 1.05, boxShadow: submitting || submitted ? undefined : '0 6px 24px 0 rgba(80,0,180,0.15)' }}
                    whileTap={{ scale: submitting || submitted ? 1 : 0.97 }}
                    disabled={submitting || submitted}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {submitting ? (
                        <motion.span
                          key="sending"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="inline-flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                            Sending...
                          </span>
                        </motion.span>
                      ) : submitted ? (
                        <motion.span
                          key="sent"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="inline-flex items-center gap-2">
                            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                            Sent!
                          </span>
                        </motion.span>
                      ) : (
                        <motion.span
                          key="send"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          Send Message
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </form>
              </div>

              {/* Feedback */}
              <div className="p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-white dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-center text-blue-900 dark:text-white mb-4">
                  Feedback
                </h2>
                <form className="space-y-4" onSubmit={async (e) => {
                  e.preventDefault();
                  setSubmitting(true);
                  setTimeout(() => {
                    setSubmitting(false);
                    setSubmitted(true);
                    setTimeout(() => setSubmitted(false), 1800);
                  }, 1400);
                }}>
                  <AnimatePresence>
                    <motion.div
                      custom={0}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={fieldVariants}
                    >
                      <textarea
                        rows="6"
                        placeholder="Write your feedback..."
                        className={`w-full px-3 py-2 border-2 border-purple-500 rounded-md bg-white dark:bg-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-shadow duration-300 ${focusIndex === 10 ? "ring-2 ring-purple-400 shadow-purple-200 dark:shadow-purple-900" : ""}`}
                        onFocus={() => setFocusIndex(10)}
                        onBlur={() => setFocusIndex(-1)}
                      ></textarea>
                    </motion.div>
                  </AnimatePresence>
                  <motion.button
                    type="submit"
                    className="w-full py-2 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-md transition relative overflow-hidden"
                    whileHover={{ scale: submitting || submitted ? 1 : 1.05, boxShadow: submitting || submitted ? undefined : '0 6px 24px 0 rgba(80,0,180,0.15)' }}
                    whileTap={{ scale: submitting || submitted ? 1 : 0.97 }}
                    disabled={submitting || submitted}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {submitting ? (
                        <motion.span
                          key="sending"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="inline-flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                            Sending...
                          </span>
                        </motion.span>
                      ) : submitted ? (
                        <motion.span
                          key="sent"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="inline-flex items-center gap-2">
                            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                            Sent!
                          </span>
                        </motion.span>
                      ) : (
                        <motion.span
                          key="send"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          Submit Feedback
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        )}
    </motion.div>
  </motion.div>
  )
}

export default ContactPage
