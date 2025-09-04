import React, { useState, useEffect } from 'react'

const PriceChart = ({ productId, period = '30d' }) => {
  const [priceData, setPriceData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPeriod, setSelectedPeriod] = useState(period)

  const periods = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ]

  useEffect(() => {
    fetchPriceData()
  }, [productId, selectedPeriod])

  const fetchPriceData = async () => {
    try {
      setLoading(true)
      // Mock data for now - replace with actual API call
      const mockData = generateMockPriceData(selectedPeriod)
      setPriceData(mockData)
    } catch (err) {
      setError('Failed to load price data')
    } finally {
      setLoading(false)
    }
  }

  const generateMockPriceData = (period) => {
    const days = period === '7d' ? 7 : period === '30d' ? 30 : period === '90d' ? 90 : 365
    const data = []
    let basePrice = 100 + Math.random() * 50
    
    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (days - i))
      
      // Add some random price variation
      const variation = (Math.random() - 0.5) * 20
      const price = Math.max(50, basePrice + variation)
      
      data.push({
        date: date.toISOString().split('T')[0],
        price: Math.round(price * 100) / 100
      })
    }
    
    return data
  }

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button 
            onClick={fetchPriceData}
            className="btn-primary mt-2"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const minPrice = Math.min(...priceData.map(d => d.price))
  const maxPrice = Math.max(...priceData.map(d => d.price))
  const priceRange = maxPrice - minPrice

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Price History</h3>
        <div className="flex space-x-2">
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => setSelectedPeriod(p.value)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                selectedPeriod === p.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-64">
        <svg className="w-full h-full" viewBox={`0 0 ${priceData.length * 20} 200`}>
          {/* Grid lines */}
          {[...Array(5)].map((_, i) => (
            <line
              key={i}
              x1="0"
              y1={i * 40}
              x2={priceData.length * 20}
              y2={i * 40}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          {/* Price line */}
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            points={priceData.map((d, i) => 
              `${i * 20},${200 - ((d.price - minPrice) / priceRange) * 160 - 20}`
            ).join(' ')}
          />

          {/* Data points */}
          {priceData.map((d, i) => (
            <circle
              key={i}
              cx={i * 20}
              cy={200 - ((d.price - minPrice) / priceRange) * 160 - 20}
              r="3"
              fill="#3b82f6"
            />
          ))}
        </svg>

        {/* Price labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
          <span>{maxPrice.toFixed(2)} INR</span>
          <span>{(minPrice + priceRange / 2).toFixed(2)} INR</span>
          <span>{minPrice.toFixed(2)} INR</span>
        </div>

        {/* Date labels */}
        <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-500">
          <span>{priceData[0]?.date}</span>
          <span>{priceData[Math.floor(priceData.length / 2)]?.date}</span>
          <span>{priceData[priceData.length - 1]?.date}</span>
        </div>
      </div>

      {/* Price statistics */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-600">Lowest</p>
          <p className="text-lg font-semibold text-green-600">{minPrice.toFixed(2)} INR</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Current</p>
          <p className="text-lg font-semibold text-primary-600">
            {priceData[priceData.length - 1]?.price.toFixed(2)} INR
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Highest</p>
          <p className="text-lg font-semibold text-red-600">{maxPrice.toFixed(2)} INR</p>
        </div>
      </div>
    </div>
  )
}

export default PriceChart 