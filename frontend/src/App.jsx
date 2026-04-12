import { useState } from 'react';
import Home from './pages/Home';
import MoviesPage from './pages/MoviesPage';
import RatingsPage from './pages/RatingsPage';
import WatchlistPage from './pages/WatchlistPage';
import ReportsPage from './pages/ReportsPage';
import ViewsPage from './pages/ViewsPage';
import './styles/App.css';

function App() {
  const [page, setPage] = useState('home');

  return (
    <div>
      <h1>Movie Rating Tracker</h1>

      <nav>
        {['home', 'movies', 'ratings', 'watchlist', 'reports', 'views'].map((p) => (
          <button
            key={p}
            className={page === p ? 'active' : ''}
            onClick={() => setPage(p)}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </nav>

      <div className="page-content">
        {page === 'home' && <Home />}
        {page === 'movies' && <MoviesPage />}
        {page === 'ratings' && <RatingsPage />}
        {page === 'watchlist' && <WatchlistPage />}
        {page === 'reports' && <ReportsPage />}
        {page === 'views' && <ViewsPage />}
      </div>
    </div>
  );
}

export default App;