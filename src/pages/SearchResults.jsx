import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    rating: '',
    retailer: ''
  })

  const query = searchParams.get('q') || ''

  useEffect(() => {
    if (query) {
      fetchSearchResults()
    }
  }, [query, filters])

  const fetchSearchResults = async () => {
    try {
      setLoading(true)
      // Mock data for now - replace with actual API call
      const mockProducts = generateMockSearchResults(query, filters)
      setProducts(mockProducts)
    } catch (error) {
      console.error('Failed to fetch search results:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateMockSearchResults = (searchQuery, searchFilters) => {
    const results = []
    const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Toys']
    const retailers = ['Amazon', 'Flipkart', 'Meesho', 'Nyka', 'Blinkit']
    
    // Product name templates based on categories
    const productTemplates = {
      'Electronics': [
        'Laptop', 'Smartphone', 'Headphones', 'Camera', 'TV', 'Monitor', 'Gaming Console',
        'Tablet', 'Speaker', 'Microphone', 'Keyboard', 'Mouse', 'Webcam', 'Printer'
      ],
      'Fashion': [
        'Shirt', 'Dress', 'Jeans', 'Shoes', 'Jacket', 'Watch', 'Necklace', 'Ring',
        'Sneakers', 'Sunglasses', 'Handbag', 'Wallet', 'Belt', 'Scarf'
      ],
      'Home & Garden': [
        'Furniture', 'Sofa', 'Table', 'Chair', 'Bed', 'Kitchen Appliance', 'Garden Tool',
        'Plant', 'Lamp', 'Mirror', 'Cushion', 'Curtain', 'Rug', 'Vase'
      ],
      'Sports': [
        'Football', 'Basketball', 'Tennis Racket', 'Gym Equipment', 'Fitness Tracker',
        'Running Shoes', 'Sports Jersey', 'Water Bottle', 'Yoga Mat', 'Dumbbells'
      ],
      'Books': [
        'Book', 'Novel', 'Textbook', 'Magazine', 'Comic', 'Dictionary', 'Encyclopedia',
        'Biography', 'Fiction', 'Non-fiction', 'Poetry', 'Self-help'
      ],
      'Toys': [
        'Toy', 'Lego Set', 'Doll', 'Board Game', 'Puzzle', 'Action Figure', 'Stuffed Animal',
        'Building Blocks', 'Art Supplies', 'Educational Toy', 'Remote Control Car'
      ]
    }
    
    for (let i = 0; i < 20; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)]
      const templates = productTemplates[category] || ['Product']
      const template = templates[Math.floor(Math.random() * templates.length)]
      
      const basePrice = 20 + Math.random() * 300
      const discount = Math.random() > 0.6 ? Math.random() * 40 : 0
      const price = basePrice - (basePrice * discount / 100)
      
      // Create a more realistic product name
      const brandNames = ['Premium', 'Elite', 'Pro', 'Max', 'Ultra', 'Smart', 'Advanced', 'Modern']
      const brand = brandNames[Math.floor(Math.random() * brandNames.length)]
      const productName = `${brand} ${template} ${i + 1}`
      
      results.push({
        id: i + 1,
        name: productName,
        image: `https://picsum.photos/300/200?random=${i + 100}`, // This will be overridden by ProductCard
        price: Math.round(price * 100) / 100,
        originalPrice: Math.round(basePrice * 100) / 100,
        retailer: retailers[Math.floor(Math.random() * retailers.length)],
        rating: 3 + Math.random() * 2,
        reviewCount: Math.floor(Math.random() * 2000) + 10,
        inStock: Math.random() > 0.15,
        discount: Math.round(discount),
        category: category
      })
    }
    
    return results
  }

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      rating: '',
      retailer: ''
    })
  }

  if (loading) {
    return <Loader fullScreen text="Searching..." />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Found {products.length} products matching your search
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filters</h3>
            
            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100"
              >
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home & Garden">Home & Garden</option>
                <option value="Sports">Sports</option>
                <option value="Books">Books</option>
                <option value="Toys">Toys</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Range
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100"
              >
                <option value="">Any Price</option>
                <option value="0-50">Under 50INR</option>
                <option value="50-100">50INR - 100INR</option>
                <option value="100-200">100INR - 200INR</option>
                <option value="200-500">200INR - 500INR</option>
                <option value="500+">Over 500INR</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Minimum Rating
              </label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100"
              >
                <option value="">Any Rating</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
              </select>
            </div>

            {/* Retailer Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Retailer
              </label>
              <select
                value={filters.retailer}
                onChange={(e) => handleFilterChange('retailer', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100"
              >
                <option value="">All Retailers</option>
                <option value="Amazon">Amazon</option>
                <option value="Flipkart">Flipkart</option>
                <option value="Meesho">Meesho</option>
                <option value="Nyka">Nyka</option>
                <option value="Blinkit">Blinkit</option>
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="w-full btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-1">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchResults 