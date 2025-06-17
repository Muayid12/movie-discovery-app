# MovieVerse - Movie Discovery App

A modern movie discovery web application built with React. Search for movies, view detailed information, and manage your personal watchlist.

## Features

- Search through thousands of movies
- View detailed movie information including cast, trailers, and ratings
- Browse movies by genre
- Discover trending and top-rated movies
- Personal watchlist with local storage
- Responsive design for all devices
- Smooth animations and modern UI

## Demo

Visit the live demo: [Your Demo Link Here]

## Technologies Used

- React 18
- React Router
- Tailwind CSS
- Framer Motion
- React Query
- Axios
- TMDB API

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- TMDB API key (free)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Muayid12/movie-discovery-app.git
   cd movie-discovery-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get your TMDB API key**
   - Go to [TMDB website](https://www.themoviedb.org/)
   - Create a free account
   - Go to Settings → API
   - Request an API key (instant approval)

4. **Set up environment variables**
   - Copy `env.example` to `.env`
   - Replace `your_tmdb_api_key_here` with your actual API key
   ```env
   REACT_APP_TMDB_API_KEY=your_actual_api_key_here
   ```

5. **Start the application**
   ```bash
   npm start
   ```
   
   The app will open at `http://localhost:3000`

## Usage

### Home Page
- View trending movies of the week
- Browse popular and top-rated movies
- Use the search bar to find specific movies

### Movie Details
- Click any movie to see detailed information
- Watch trailers and view cast information
- Add movies to your watchlist

### Browse by Genre
- Navigate to the Genres page
- Select any genre to see related movies
- Sort movies by popularity, rating, or release date

### Watchlist
- Add movies to your personal watchlist
- Sort your watchlist by different criteria
- Remove movies you've watched

## Available Scripts

- `npm start` - Run the development server
- `npm build` - Build for production
- `npm test` - Run tests

## Configuration

The app uses environment variables for configuration:

- `REACT_APP_TMDB_API_KEY` - Your TMDB API key (required)

## Deployment

To deploy the application:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your hosting service (Vercel, Netlify, etc.)

3. Set your environment variables in your hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## API Credits

This product uses the TMDB API but is not endorsed or certified by TMDB. 