import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTopRatedMovies } from '../hooks/useMovieApi';
import MovieGrid from '../components/common/MovieGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';

const TopRatedPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useTopRatedMovies(currentPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="xlarge" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <div className="text-white text-xl mb-2">Error Loading Top Rated Movies</div>
          <div className="text-gray-400">{error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            🏆 Top Rated Movies
          </h1>
          <p className="text-gray-400">
            The highest rated movies of all time
          </p>
        </motion.div>

        {/* Movies Grid */}
        <MovieGrid
          movies={data?.results}
          isLoading={isLoading}
          error={error}
          showTitle={false}
        />

        {/* Pagination */}
        {data && data.total_pages > 1 && (
          <motion.div
            className="flex justify-center items-center space-x-2 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === 1
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Previous
            </button>
            
            <div className="flex space-x-1">
              {[...Array(Math.min(5, data.total_pages))].map((_, index) => {
                const pageNumber = Math.max(1, currentPage - 2) + index;
                if (pageNumber > data.total_pages) return null;
                
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      currentPage === pageNumber
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === data.total_pages}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === data.total_pages
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Next
            </button>
          </motion.div>
        )}

        {/* Page Info */}
        {data && (
          <div className="text-center text-gray-400 mt-4">
            Page {currentPage} of {data.total_pages.toLocaleString()} 
            ({data.total_results.toLocaleString()} total movies)
          </div>
        )}
      </div>
    </div>
  );
};

export default TopRatedPage; 