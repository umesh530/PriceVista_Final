import api from './api'

class PriceService {
  // Get price history for a product
  async getPriceHistory(productId, period = '30d') {
    return api.get(`/prices/${productId}/history?period=${period}`)
  }

  // Get current price for a product
  async getCurrentPrice(productId) {
    return api.get(`/prices/${productId}/current`)
  }

  // Get price alerts for a user
  async getPriceAlerts() {
    return api.get('/prices/alerts')
  }

  // Create a price alert
  async createPriceAlert(productId, targetPrice, alertType = 'below') {
    return api.post('/prices/alerts', {
      productId,
      targetPrice,
      alertType
    })
  }

  // Update a price alert
  async updatePriceAlert(alertId, updates) {
    return api.put(`/prices/alerts/${alertId}`, updates)
  }

  // Delete a price alert
  async deletePriceAlert(alertId) {
    return api.delete(`/prices/alerts/${alertId}`)
  }

  // Get price comparison across different retailers
  async getPriceComparison(productId) {
    return api.get(`/prices/${productId}/comparison`)
  }

  // Get price trends for a category
  async getPriceTrends(category, period = '30d') {
    return api.get(`/prices/trends/${category}?period=${period}`)
  }

  // Get best deals
  async getBestDeals(limit = 20) {
    return api.get(`/prices/deals?limit=${limit}`)
  }

  // Track a product for price monitoring
  async trackProduct(productId) {
    return api.post('/prices/track', { productId })
  }

  // Stop tracking a product
  async untrackProduct(productId) {
    return api.delete(`/prices/track/${productId}`)
  }

  // Get tracked products for a user
  async getTrackedProducts() {
    return api.get('/prices/tracked')
  }

  // Get price drop notifications
  async getPriceDropNotifications() {
    return api.get('/prices/notifications/drops')
  }

  // Mark notification as read
  async markNotificationRead(notificationId) {
    return api.put(`/prices/notifications/${notificationId}/read`)
  }
}

export default new PriceService() 