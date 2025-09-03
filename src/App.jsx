import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import SearchResults from './pages/SearchResults'
import ProductDetail from './pages/ProductDetail'
import PriceTracker from './pages/PriceTracker'
import Dashboard from './pages/Dashboard'
import LoginSignup from './pages/LoginSignup'
import AboutUs from './pages/AboutUs'
import ContactFeedback from './pages/ContactFeedback'
import AdminPanel from './pages/AdminPanel'

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-pattern transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/tracker" element={<PriceTracker />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/auth" element={<LoginSignup />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactFeedback />} />
                <Route path="/admin" element={<AdminPanel />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App 