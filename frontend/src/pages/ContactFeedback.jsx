import React, { useState } from 'react'

const ContactFeedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formType, setFormType] = useState('contact')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Mock form submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Thank you for your message! We\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {formType === 'contact' ? 'Contact Us' : 'Send Feedback'}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {formType === 'contact' 
            ? 'Have questions or need help? We\'d love to hear from you.'
            : 'Your feedback helps us improve PriceVista. Share your thoughts with us.'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setFormType('contact')}
              className={`px-4 py-2 rounded-md font-medium ${
                formType === 'contact'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => setFormType('feedback')}
              className={`px-4 py-2 rounded-md font-medium ${
                formType === 'feedback'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Feedback
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading ? 'Sending...' : (formType === 'contact' ? 'Send Message' : 'Submit Feedback')}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-primary-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Email</h4>
                  <p className="text-gray-600">support@pricevista.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-primary-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Phone</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-primary-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Address</h4>
                  <p className="text-gray-600">
                    123 Price Street<br />
                    Shopping District<br />
                    City, State 12345
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Business Hours</h4>
              <p className="text-gray-600">
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactFeedback 