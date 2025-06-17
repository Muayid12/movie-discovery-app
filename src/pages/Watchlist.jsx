import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWatchlist } from '../hooks/useWatchlist';
import MovieCard from '../components/common/MovieCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Watchlist = () => {
  const { 
    watchlist, 
    isLoading, 
    clearWatchlist, 
    getSortedWatchlist, 
    watchlistCount 
  } = useWatchlist();
  
  const [sortBy, setSortBy] = useState('addedAt');
  const [showClearModal, setShowClearModal] = useState(false);

  const sortOptions = [
    { value: 'addedAt', label: 'Recently Added' },
    { value: 'title', label: 'Title (A-Z)' },
    { value: 'release_date', label: 'Release Date' },
    { value: 'vote_average', label: 'Rating' },
  ];

  const sortedMovies = getSortedWatchlist(sortBy);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="xlarge" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              📋 My Watchlist
            </h1>
            <p className="text-gray-400">
              {watchlistCount} {watchlistCount === 1 ? 'movie' : 'movies'} saved
            </p>
          </div>

          {watchlistCount > 0 && (
            <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    Sort by {option.label}
                  </option>
                ))}
              </select>

              {/* Clear All Button */}
              <button
                onClick={() => setShowClearModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Clear All
              </button>
            </div>
          )}
        </motion.div>

        {/* Content */}
        {watchlistCount === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">📋</div>
            <div className="text-white text-xl mb-2">Your watchlist is empty</div>
            <div className="text-gray-400 mb-6">
              Start adding movies to your watchlist to keep track of what you want to watch
            </div>
            <motion.a
              href="/"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Discover Movies
            </motion.a>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {sortedMovies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
          </motion.div>
        )}

        {/* Clear Confirmation Modal */}
        {showClearModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowClearModal(false)}
          >
            <motion.div
              className="bg-gray-800 rounded-lg p-6 max-w-sm w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-white text-xl font-bold mb-4">Clear Watchlist</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to remove all movies from your watchlist? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowClearModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    clearWatchlist();
                    setShowClearModal(false);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Clear All
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Watchlist; 