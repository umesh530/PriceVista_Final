import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const ImmersiveViewer = ({ product, productId }) => {
  const { isDark } = useTheme()
  const [currentAngle, setCurrentAngle] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isAutoRotating, setIsAutoRotating] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [has360Images, setHas360Images] = useState(false)
  const [images, setImages] = useState([])
  const [loadedImages, setLoadedImages] = useState({})
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [error, setError] = useState(null)
  
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const dragStartRef = useRef({ x: 0, angle: 0 })
  const animationRef = useRef(null)
  const lastTimeRef = useRef(0)
  const imageCacheRef = useRef({})

  // Generate image paths and check availability
  useEffect(() => {
    if (!productId) {
      setIsLoading(false)
      return
    }
    
    const imagePaths = []
    const totalImages = 36 // 36 images for smooth 360° rotation
    
    for (let i = 1; i <= totalImages; i++) {
      imagePaths.push(`/products/360/${productId}-${i}.jpg`)
    }
    
    setImages(imagePaths)
    
    // Check if first image exists to determine if 360° images are available
    const testImage = new Image()
    testImage.onload = () => {
      setHas360Images(true)
      setIsLoading(false)
      preloadImages(imagePaths)
    }
    testImage.onerror = () => {
      setHas360Images(false)
      setIsLoading(false)
      setError('360° images not available for this product')
    }
    testImage.src = imagePaths[0]
  }, [productId])

  // Preload all images for smooth rotation
  const preloadImages = useCallback((imagePaths) => {
    const loadedImagesObj = {}
    let loadedCount = 0
    
    imagePaths.forEach((path, index) => {
      const img = new Image()
      img.onload = () => {
        loadedImagesObj[index] = img
        loadedCount++
        setLoadedImages(prev => ({ ...prev, [index]: img }))
        
        if (loadedCount === imagePaths.length) {
          console.log('All 360° images preloaded successfully')
        }
      }
      img.onerror = () => {
        console.warn(`Failed to load image: ${path}`)
        loadedCount++
      }
      img.src = path
    })
    
    imageCacheRef.current = loadedImagesObj
  }, [])

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating || !has360Images) return
    
    const animate = (currentTime) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime
      }
      
      const deltaTime = currentTime - lastTimeRef.current
      const rotationSpeed = 0.03 // degrees per millisecond (slower for smoother rotation)
      
      setCurrentAngle(prev => (prev + rotationSpeed * deltaTime) % 360)
      lastTimeRef.current = currentTime
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isAutoRotating, has360Images])

  // Update canvas when angle or zoom changes
  useEffect(() => {
    if (!has360Images || !canvasRef.current || images.length === 0) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    
    // Calculate which image to show based on current angle
    const imageIndex = Math.round((currentAngle / 360) * images.length) % images.length
    setCurrentImageIndex(imageIndex)
    
    // Get the image from cache or load it
    const img = imageCacheRef.current[imageIndex]
    
    if (img && img.complete) {
      drawImageOnCanvas(ctx, img, canvas.width, canvas.height, zoom)
    } else {
      // Fallback: load image on demand
      const fallbackImg = new Image()
      fallbackImg.onload = () => {
        drawImageOnCanvas(ctx, fallbackImg, canvas.width, canvas.height, zoom)
      }
      fallbackImg.onerror = () => {
        drawFallbackImage(ctx, canvas.width, canvas.height)
      }
      fallbackImg.src = images[imageIndex]
    }
  }, [currentAngle, zoom, has360Images, images])

  // Draw image on canvas with proper scaling
  const drawImageOnCanvas = useCallback((ctx, img, canvasWidth, canvasHeight, zoomLevel) => {
    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    
    // Calculate dimensions to maintain aspect ratio
    const imgAspect = img.width / img.height
    const canvasAspect = canvasWidth / canvasHeight
    
    let drawWidth, drawHeight, offsetX, offsetY
    
    if (imgAspect > canvasAspect) {
      drawWidth = canvasWidth * zoomLevel
      drawHeight = drawWidth / imgAspect
      offsetX = (canvasWidth - drawWidth) / 2
      offsetY = (canvasHeight - drawHeight) / 2
    } else {
      drawHeight = canvasHeight * zoomLevel
      drawWidth = drawHeight * imgAspect
      offsetX = (canvasWidth - drawWidth) / 2
      offsetY = (canvasHeight - drawHeight) / 2
    }
    
    // Draw image
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
  }, [])

  // Draw fallback image
  const drawFallbackImage = useCallback((ctx, canvasWidth, canvasHeight) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    
    // Background
    ctx.fillStyle = isDark ? '#374151' : '#f3f4f6'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    
    // Icon
    const centerX = canvasWidth / 2
    const centerY = canvasHeight / 2
    const iconSize = 60
    
    ctx.fillStyle = isDark ? '#6b7280' : '#9ca3af'
    ctx.font = `${iconSize}px Arial`
    ctx.textAlign = 'center'
    ctx.fillText('📷', centerX, centerY + iconSize/3)
    
    // Text
    ctx.fillStyle = isDark ? '#d1d5db' : '#6b7280'
    ctx.font = '16px Arial'
    ctx.fillText('Image not available', centerX, centerY + iconSize + 20)
  }, [isDark])

  // Mouse event handlers
  const handleMouseDown = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
    dragStartRef.current = {
      x: e.clientX,
      angle: currentAngle
    }
    document.body.style.cursor = 'grabbing'
  }, [currentAngle])

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return
    
    const deltaX = e.clientX - dragStartRef.current.x
    const sensitivity = 0.8 // degrees per pixel (increased for more responsive rotation)
    
    setCurrentAngle(dragStartRef.current.angle + deltaX * sensitivity)
  }, [isDragging])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    document.body.style.cursor = 'default'
  }, [])

  // Touch event handlers
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 1) {
      e.preventDefault()
      setIsDragging(true)
      dragStartRef.current = {
        x: e.touches[0].clientX,
        angle: currentAngle
      }
    }
  }, [currentAngle])

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || e.touches.length !== 1) return
    e.preventDefault()
    
    const deltaX = e.touches[0].clientX - dragStartRef.current.x
    const sensitivity = 0.8
    
    setCurrentAngle(dragStartRef.current.angle + deltaX * sensitivity)
  }, [isDragging])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Wheel zoom handler
  const handleWheel = useCallback((e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)))
  }, [])

  // Control functions
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 3))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5))
  const handleReset = () => {
    setZoom(1)
    setCurrentAngle(0)
    setIsAutoRotating(false)
  }
  
  const toggleAutoRotate = () => setIsAutoRotating(prev => !prev)
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Fallback to normal product image if no 360° images
  if (!has360Images && !isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-gradient dark:from-dark-800/90 dark:to-dark-700/90 dark:shadow-xl dark:border-dark-600/30"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold gradient-text">Product Viewer</h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            360° view not available
          </div>
        </div>
        
        <div className="relative border border-white/30 dark:border-dark-600/30 rounded-2xl overflow-hidden transition-all duration-300 bg-white/20 dark:bg-dark-800/20 backdrop-blur-md">
          <img
            src={product?.image || '/src/assets/products/default.jpg'}
            alt={product?.name || 'Product'}
            className="w-full h-64 object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div className="hidden w-full h-64 items-center justify-center bg-white/20 dark:bg-dark-800/20 text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <div className="text-4xl mb-2">📷</div>
              <div>Image not available</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 rounded-2xl bg-white/20 dark:bg-dark-800/20 backdrop-blur-md border border-white/30 dark:border-dark-600/30">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Standard product view. 360° images are not available for this product.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-gradient dark:from-dark-800/90 dark:to-dark-700/90 dark:shadow-xl dark:border-dark-600/30"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold gradient-text">360° Product Viewer</h3>
        <div className="flex space-x-3">
          <motion.button
            onClick={handleZoomOut}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-xl bg-white/20 dark:bg-dark-800/20 backdrop-blur-md border border-white/30 dark:border-dark-600/30 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-dark-700/30 transition-all duration-300 shadow-sm hover:shadow-glow"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
            </svg>
          </motion.button>
          
          <motion.button
            onClick={handleReset}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-xl bg-white/20 dark:bg-dark-800/20 backdrop-blur-md border border-white/30 dark:border-dark-600/30 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-dark-700/30 transition-all duration-300 shadow-sm hover:shadow-glow"
            title="Reset View"
            aria-label="Reset View"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </motion.button>
          
          <motion.button
            onClick={toggleAutoRotate}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-xl backdrop-blur-md border transition-all duration-300 shadow-sm hover:shadow-glow ${
              isAutoRotating
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 border-primary-400/30 text-white'
                : 'bg-white/20 dark:bg-dark-800/20 border-white/30 dark:border-dark-600/30 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-dark-700/30'
            }`}
            title="Toggle Auto-rotation"
            aria-label="Toggle Auto-rotation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </motion.button>
          
          <motion.button
            onClick={handleZoomIn}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-xl bg-white/20 dark:bg-dark-800/20 backdrop-blur-md border border-white/30 dark:border-dark-600/30 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-dark-700/30 transition-all duration-300 shadow-sm hover:shadow-glow"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
            </svg>
          </motion.button>
          
          <motion.button
            onClick={toggleFullscreen}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-xl bg-white/20 dark:bg-dark-800/20 backdrop-blur-md border border-white/30 dark:border-dark-600/30 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-dark-700/30 transition-all duration-300 shadow-sm hover:shadow-glow"
            title="Toggle Fullscreen"
            aria-label="Toggle Fullscreen"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Canvas Container */}
      <div 
        ref={containerRef}
        className="relative border border-white/30 dark:border-dark-600/30 rounded-2xl overflow-hidden transition-all duration-300 bg-white/20 dark:bg-dark-800/20 backdrop-blur-md"
        style={{ height: '400px' }}
      >
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-white/20 dark:bg-dark-800/20 backdrop-blur-md"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Loading 360° view...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <canvas
          ref={canvasRef}
          className={`w-full h-full transition-all duration-300 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          role="img"
          aria-label={`360-degree view of ${product?.name || 'product'}`}
        />
        
        {/* Zoom indicator */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-xl text-sm font-medium bg-white/80 dark:bg-dark-800/80 backdrop-blur-md text-gray-700 dark:text-gray-300 shadow-lg">
          {Math.round(zoom * 100)}%
        </div>
        
        {/* Angle indicator */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-xl text-sm font-medium bg-white/80 dark:bg-dark-800/80 backdrop-blur-md text-gray-700 dark:text-gray-300 shadow-lg">
          {Math.round(currentAngle)}°
        </div>
        
        {/* Instructions */}
        <div className="absolute bottom-3 left-3 px-3 py-1 rounded-xl text-xs font-medium bg-white/80 dark:bg-dark-800/80 backdrop-blur-md text-gray-600 dark:text-gray-400 shadow-lg">
          Drag to rotate • Scroll to zoom
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-6 p-4 rounded-2xl bg-white/20 dark:bg-dark-800/20 backdrop-blur-md border border-white/30 dark:border-dark-600/30">
        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Current View: {Math.round(currentAngle)}°</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Explore the product from every angle. Drag to rotate, scroll to zoom, and use the controls above for additional features.
        </p>
      </div>
    </motion.div>
  )
}

export default ImmersiveViewer 