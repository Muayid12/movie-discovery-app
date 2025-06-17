import React from 'react';
import { motion } from 'framer-motion';
import MovieCard from './MovieCard';
import LoadingSpinner from './LoadingSpinner';

const MovieGrid = ({ 
  movies = [], 
  isLoading = false, 
  error = null,
  title = '',
  showTitle = true,
  className = '',
  emptyMessage = 'No movies found.'
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {showTitle && title && (
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        )}
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner size="large" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`space-y-6 ${className}`}>
        {showTitle && title && (
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        )}
        <div className="text-center py-12">
          <div className="text-red-400 text-lg mb-2">⚠️ Error loading movies</div>
          <div className="text-gray-400">{error.message || 'Something went wrong'}</div>
        </div>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className={`space-y-6 ${className}`}>
        {showTitle && title && (
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        )}
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎬</div>
          <div className="text-gray-400 text-lg">{emptyMessage}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {showTitle && title && (
        <motion.h2 
          className="text-2xl font-bold text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
      )}
      
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {movies.map((movie, index) => (
          <MovieCard 
            key={`${movie.id}-${index}`} 
            movie={movie} 
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default MovieGrid; 