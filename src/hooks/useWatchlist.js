import { useState, useEffect, useCallback } from 'react';

const WATCHLIST_KEY = 'movieverse_watchlist';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWatchlist = localStorage.getItem(WATCHLIST_KEY);
      if (savedWatchlist) {
        setWatchlist(JSON.parse(savedWatchlist));
      }
    } catch (error) {
      console.error('Error loading watchlist from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
      } catch (error) {
        console.error('Error saving watchlist to localStorage:', error);
      }
    }
  }, [watchlist, isLoading]);

  // Add movie to watchlist
  const addToWatchlist = useCallback((movie) => {
    setWatchlist(prev => {
      // Avoid duplicates
      if (prev.some(item => item.id === movie.id)) {
        return prev;
      }
      
      const movieToAdd = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        genre_ids: movie.genre_ids || movie.genres?.map(g => g.id) || [],
        overview: movie.overview,
        addedAt: new Date().toISOString(),
      };
      
      return [movieToAdd, ...prev];
    });
  }, []);

  // Remove movie from watchlist
  const removeFromWatchlist = useCallback((movieId) => {
    setWatchlist(prev => prev.filter(movie => movie.id !== movieId));
  }, []);

  // Toggle movie in watchlist
  const toggleWatchlist = useCallback((movie) => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  }, [addToWatchlist, removeFromWatchlist]);

  // Check if movie is in watchlist
  const isInWatchlist = useCallback((movieId) => {
    return watchlist.some(movie => movie.id === movieId);
  }, [watchlist]);

  // Clear entire watchlist
  const clearWatchlist = useCallback(() => {
    setWatchlist([]);
  }, []);

  // Get watchlist count
  const watchlistCount = watchlist.length;

  // Sort watchlist by different criteria
  const getSortedWatchlist = useCallback((sortBy = 'addedAt') => {
    const sorted = [...watchlist];
    
    switch (sortBy) {
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'release_date':
        return sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
      case 'vote_average':
        return sorted.sort((a, b) => b.vote_average - a.vote_average);
      case 'addedAt':
      default:
        return sorted.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
    }
  }, [watchlist]);

  return {
    watchlist,
    isLoading,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    isInWatchlist,
    clearWatchlist,
    watchlistCount,
    getSortedWatchlist,
  };
}; 