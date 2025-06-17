import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTrendingMovies } from '../../hooks/useMovieApi';
import { buildImageUrl } from '../../services/tmdbApi';
import { useWatchlist } from '../../hooks/useWatchlist';

const Hero = () => {
  const { data: trending } = useTrendingMovies();
  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const [featuredMovie, setFeaturedMovie] = useState(null);

  useEffect(() => {
    if (trending?.results?.length > 0) {
      // Get a random movie from the first 5 trending movies
      const randomIndex = Math.floor(Math.random() * Math.min(5, trending.results.length));
      setFeaturedMovie(trending.results[randomIndex]);
    }
  }, [trending]);

  if (!featuredMovie) {
    return (
      <div className="relative h-96 bg-gradient-to-r from-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">🎬 MovieVerse</h1>
          <p className="text-xl text-gray-300">Discover your next favorite movie</p>
        </div>
      </div>
    );
  }

  const isInList = isInWatchlist(featuredMovie.id);

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={buildImageUrl(featuredMovie.backdrop_path, 'xlarge', 'backdrop')}
          alt={featuredMovie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <motion.div
          className="max-w-2xl text-white"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {featuredMovie.title}
          </motion.h1>

          <motion.div
            className="flex items-center space-x-4 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <div className="flex items-center space-x-1 bg-yellow-500 text-black px-3 py-1 rounded-full">
              <span>⭐</span>
              <span className="font-bold">{featuredMovie.vote_average?.toFixed(1)}</span>
            </div>
            <span className="text-gray-300">
              {featuredMovie.release_date ? new Date(featuredMovie.release_date).getFullYear() : 'TBA'}
            </span>
          </motion.div>

          <motion.p
            className="text-lg text-gray-300 mb-8 leading-relaxed line-clamp-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            {featuredMovie.overview}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <Link
              to={`/movie/${featuredMovie.id}`}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 transform hover:scale-105"
            >
              <span>▶️</span>
              <span>Watch Now</span>
            </Link>

            <button
              onClick={() => toggleWatchlist(featuredMovie)}
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 ${
                isInList
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              <span>{isInList ? '❤️' : '🤍'}</span>
              <span>{isInList ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero; 