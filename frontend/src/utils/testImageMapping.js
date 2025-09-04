import { getProductImage } from './productImageHelper'

// Test function to verify image mapping
export const testImageMapping = () => {
  const testCases = [
    { name: 'Premium Laptop 1', category: 'Electronics', expected: 'laptop' },
    { name: 'Smartphone Pro', category: 'Electronics', expected: 'mobile' },
    { name: 'Gaming Headphones', category: 'Electronics', expected: 'headphones' },
    { name: 'Digital Camera', category: 'Electronics', expected: 'camera' },
    { name: 'Smart TV', category: 'Electronics', expected: 'tv' },
    { name: 'Gaming Console', category: 'Electronics', expected: 'gaming' },
    { name: 'Fashion Shirt', category: 'Fashion', expected: 'shirt' },
    { name: 'Designer Dress', category: 'Fashion', expected: 'dress' },
    { name: 'Running Shoes', category: 'Fashion', expected: 'shoes' },
    { name: 'Luxury Watch', category: 'Fashion', expected: 'watch' },
    { name: 'Comfortable Sofa', category: 'Home & Garden', expected: 'sofa' },
    { name: 'Kitchen Appliance', category: 'Home & Garden', expected: 'kitchen' },
    { name: 'Garden Plant', category: 'Home & Garden', expected: 'plant' },
    { name: 'Sports Football', category: 'Sports', expected: 'football' },
    { name: 'Fitness Equipment', category: 'Sports', expected: 'sports' },
    { name: 'Educational Book', category: 'Books', expected: 'book' },
    { name: 'Children Toy', category: 'Toys', expected: 'toy' },
    { name: 'Unknown Product', category: 'Unknown', expected: 'default' }
  ]

  console.log('🧪 Testing Image Mapping...')
  
  testCases.forEach((testCase, index) => {
    const result = getProductImage(testCase.name, testCase.category)
    const isSuccess = result.includes(testCase.expected) || (testCase.expected === 'default' && result.includes('unsplash'))
    
    console.log(`${index + 1}. ${testCase.name} (${testCase.category})`)
    console.log(`   Expected: ${testCase.expected}`)
    console.log(`   Result: ${result}`)
    console.log(`   ✅ ${isSuccess ? 'PASS' : 'FAIL'}`)
    console.log('')
  })
  
  console.log('🎉 Image mapping test completed!')
}

export default testImageMapping
