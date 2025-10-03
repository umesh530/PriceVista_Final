import React from 'react'

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
    <h1 className="text-4xl font-bold text-primary-600 mb-4">404</h1>
    <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
    <p className="text-gray-600 dark:text-gray-300 mb-4">Sorry, the page you are looking for does not exist.</p>
    <a href="/" className="btn-primary">Go Home</a>
  </div>
)

export default NotFound
