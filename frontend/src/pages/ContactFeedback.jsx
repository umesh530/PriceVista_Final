import React, { useState } from 'react'

const ContactFeedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    subject: '',
    message: ''
  })
  const [formType, setFormType] = useState('contact')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Thank you for your message! We\'ll get back to you soon.')
      setFormData({ name: '', email: '', phone: '', address: '', subject: '', message: '' })
    } catch (error) {
      console.error('Form submission failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 overflow-hidden mt-16"
    >
      
      {/* Floating Background Bubbles */}
      <div className="absolute w-20 h-20 bg-white/10 dark:bg-gray-700/20 rounded-full top-10 left-10 animate-float"></div>
      <div className="absolute w-32 h-32 bg-white/10 dark:bg-gray-700/20 rounded-full top-1/4 right-20 animate-float-delayed"></div>
      <div className="absolute w-16 h-16 bg-white/10 dark:bg-gray-700/20 rounded-full bottom-32 left-1/4 animate-float-slow"></div>
      <div className="absolute w-24 h-24 bg-white/10 dark:bg-gray-700/20 rounded-full bottom-10 right-1/3 animate-float"></div>
      <div className="absolute w-12 h-12 bg-white/10 dark:bg-gray-700/20 rounded-full top-1/2 left-1/3 animate-float-delayed"></div>
      <div className="absolute w-28 h-28 bg-white/10 dark:bg-gray-700/20 rounded-full top-1/3 left-2/3 animate-float-slow"></div>

      {/* Extra bubbles */}
      <div className="absolute w-14 h-14 bg-white/10 dark:bg-gray-700/20 rounded-full bottom-20 left-10 animate-float"></div>
      <div className="absolute w-36 h-36 bg-white/10 dark:bg-gray-700/20 rounded-full top-1/5 right-1/4 animate-float-slow"></div>
      <div className="absolute w-10 h-10 bg-white/10 dark:bg-gray-700/20 rounded-full bottom-1/4 right-10 animate-float-delayed"></div>
      <div className="absolute w-20 h-20 bg-white/10 dark:bg-gray-700/20 rounded-full top-3/4 left-1/2 animate-float"></div>
      <div className="absolute w-16 h-16 bg-white/10 dark:bg-gray-700/20 rounded-full bottom-40 right-1/2 animate-float-slow"></div>
      <div className="absolute w-24 h-24 bg-white/10 dark:bg-gray-700/20 rounded-full top-20 right-1/6 animate-float-delayed"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-white mb-4">
            {formType === 'contact' ? 'Contact Us' : 'Send Feedback'}
          </h1>
          <p className="text-xl text-blue-800 dark:text-gray-300 max-w-3xl mx-auto">
            {formType === 'contact'
              ? 'Have questions or need help? We\'d love to hear from you.'
              : 'Your feedback helps us improve PriceVista. Share your thoughts with us.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg relative z-10">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setFormType('contact')}
                className={`px-4 py-2 rounded-md font-medium ${
                  formType === 'contact'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-blue-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                Contact
              </button>
              <button
                onClick={() => setFormType('feedback')}
                className={`px-4 py-2 rounded-md font-medium ${
                  formType === 'feedback'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-blue-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                Feedback
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-blue-900 dark:text-gray-200 mb-2">
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-blue-300 dark:border-gray-600 rounded-md 
                             bg-blue-50 dark:bg-gray-700 text-blue-900 dark:text-white 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-400 
                             placeholder:text-blue-400 dark:placeholder:text-gray-400 transition"
                />
              </div>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-blue-900 dark:text-gray-200 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-blue-300 dark:border-gray-600 rounded-md 
                             bg-blue-50 dark:bg-gray-700 text-blue-900 dark:text-white 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-400 
                             placeholder:text-blue-400 dark:placeholder:text-gray-400 transition"
                />
              </div>
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-blue-900 dark:text-gray-200 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 555 123 4567"
                  className="w-full px-3 py-2 border border-blue-300 dark:border-gray-600 rounded-md 
                             bg-blue-50 dark:bg-gray-700 text-blue-900 dark:text-white 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-400 
                             placeholder:text-blue-400 dark:placeholder:text-gray-400 transition"
                />
              </div>
              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-blue-900 dark:text-gray-200 mb-2">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Your complete address"
                  className="w-full px-3 py-2 border border-blue-300 dark:border-gray-600 rounded-md 
                             bg-blue-50 dark:bg-gray-700 text-blue-900 dark:text-white 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-400 
                             placeholder:text-blue-400 dark:placeholder:text-gray-400 transition"
                />
              </div>
              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-blue-900 dark:text-gray-200 mb-2">
                  Subject *
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder={formType === 'contact' ? 'How can we help you?' : 'What would you like to share?'}
                  className="w-full px-3 py-2 border border-blue-300 dark:border-gray-600 rounded-md 
                             bg-blue-50 dark:bg-gray-700 text-blue-900 dark:text-white 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-400 
                             placeholder:text-blue-400 dark:placeholder:text-gray-400 transition"
                />
              </div>
              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-blue-900 dark:text-gray-200 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={formType === 'contact' ? 'Please describe your question or issue...' : 'Tell us about your experience...'}
                  className="w-full px-3 py-2 border border-blue-300 dark:border-gray-600 rounded-md 
                             bg-blue-50 dark:bg-gray-700 text-blue-900 dark:text-white 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-400 
                             placeholder:text-blue-400 dark:placeholder:text-gray-400 transition"
                />
              </div>
              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md shadow-md disabled:opacity-50 transition"
              >
                {loading ? 'Sending...' : (formType === 'contact' ? 'Send Message' : 'Submit Feedback')}
              </button>

              {/* Continue with Google */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 mt-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-blue-900 dark:text-gray-200 py-2 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <div className="card bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg relative z-10">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-white mb-4">Get in Touch</h3>
              <div className="space-y-4 text-blue-800 dark:text-gray-300">
                <p><strong>Email:</strong> support@pricevista.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Address:</strong> 123 Price Street, Shopping District, City, State 12345</p>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-blue-900 dark:text-white mb-3">Business Hours</h4>
                <p className="text-blue-800 dark:text-gray-300">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind custom animation styles */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 8s ease-in-out infinite;
          animation-delay: 2s;
        }
        .animate-float-slow {
          animation: float 10s ease-in-out infinite;
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default ContactFeedback

