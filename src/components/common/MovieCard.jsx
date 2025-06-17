import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { buildImageUrl } from '../../services/tmdbApi';
import { useWatchlist } from '../../hooks/useWatchlist';

const MovieCard = ({ movie, index = 0 }) => {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const isInList = isInWatchlist(movie.id);

  const handleWatchlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWatchlist(movie);
  };

  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    const date = new Date(dateString);
    return date.getFullYear();
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="relative group"
    >
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl">
          {/* Poster Image */}
          <div className="relative aspect-[2/3] overflow-hidden">
            <img
              src={buildImageUrl(movie.poster_path, 'medium', 'poster') || '/placeholder-poster.jpg'}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Overlay with rating */}
            <div className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full px-2 py-1 flex items-center space-x-1">
              <span className="text-yellow-400 text-xs">⭐</span>
              <span className="text-white text-xs font-medium">{formatRating(movie.vote_average)}</span>
            </div>

            {/* Watchlist Button */}
            <motion.button
              onClick={handleWatchlistClick}
              className={`absolute top-2 left-2 p-2 rounded-full transition-all duration-300 ${
                isInList 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-black bg-opacity-50 text-gray-300 hover:bg-blue-500 hover:text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={isInList ? 'Remove from watchlist' : 'Add to watchlist'}
            >
              {isInList ? '❤️' : '🤍'}
            </motion.button>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <motion.div
                className="text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
              >
                View Details
              </motion.div>
            </div>
          </div>

          {/* Movie Info */}
          <div className="p-4">
            <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 leading-tight">
              {movie.title}
            </h3>
            
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{formatDate(movie.release_date)}</span>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400">⭐</span>
                <span>{formatRating(movie.vote_average)}</span>
              </div>
            </div>

            {/* Genres (if available) */}
            {movie.genre_ids && movie.genre_ids.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {movie.genre_ids.slice(0, 2).map((genreId) => (
                  <span key={genreId} className="bg-gray-700 text-xs px-2 py-1 rounded text-gray-300">
                    Genre {genreId}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard; 