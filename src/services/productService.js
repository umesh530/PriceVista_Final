import api from './api'

class ProductService {
  // Get all products with optional filters
  async getProducts(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString()
    const endpoint = queryParams ? `/products?${queryParams}` : '/products'
    return api.get(endpoint)
  }

  // Get a single product by ID
  async getProduct(id) {
    return api.get(`/products/${id}`)
  }

  // Search products by query
  async searchProducts(query, filters = {}) {
    const params = { q: query, ...filters }
    const queryParams = new URLSearchParams(params).toString()
    return api.get(`/products/search?${queryParams}`)
  }

  // Get product categories
  async getCategories() {
    return api.get('/products/categories')
  }

  // Get products by category
  async getProductsByCategory(category, filters = {}) {
    const queryParams = new URLSearchParams(filters).toString()
    const endpoint = queryParams ? `/products/category/${category}?${queryParams}` : `/products/category/${category}`
    return api.get(endpoint)
  }

  // Get trending products
  async getTrendingProducts(limit = 10) {
    return api.get(`/products/trending?limit=${limit}`)
  }

  // Get product recommendations
  async getRecommendations(productId, limit = 5) {
    return api.get(`/products/${productId}/recommendations?limit=${limit}`)
  }

  // Add product to favorites
  async addToFavorites(productId) {
    return api.post('/products/favorites', { productId })
  }

  // Remove product from favorites
  async removeFromFavorites(productId) {
    return api.delete(`/products/favorites/${productId}`)
  }

  // Get user favorites
  async getFavorites() {
    return api.get('/products/favorites')
  }
}

export default new ProductService() 