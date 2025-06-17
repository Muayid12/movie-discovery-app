// TMDB API Configuration
export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  // Replace with your actual TMDB API key
  API_KEY: process.env.REACT_APP_TMDB_API_KEY || 'your_api_key_here',
};

// Validate API key
export const validateApiKey = () => {
  if (!TMDB_CONFIG.API_KEY || TMDB_CONFIG.API_KEY === 'your_api_key_here') {
    console.error('❌ TMDB API Key is missing!');
    console.log('📝 To fix this:');
    console.log('1. Create a .env file in your project root');
    console.log('2. Add: REACT_APP_TMDB_API_KEY=your_actual_key');
    console.log('3. Get your key from: https://www.themoviedb.org/settings/api');
    console.log('4. Restart your development server');
    return false;
  }
  console.log('✅ TMDB API Key is configured');
  return true;
};

export const IMAGE_SIZES = {
  poster: {
    small: 'w154',
    medium: 'w342',
    large: 'w500',
    xlarge: 'w780',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    xlarge: 'original',
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'h632',
  },
};

export const API_ENDPOINTS = {
  // Movies
  trending: '/trending/movie/week',
  topRated: '/movie/top_rated',
  popular: '/movie/popular',
  nowPlaying: '/movie/now_playing',
  upcoming: '/movie/upcoming',
  movieDetails: (id) => `/movie/${id}`,
  movieCredits: (id) => `/movie/${id}/credits`,
  movieVideos: (id) => `/movie/${id}/videos`,
  movieRecommendations: (id) => `/movie/${id}/recommendations`,
  
  // Search
  searchMovies: '/search/movie',
  
  // Genres
  genres: '/genre/movie/list',
  moviesByGenre: '/discover/movie',
}; 