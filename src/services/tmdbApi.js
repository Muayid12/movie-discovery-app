import axios from 'axios';
import { TMDB_CONFIG, API_ENDPOINTS, validateApiKey } from '../config/api';

// Validate API key on import
validateApiKey();

// Create axios instance with base configuration
const tmdbApi = axios.create({
  baseURL: TMDB_CONFIG.BASE_URL,
  params: {
    api_key: TMDB_CONFIG.API_KEY,
  },
});

// Add response interceptor for better error handling
tmdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('🚫 TMDB API Authentication Error');
      console.log('Your API key is invalid or missing. Please check:');
      console.log('1. Make sure you have a .env file with REACT_APP_TMDB_API_KEY');
      console.log('2. Verify your API key is correct');
      console.log('3. Restart your development server after adding the key');
      
      // Create a more user-friendly error message
      const friendlyError = new Error('TMDB API key is missing or invalid. Please check your .env file and restart the server.');
      friendlyError.originalError = error;
      throw friendlyError;
    }
    return Promise.reject(error);
  }
);

// API service functions
export const movieApi = {
  // Get trending movies
  getTrending: (page = 1) =>
    tmdbApi.get(API_ENDPOINTS.trending, { params: { page } }),

  // Get top rated movies
  getTopRated: (page = 1) =>
    tmdbApi.get(API_ENDPOINTS.topRated, { params: { page } }),

  // Get popular movies
  getPopular: (page = 1) =>
    tmdbApi.get(API_ENDPOINTS.popular, { params: { page } }),

  // Get now playing movies
  getNowPlaying: (page = 1) =>
    tmdbApi.get(API_ENDPOINTS.nowPlaying, { params: { page } }),

  // Get upcoming movies
  getUpcoming: (page = 1) =>
    tmdbApi.get(API_ENDPOINTS.upcoming, { params: { page } }),

  // Get movie details
  getMovieDetails: (movieId) =>
    tmdbApi.get(API_ENDPOINTS.movieDetails(movieId), {
      params: { append_to_response: 'videos,credits' }
    }),

  // Get movie credits
  getMovieCredits: (movieId) =>
    tmdbApi.get(API_ENDPOINTS.movieCredits(movieId)),

  // Get movie videos
  getMovieVideos: (movieId) =>
    tmdbApi.get(API_ENDPOINTS.movieVideos(movieId)),

  // Get movie recommendations
  getMovieRecommendations: (movieId, page = 1) =>
    tmdbApi.get(API_ENDPOINTS.movieRecommendations(movieId), { params: { page } }),

  // Search movies
  searchMovies: (query, page = 1) =>
    tmdbApi.get(API_ENDPOINTS.searchMovies, { params: { query, page } }),

  // Get genres
  getGenres: () =>
    tmdbApi.get(API_ENDPOINTS.genres),

  // Get movies by genre
  getMoviesByGenre: (genreId, page = 1, sortBy = 'popularity.desc') =>
    tmdbApi.get(API_ENDPOINTS.moviesByGenre, {
      params: { with_genres: genreId, page, sort_by: sortBy }
    }),

  // Discover movies with filters
  discoverMovies: (filters = {}, page = 1) =>
    tmdbApi.get(API_ENDPOINTS.moviesByGenre, {
      params: { ...filters, page }
    }),
};

// Helper function to build image URLs
export const buildImageUrl = (path, size = 'medium', type = 'poster') => {
  if (!path) return null;
  
  const sizeMap = {
    poster: { small: 'w154', medium: 'w342', large: 'w500', xlarge: 'w780' },
    backdrop: { small: 'w300', medium: 'w780', large: 'w1280', xlarge: 'original' },
    profile: { small: 'w45', medium: 'w185', large: 'h632' },
  };
  
  const imageSize = sizeMap[type][size] || sizeMap[type].medium;
  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${imageSize}${path}`;
};

export default movieApi; 