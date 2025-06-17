import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Header from './components/common/Header';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import SearchResults from './pages/SearchResults';
import Watchlist from './pages/Watchlist';
import TrendingPage from './pages/TrendingPage';
import TopRatedPage from './pages/TopRatedPage';
import GenresPage from './pages/GenresPage';

// Styles
import './index.css';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// Layout wrapper component
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="text-2xl font-bold text-blue-500 mb-2">🎬 MovieVerse</div>
          <p className="text-sm">
            Discover your next favorite movie with TMDB data
          </p>
          <p className="text-xs mt-2 text-gray-500">
            Built with React, Tailwind CSS, and Framer Motion
          </p>
        </div>
      </footer>
    </div>
  );
};

// Page wrapper for consistent animations
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            } />
            <Route path="/movie/:id" element={
              <PageWrapper>
                <MovieDetails />
              </PageWrapper>
            } />
            <Route path="/search" element={
              <PageWrapper>
                <SearchResults />
              </PageWrapper>
            } />
            <Route path="/watchlist" element={
              <PageWrapper>
                <Watchlist />
              </PageWrapper>
            } />
            <Route path="/trending" element={
              <PageWrapper>
                <TrendingPage />
              </PageWrapper>
            } />
            <Route path="/top-rated" element={
              <PageWrapper>
                <TopRatedPage />
              </PageWrapper>
            } />
            <Route path="/genres" element={
              <PageWrapper>
                <GenresPage />
              </PageWrapper>
            } />
            <Route path="*" element={
              <PageWrapper>
                <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎬</div>
                    <div className="text-white text-2xl mb-2">Page Not Found</div>
                    <div className="text-gray-400 mb-4">
                      The page you're looking for doesn't exist.
                    </div>
                    <a
                      href="/"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Go Home
                    </a>
                  </div>
                </div>
              </PageWrapper>
            } />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App; 