import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // You can log errorInfo to an error reporting service
    // console.error(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Something went wrong.</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{this.state.error?.message || 'An unexpected error occurred.'}</p>
          <button className="btn-primary" onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
