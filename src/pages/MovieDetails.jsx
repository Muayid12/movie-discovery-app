import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMovieDetails, useMovieRecommendations } from '../hooks/useMovieApi';
import { useWatchlist } from '../hooks/useWatchlist';
import { buildImageUrl } from '../services/tmdbApi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import MovieGrid from '../components/common/MovieGrid';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const { data: movie, isLoading, error } = useMovieDetails(id);
  const { data: recommendations } = useMovieRecommendations(id);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="xlarge" />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <div className="text-white text-xl mb-2">Movie not found</div>
          <div className="text-gray-400 mb-4">The movie you're looking for doesn't exist or has been removed.</div>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getTrailer = () => {
    if (!movie.videos?.results) return null;
    return movie.videos.results.find(
      video => video.type === 'Trailer' && video.site === 'YouTube'
    ) || movie.videos.results[0];
  };

  const getDirector = () => {
    if (!movie.credits?.crew) return 'N/A';
    const director = movie.credits.crew.find(person => person.job === 'Director');
    return director ? director.name : 'N/A';
  };

  const isInList = isInWatchlist(movie.id);
  const trailer = getTrailer();

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'cast', name: 'Cast & Crew' },
    { id: 'videos', name: 'Videos' },
    { id: 'details', name: 'Details' },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative">
        {/* Backdrop Image */}
        <div className="absolute inset-0">
          <img
            src={buildImageUrl(movie.backdrop_path, 'xlarge', 'backdrop')}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-gray-900/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          <motion.div
            className="flex flex-col lg:flex-row gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Poster */}
            <div className="flex-shrink-0">
              <motion.img
                src={buildImageUrl(movie.poster_path, 'large', 'poster')}
                alt={movie.title}
                className="w-64 md:w-80 rounded-lg shadow-2xl mx-auto lg:mx-0"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </div>

            {/* Movie Info */}
            <div className="flex-1 text-white">
              <motion.h1
                className="text-3xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {movie.title}
                {movie.release_date && (
                  <span className="text-gray-400 font-normal text-2xl md:text-3xl ml-2">
                    ({new Date(movie.release_date).getFullYear()})
                  </span>
                )}
              </motion.h1>

              {/* Rating and Meta */}
              <motion.div
                className="flex flex-wrap items-center gap-4 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center space-x-1 bg-yellow-500 text-black px-3 py-1 rounded-full">
                  <span>⭐</span>
                  <span className="font-bold">{movie.vote_average?.toFixed(1)}</span>
                  <span className="text-sm">({movie.vote_count} votes)</span>
                </div>
                <span className="text-gray-300">{formatRuntime(movie.runtime)}</span>
                <span className="text-gray-300">
                  {movie.genres?.map(g => g.name).join(', ')}
                </span>
              </motion.div>

              {/* Tagline */}
              {movie.tagline && (
                <motion.p
                  className="text-xl italic text-gray-300 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  "{movie.tagline}"
                </motion.p>
              )}

              {/* Overview */}
              <motion.p
                className="text-gray-300 text-lg leading-relaxed mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {movie.overview}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <button
                  onClick={() => toggleWatchlist(movie)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isInList
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  <span>{isInList ? '❤️' : '🤍'}</span>
                  <span>{isInList ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
                </button>

                {trailer && (
                  <button
                    onClick={() => setSelectedVideo(trailer)}
                    className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <span>▶️</span>
                    <span>Watch Trailer</span>
                  </button>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="text-white">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Story</h3>
                  <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Quick Info</h3>
                  <div className="space-y-2 text-gray-300">
                    <div><strong>Director:</strong> {getDirector()}</div>
                    <div><strong>Release Date:</strong> {movie.release_date}</div>
                    <div><strong>Runtime:</strong> {formatRuntime(movie.runtime)}</div>
                    <div><strong>Budget:</strong> {formatCurrency(movie.budget)}</div>
                    <div><strong>Revenue:</strong> {formatCurrency(movie.revenue)}</div>
                    <div><strong>Status:</strong> {movie.status}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cast' && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Cast</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {movie.credits?.cast?.slice(0, 12).map((person) => (
                  <div key={person.id} className="text-center">
                    <img
                      src={buildImageUrl(person.profile_path, 'medium', 'profile') || '/placeholder-person.jpg'}
                      alt={person.name}
                      className="w-full aspect-[2/3] object-cover rounded-lg mb-2"
                    />
                    <div className="text-white font-medium text-sm">{person.name}</div>
                    <div className="text-gray-400 text-xs">{person.character}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'videos' && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Videos</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {movie.videos?.results?.slice(0, 6).map((video) => (
                  <div
                    key={video.id}
                    className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="aspect-video bg-gray-700 flex items-center justify-center">
                      <span className="text-white text-4xl">▶️</span>
                    </div>
                    <div className="p-4">
                      <div className="text-white font-medium">{video.name}</div>
                      <div className="text-gray-400 text-sm">{video.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="text-white">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Production Details</h3>
                  <div className="space-y-3">
                    <div><strong>Original Title:</strong> {movie.original_title}</div>
                    <div><strong>Original Language:</strong> {movie.original_language?.toUpperCase()}</div>
                    <div><strong>Status:</strong> {movie.status}</div>
                    <div><strong>Budget:</strong> {formatCurrency(movie.budget)}</div>
                    <div><strong>Revenue:</strong> {formatCurrency(movie.revenue)}</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres?.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Recommendations */}
      {recommendations?.results?.length > 0 && (
        <div className="container mx-auto px-4 pb-8">
          <MovieGrid
            title="More Like This"
            movies={recommendations.results.slice(0, 12)}
            showTitle={true}
          />
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            className="relative w-full max-w-4xl aspect-video"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
            >
              ✕
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1`}
              title={selectedVideo.name}
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MovieDetails; 