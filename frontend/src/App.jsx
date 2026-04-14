import { useState } from 'react';
import Home from './pages/Home';
import MoviesPage from './pages/MoviesPage';
import RatingsPage from './pages/RatingsPage';
import WatchlistPage from './pages/WatchlistPage';
import ReportsPage from './pages/ReportsPage';
import ViewsPage from './pages/ViewsPage';

const USERS = [
  { uid: 123, username: 'YujiItadori' },
  { uid: 182, username: 'CarrieBradshaw123' },
  { uid: 293, username: 'TheRealGumballWaterson' },
  { uid: 567, username: 'Mordecai&Rigbi' },
  { uid: 734, username: 'JonSnow' },
];

function App() {
  const [page, setPage] = useState('home');
  const [uid, setUid] = useState(123);

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Movie Rating Tracker</h1>
        <div className="flex items-center gap-4"></div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-500">Viewing as:</span>
          <select
            value={uid}
            onChange={(e) => setUid(Number(e.target.value))}
            className="text-sm border border-gray-300 rounded-md px-2 py-1"   
          >
            {USERS.map((u) => (
              <option key={u.uid} value={u.uid}>{u.username}</option>
            ))}
          </select>
        </div>
        
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
        {page === 'movies' && <MoviesPage uid={uid}/>}
        {page === 'ratings' && <RatingsPage uid={uid}/>}
        {page === 'watchlist' && <WatchlistPage uid={uid}/>}
        {page === 'reports' && <ReportsPage />}
        {page === 'views' && <ViewsPage />}
      </div>
    </div>
  );
}

export default App;