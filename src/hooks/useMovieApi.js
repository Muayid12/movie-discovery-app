import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { movieApi } from '../services/tmdbApi';

// Query keys for consistent caching
export const QUERY_KEYS = {
  trending: 'trending',
  topRated: 'topRated',
  popular: 'popular',
  nowPlaying: 'nowPlaying',
  upcoming: 'upcoming',
  movieDetails: 'movieDetails',
  movieCredits: 'movieCredits',
  movieVideos: 'movieVideos',
  movieRecommendations: 'movieRecommendations',
  searchMovies: 'searchMovies',
  genres: 'genres',
  moviesByGenre: 'moviesByGenre',
};

// Hook for trending movies
export const useTrendingMovies = (page = 1) => {
  return useQuery({
    queryKey: [QUERY_KEYS.trending, page],
    queryFn: () => movieApi.getTrending(page),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for top rated movies
export const useTopRatedMovies = (page = 1) => {
  return useQuery({
    queryKey: [QUERY_KEYS.topRated, page],
    queryFn: () => movieApi.getTopRated(page),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook for popular movies
export const usePopularMovies = (page = 1) => {
  return useQuery({
    queryKey: [QUERY_KEYS.popular, page],
    queryFn: () => movieApi.getPopular(page),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook for now playing movies
export const useNowPlayingMovies = (page = 1) => {
  return useQuery({
    queryKey: [QUERY_KEYS.nowPlaying, page],
    queryFn: () => movieApi.getNowPlaying(page),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook for movie details
export const useMovieDetails = (movieId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.movieDetails, movieId],
    queryFn: () => movieApi.getMovieDetails(movieId),
    select: (data) => data.data,
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000, // 10 minutes for details
  });
};

// Hook for movie recommendations
export const useMovieRecommendations = (movieId, page = 1) => {
  return useQuery({
    queryKey: [QUERY_KEYS.movieRecommendations, movieId, page],
    queryFn: () => movieApi.getMovieRecommendations(movieId, page),
    select: (data) => data.data,
    enabled: !!movieId,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook for searching movies
export const useSearchMovies = (query, page = 1) => {
  return useQuery({
    queryKey: [QUERY_KEYS.searchMovies, query, page],
    queryFn: () => movieApi.searchMovies(query, page),
    select: (data) => data.data,
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  });
};

// Hook for genres
export const useGenres = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.genres],
    queryFn: () => movieApi.getGenres(),
    select: (data) => data.data.genres,
    staleTime: 60 * 60 * 1000, // 1 hour - genres don't change often
  });
};

// Hook for movies by genre
export const useMoviesByGenre = (genreId, page = 1, sortBy = 'popularity.desc') => {
  return useQuery({
    queryKey: [QUERY_KEYS.moviesByGenre, genreId, page, sortBy],
    queryFn: () => movieApi.getMoviesByGenre(genreId, page, sortBy),
    select: (data) => data.data,
    enabled: !!genreId,
    staleTime: 5 * 60 * 1000,
  });
};

// Infinite scroll hook for trending movies
export const useInfiniteTrendingMovies = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.trending, 'infinite'],
    queryFn: ({ pageParam = 1 }) => movieApi.getTrending(pageParam),
    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage.data;
      return page < total_pages ? page + 1 : undefined;
    },
    select: (data) => ({
      pages: data.pages.map(page => page.data),
      pageParams: data.pageParams,
    }),
    staleTime: 5 * 60 * 1000,
  });
};

// Infinite scroll hook for search results
export const useInfiniteSearchMovies = (query) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.searchMovies, query, 'infinite'],
    queryFn: ({ pageParam = 1 }) => movieApi.searchMovies(query, pageParam),
    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage.data;
      return page < total_pages ? page + 1 : undefined;
    },
    enabled: !!query && query.length > 2,
    select: (data) => ({
      pages: data.pages.map(page => page.data),
      pageParams: data.pageParams,
    }),
    staleTime: 2 * 60 * 1000,
  });
};

// Infinite scroll hook for movies by genre
export const useInfiniteMoviesByGenre = (genreId, sortBy = 'popularity.desc') => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.moviesByGenre, genreId, 'infinite', sortBy],
    queryFn: ({ pageParam = 1 }) => movieApi.getMoviesByGenre(genreId, pageParam, sortBy),
    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage.data;
      return page < total_pages ? page + 1 : undefined;
    },
    enabled: !!genreId,
    select: (data) => ({
      pages: data.pages.map(page => page.data),
      pageParams: data.pageParams,
    }),
    staleTime: 5 * 60 * 1000,
  });
}; 