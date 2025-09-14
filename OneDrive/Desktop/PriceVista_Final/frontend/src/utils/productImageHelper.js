// Product image mapping based on product names and categories
const productImageMap = {
  // Laptops and Computers
  laptop: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop',
  computer: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop',
  macbook: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop',
  dell: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop',
  hp: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop',
  lenovo: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop',
  asus: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop',
  acer: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop',
  
  // Mobile Phones
  mobile: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop',
  phone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop',
  smartphone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop',
  iphone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop',
  samsung: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop',
  android: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop',
  
  // TVs and Displays
  tv: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=200&fit=crop',
  television: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=200&fit=crop',
  monitor: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=200&fit=crop',
  display: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=200&fit=crop',
  lg: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=200&fit=crop',
  sony: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=200&fit=crop',
  
  // Headphones and Audio
  headphone: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
  headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
  earphone: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
  earphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
  audio: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
  speaker: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
  speakers: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
  
  // Cameras
  camera: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=200&fit=crop',
  dslr: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=200&fit=crop',
  mirrorless: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=200&fit=crop',
  canon: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=200&fit=crop',
  nikon: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=200&fit=crop',
  
  // Gaming
  gaming: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop',
  game: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop',
  console: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop',
  playstation: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop',
  xbox: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop',
  nintendo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop',
  
  // Fashion and Clothing
  shirt: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop',
  dress: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=200&fit=crop',
  jeans: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=200&fit=crop',
  shoes: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop',
  sneakers: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop',
  jacket: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=200&fit=crop',
  fashion: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop',
  clothing: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop',
  
  // Books
  book: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop',
  books: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop',
  novel: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop',
  textbook: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop',
  
  // Home and Garden
  furniture: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop',
  sofa: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop',
  table: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=300&h=200&fit=crop',
  chair: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300&h=200&fit=crop',
  bed: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=300&h=200&fit=crop',
  kitchen: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop',
  garden: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
  plant: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
  
  // Sports
  sports: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
  football: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
  basketball: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300&h=200&fit=crop',
  tennis: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=300&h=200&fit=crop',
  gym: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
  fitness: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
  
  // Toys
  toy: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=300&h=200&fit=crop',
  toys: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=300&h=200&fit=crop',
  lego: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=300&h=200&fit=crop',
  doll: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=300&h=200&fit=crop',
  
  // Watches and Jewelry
  watch: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=200&fit=crop',
  watches: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=200&fit=crop',
  jewelry: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=200&fit=crop',
  ring: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=200&fit=crop',
  necklace: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=200&fit=crop',
  
  // Kitchen Appliances
  blender: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop',
  mixer: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop',
  toaster: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop',
  microwave: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop',
  refrigerator: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop',
  fridge: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop',
  
  // Tools and Hardware
  tool: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=300&h=200&fit=crop',
  tools: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=300&h=200&fit=crop',
  drill: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=300&h=200&fit=crop',
  hammer: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=300&h=200&fit=crop',
  screwdriver: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=300&h=200&fit=crop',
}

// Default placeholder image
const defaultImage = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop'

/**
 * Get product image based on product name and category
 * @param {string} productName - The name of the product
 * @param {string} category - The category of the product (optional)
 * @returns {string} - The image path for the product
 */
export const getProductImage = (productName, category = '') => {
  if (!productName) return defaultImage
  
  // Convert to lowercase for case-insensitive matching
  const name = productName.toLowerCase()
  const cat = category.toLowerCase()
  
  // First, try to match by category
  if (cat && productImageMap[cat]) {
    return productImageMap[cat]
  }
  
  // Then try to match by product name keywords
  for (const [keyword, imagePath] of Object.entries(productImageMap)) {
    if (name.includes(keyword)) {
      return imagePath
    }
  }
  
  // If no match found, return default image
  return defaultImage
}

/**
 * Get product image with fallback to placeholder
 * @param {string} productName - The name of the product
 * @param {string} category - The category of the product (optional)
 * @param {string} fallbackImage - Custom fallback image (optional)
 * @returns {string} - The image path for the product
 */
export const getProductImageWithFallback = (productName, category = '', fallbackImage = null) => {
  const imagePath = getProductImage(productName, category)
  
  // If the mapped image doesn't exist, use fallback or default
  if (fallbackImage) {
    return fallbackImage
  }
  
  return imagePath
}

export default getProductImage
