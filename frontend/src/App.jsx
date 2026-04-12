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
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Movie Rating Tracker</h1>
        <nav className="flex gap-1">
          {['home', 'movies', 'ratings', 'watchlist', 'reports', 'views'].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1.5 rounded text-sm ${
                page === p
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      <div className="px-6 py-6">
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