# 🎬 MovieVerse - Movie Discovery Web App

A modern, responsive movie discovery application built with React, featuring movie search, detailed information, watchlist management, and smooth animations. Powered by The Movie Database (TMDB) API.

## ✨ Features

- **🔍 Movie Search** - Search through thousands of movies with real-time results
- **🎥 Movie Details** - Comprehensive movie information including posters, trailers, cast, and crew
- **📋 Watchlist Management** - Add/remove movies to your personal watchlist with localStorage persistence
- **🎭 Genre Filtering** - Browse movies by genre with infinite scroll
- **🔥 Trending & Top Rated** - Discover what's popular and highly rated
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **⚡ Smooth Animations** - Beautiful transitions and animations with Framer Motion
- **🚀 Performance Optimized** - React Query for caching and state management

## 🛠️ Tech Stack

- **React 18** - UI library with hooks and modern features
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Query (TanStack Query)** - Data fetching and caching
- **Axios** - HTTP client for API calls
- **TMDB API** - Movie data source

## 📁 Project Structure

```
movieverse/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── MovieCard.jsx
│   │   │   ├── MovieGrid.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   └── home/
│   │       └── Hero.jsx
│   ├── hooks/
│   │   ├── useMovieApi.js
│   │   └── useWatchlist.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── MovieDetails.jsx
│   │   ├── SearchResults.jsx
│   │   ├── TrendingPage.jsx
│   │   ├── TopRatedPage.jsx
│   │   ├── GenresPage.jsx
│   │   └── Watchlist.jsx
│   ├── services/
│   │   └── tmdbApi.js
│   ├── config/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── env.example
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDB API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/movieverse.git
   cd movieverse
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your TMDB API key:
   ```env
   REACT_APP_TMDB_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Getting TMDB API Key

1. Go to [TMDB website](https://www.themoviedb.org/)
2. Create an account or log in
3. Go to Settings > API
4. Follow the instructions to get your API key
5. Add the key to your `.env` file

## 🎯 Key Components

### Custom Hooks

- **`useMovieApi`** - React Query hooks for all TMDB API calls with caching
- **`useWatchlist`** - LocalStorage-based watchlist management

### Pages

- **`Home`** - Landing page with trending, popular, and top-rated movies
- **`MovieDetails`** - Comprehensive movie information with tabs and trailers
- **`SearchResults`** - Search results with infinite scroll
- **`Watchlist`** - Personal watchlist with sorting options
- **`TrendingPage`** - Full trending movies list with infinite scroll
- **`TopRatedPage`** - Top-rated movies with pagination
- **`GenresPage`** - Genre-based movie browsing

### Reusable Components

- **`MovieCard`** - Individual movie card with poster, rating, and watchlist button
- **`MovieGrid`** - Responsive grid layout for movies
- **`Header`** - Navigation with search and mobile-responsive menu
- **`LoadingSpinner`** - Animated loading indicator

## 🎨 Animations & UX

- Smooth page transitions with Framer Motion
- Staggered movie card animations
- Hover effects and micro-interactions
- Loading states and error handling
- Infinite scroll for seamless browsing
- Mobile-first responsive design

## 📊 Performance Features

- **React Query Caching** - Intelligent data caching and synchronization
- **Image Lazy Loading** - Optimized image loading
- **Code Splitting** - Automatic code splitting with React Router
- **Debounced Search** - Efficient search with debouncing
- **Infinite Scroll** - Memory-efficient pagination

## 🎭 API Integration

The app integrates with TMDB API for:
- Movie search and discovery
- Detailed movie information
- Cast and crew data
- Movie trailers and videos
- Genre information
- Trending and popular movies

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Support** - Excellent tablet experience
- **Desktop Enhanced** - Rich desktop interface
- **Touch Friendly** - Touch-optimized interactions

## 🔧 Customization

### Adding New Movie Categories

1. Add new API endpoint in `src/config/api.js`
2. Create API function in `src/services/tmdbApi.js`
3. Add React Query hook in `src/hooks/useMovieApi.js`
4. Create new page component

### Styling Customization

- Edit `tailwind.config.js` for theme customization
- Modify animations in Framer Motion components
- Update color schemes in Tailwind classes

## 🚀 Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag and drop the `build` folder to Netlify
3. Set environment variables in Netlify dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the movie data
- [React](https://reactjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

## 📞 Support

If you have any questions or need help, please open an issue or contact [your-email@example.com](mailto:your-email@example.com).

---

**Built with ❤️ by [Your Name]** 