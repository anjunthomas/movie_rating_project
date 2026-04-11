import { useState } from 'react';

import Home from './pages/Home';
import MoviesPage from './pages/MoviesPage';
import RatingsPage from './pages/RatingsPage';
import WatchlistPage from './pages/WatchlistPage';
import ReportsPage from './pages/ReportsPage';
import ViewsPage from './pages/ViewsPage';

function App() {
  const [page, setPage] = useState('home');

  return (
    <div>
      <h1>Movie Rating Tracker</h1>

      <nav style={{ marginBottom: '20px' }}>
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={() => setPage('movies')}>Movies</button>
        <button onClick={() => setPage('ratings')}>Ratings</button>
        <button onClick={() => setPage('watchlist')}>Watchlist</button>
        <button onClick={() => setPage('reports')}>Reports</button>
        <button onClick={() => setPage('views')}>Views</button>
      </nav>

      {page === 'home' && <Home />}
      {page === 'movies' && <MoviesPage />}
      {page === 'ratings' && <RatingsPage />}
      {page === 'watchlist' && <WatchlistPage />}
      {page === 'reports' && <ReportsPage />}
      {page === 'views' && <ViewsPage />}
    </div>
  );
}

export default App;