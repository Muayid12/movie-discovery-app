import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useGenres, useInfiniteMoviesByGenre } from '../hooks/useMovieApi';
import MovieCard from '../components/common/MovieCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const GenresPage = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortBy, setSortBy] = useState('popularity.desc');
  
  const { data: genres, isLoading: genresLoading } = useGenres();
  const {
    data: moviesData,
    isLoading: moviesLoading,
    error: moviesError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteMoviesByGenre(selectedGenre?.id, sortBy);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      selectedGenre &&
      window.innerHeight + document.documentElement.scrollTop
      >= document.documentElement.offsetHeight - 1000
      && hasNextPage && !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [selectedGenre, fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const sortOptions = [
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'vote_average.desc', label: 'Highest Rated' },
    { value: 'release_date.desc', label: 'Newest First' },
    { value: 'release_date.asc', label: 'Oldest First' },
  ];

  const allMovies = moviesData?.pages.flatMap(page => page.results) || [];

  if (genresLoading) {
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
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            🎭 Browse by Genre
          </h1>
          <p className="text-gray-400">
            Discover movies by your favorite genres
          </p>
        </motion.div>

        {/* Genre Selection */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {genres?.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedGenre?.id === genre.id
                    ? 'bg-blue-500 text-white scale-105'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          {selectedGenre && (
            <div className="flex items-center space-x-4">
              <label className="text-white font-medium">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </motion.div>

        {/* Content */}
        {!selectedGenre ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">🎭</div>
            <div className="text-white text-xl mb-2">Select a Genre</div>
            <div className="text-gray-400">
              Choose a genre above to discover movies in that category
            </div>
          </motion.div>
        ) : moviesLoading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="xlarge" />
          </div>
        ) : moviesError ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚠️</div>
            <div className="text-white text-xl mb-2">Error Loading Movies</div>
            <div className="text-gray-400">{moviesError.message}</div>
          </div>
        ) : allMovies.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <div className="text-white text-xl mb-2">No Movies Found</div>
            <div className="text-gray-400">
              No movies found for this genre
            </div>
          </div>
        ) : (
          <>
            {/* Movies Grid */}
            <motion.div
              key={selectedGenre.id}
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                {selectedGenre.name} Movies
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {allMovies.map((movie, index) => (
                  <MovieCard key={`${movie.id}-${index}`} movie={movie} index={index % 12} />
                ))}
              </div>
            </motion.div>

            {/* Loading more indicator */}
            {isFetchingNextPage && (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="large" />
              </div>
            )}

            {/* End of results */}
            {!hasNextPage && allMovies.length > 0 && (
              <div className="text-center py-8">
                <div className="text-gray-400">
                  You've reached the end of {selectedGenre.name} movies
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GenresPage; 