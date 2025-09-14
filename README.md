# PriceVista - Price Tracking Application

A modern React-based price tracking application built with Vite, TailwindCSS, and React Router.

## 🚀 Features

- **Product Search & Discovery**: Search for products across multiple retailers
- **Price Tracking**: Monitor price changes and get notifications
- **Price History Charts**: Visualize price trends over time
- **Multi-Retailer Comparison**: Compare prices across different stores
- **User Authentication**: Secure login and registration system
- **Personal Dashboard**: Track favorite products and savings
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **3D Product Viewer**: Immersive product visualization (placeholder)

## 🛠️ Tech Stack

- **Frontend**: React 18 with Hooks
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Package Manager**: npm

## 📁 Project Structure

```
frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/                 # Images and static assets
│   ├── components/             # Reusable UI components
│   ├── pages/                  # Page components
│   ├── context/                # React Context providers
│   ├── services/               # API and service functions
│   ├── styles/                 # Global styles and CSS
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # App entry point
│   └── index.css               # TailwindCSS imports
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies and scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # TailwindCSS configuration
└── vite.config.js              # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Components

### Components
- **Navbar**: Navigation with search and user menu
- **Footer**: Site footer with links and company info
- **ProductCard**: Product display component
- **PriceChart**: Price history visualization
- **ImmersiveViewer**: 3D product viewer (placeholder)
- **Loader**: Loading state component

### Pages
- **HomePage**: Landing page with featured products
- **SearchResults**: Product search with filters
- **ProductDetail**: Detailed product information
- **PriceTracker**: User's tracked products
- **Dashboard**: User dashboard and favorites
- **LoginSignup**: Authentication forms
- **AboutUs**: Company information
- **ContactFeedback**: Contact and feedback forms
- **AdminPanel**: Administrative interface

### Services
- **api.js**: Base API service with authentication
- **productService.js**: Product-related API calls
- **priceService.js**: Price tracking and analytics

## 🎨 Styling

The project uses TailwindCSS for styling with custom component classes:

- `.btn-primary`: Primary button styles
- `.btn-secondary`: Secondary button styles
- `.card`: Card container styles

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### TailwindCSS

Custom colors and components are defined in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      }
    }
  }
}
```

## 📱 Responsive Design

The application is built with a mobile-first approach and includes:

- Responsive navigation with mobile menu
- Grid layouts that adapt to screen size
- Touch-friendly interface elements
- Optimized spacing for different devices

## 🔒 Security Features

- Protected routes for authenticated users
- Admin-only access to administrative functions
- Secure API calls with authentication headers
- Input validation and sanitization

## 🚧 Development Notes

- **Mock Data**: Currently uses mock data for demonstration
- **API Integration**: Service files are ready for backend integration
- **3D Viewer**: Placeholder implementation for future enhancement
- **Authentication**: Basic user context with localStorage

## 🎯 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time price updates
- [ ] Advanced filtering and sorting
- [ ] User notifications system
- [ ] Social sharing features
- [ ] Advanced analytics dashboard
- [ ] Mobile app development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions, please contact:
- Email: support@pricevista.com
- Phone: +1 (555) 123-4567

---

**Note**: This is a frontend-only implementation with mock data. For production use, integrate with a backend API and replace placeholder components with actual functionality. 