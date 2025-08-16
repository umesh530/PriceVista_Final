import React, { useState, useRef, useEffect } from 'react'

const ImmersiveViewer = ({ product }) => {
  const [currentView, setCurrentView] = useState('front')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  const views = [
    { id: 'front', label: 'Front', rotation: 0 },
    { id: 'back', label: 'Back', rotation: 180 },
    { id: 'left', label: 'Left', rotation: 90 },
    { id: 'right', label: 'Right', rotation: -90 },
    { id: 'top', label: 'Top', rotation: 0, axis: 'x' },
    { id: 'bottom', label: 'Bottom', rotation: 180, axis: 'x' }
  ]

  useEffect(() => {
    if (canvasRef.current) {
      drawProduct()
    }
  }, [currentView, zoom, product])

  const drawProduct = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    
    // Center the product
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    
    // Draw product placeholder (replace with actual 3D rendering)
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.scale(zoom, zoom)
    
    // Draw product box
    const width = 120
    const height = 80
    const depth = 60
    
    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 2
    ctx.fillStyle = '#eff6ff'
    
    // Draw front face
    ctx.fillRect(-width/2, -height/2, width, height)
    ctx.strokeRect(-width/2, -height/2, width, height)
    
    // Draw side faces based on view
    const view = views.find(v => v.id === currentView)
    if (view) {
      if (view.axis === 'x') {
        // Top/Bottom view
        ctx.fillRect(-width/2, -depth/2, width, depth)
        ctx.strokeRect(-width/2, -depth/2, width, depth)
      } else {
        // Side view
        ctx.fillRect(-depth/2, -height/2, depth, height)
        ctx.strokeRect(-depth/2, -height/2, depth, height)
      }
    }
    
    // Draw product name
    ctx.fillStyle = '#1f2937'
    ctx.font = '14px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(product?.name || 'Product Name', 0, height/2 + 20)
    
    ctx.restore()
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 3))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5))
  }

  const handleReset = () => {
    setZoom(1)
    setCurrentView('front')
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">3D Product Viewer</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleZoomOut}
            className="btn-secondary px-3"
            title="Zoom Out"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
            </svg>
          </button>
          <button
            onClick={handleReset}
            className="btn-secondary px-3"
            title="Reset View"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button
            onClick={handleZoomIn}
            className="btn-secondary px-3"
            title="Zoom In"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
            </svg>
          </button>
          <button
            onClick={toggleFullscreen}
            className="btn-secondary px-3"
            title="Toggle Fullscreen"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      </div>

      {/* View Controls */}
      <div className="flex flex-wrap gap-2 mb-4">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => setCurrentView(view.id)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              currentView === view.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {view.label}
          </button>
        ))}
      </div>

      {/* Canvas Container */}
      <div 
        ref={containerRef}
        className="relative border border-gray-200 rounded-lg overflow-hidden bg-gray-50"
        style={{ height: '400px' }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          onMouseDown={(e) => {
            // Add mouse interaction for rotation
            console.log('Mouse down on canvas')
          }}
        />
        
        {/* Zoom indicator */}
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded text-sm text-gray-600">
          {Math.round(zoom * 100)}%
        </div>
        
        {/* Instructions */}
        <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs text-gray-500">
          Click and drag to rotate • Scroll to zoom
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Current View: {views.find(v => v.id === currentView)?.label}</h4>
        <p className="text-sm text-gray-600">
          Explore the product from different angles. Use the view controls above to see the product from various perspectives.
        </p>
      </div>
    </div>
  )
}

export default ImmersiveViewer 