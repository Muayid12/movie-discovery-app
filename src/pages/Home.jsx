import React from 'react';
import { motion } from 'framer-motion';
import { useTrendingMovies, usePopularMovies, useTopRatedMovies } from '../hooks/useMovieApi';
import MovieGrid from '../components/common/MovieGrid';
import Hero from '../components/home/Hero';

const Home = () => {
  const { data: trending, isLoading: trendingLoading, error: trendingError } = useTrendingMovies();
  const { data: popular, isLoading: popularLoading, error: popularError } = usePopularMovies();
  const { data: topRated, isLoading: topRatedLoading, error: topRatedError } = useTopRatedMovies();

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <Hero />

      {/* Movie Sections */}
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Trending Movies */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MovieGrid
            title="🔥 Trending This Week"
            movies={trending?.results?.slice(0, 12)}
            isLoading={trendingLoading}
            error={trendingError}
            showTitle={true}
          />
        </motion.section>

        {/* Popular Movies */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MovieGrid
            title="🌟 Popular Movies"
            movies={popular?.results?.slice(0, 12)}
            isLoading={popularLoading}
            error={popularError}
            showTitle={true}
          />
        </motion.section>

        {/* Top Rated Movies */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <MovieGrid
            title="🏆 Top Rated Movies"
            movies={topRated?.results?.slice(0, 12)}
            isLoading={topRatedLoading}
            error={topRatedError}
            showTitle={true}
          />
        </motion.section>
      </div>
    </div>
  );
};

export default Home; 