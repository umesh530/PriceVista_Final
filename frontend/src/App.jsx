import React, { Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import PageTransition from './components/PageTransition'
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
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './pages/NotFound'
import Loader from './components/Loader'

function App() {
  const location = useLocation ? useLocation() : null;
  return (
    <ThemeProvider>
      <UserProvider>
        <div className="min-h-screen flex flex-col bg-pattern transition-colors duration-300">
          <Navbar />
          <main className="flex-grow">
            <AnimatePresence mode="wait" initial={false}>
              <PageTransition key={location ? location.pathname : 'no-location'}>
                <Suspense fallback={<Loader fullScreen text="Loading..." />}> 
                  <ErrorBoundary>
                    <Routes location={location} key={location ? location.pathname : 'no-location'}>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/search" element={<SearchResults />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/tracker" element={<PriceTracker />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/auth" element={<LoginSignup />} />
                      <Route path="/about" element={<AboutUs />} />
                      <Route path="/contact" element={<ContactFeedback />} />
                      <Route path="/admin" element={<AdminPanel />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </ErrorBoundary>
                </Suspense>
              </PageTransition>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App 