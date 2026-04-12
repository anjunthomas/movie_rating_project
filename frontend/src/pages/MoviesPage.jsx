import { useState } from 'react';
import { MOVIES } from '../data/mockData';
import ResultTable from '../components/ResultTable';

export default function MoviesPage() {
  const [title, setTitle] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const filtered = MOVIES.filter((m) =>
      m.movie_title.toLowerCase().includes(title.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div>
      <h2>Movies</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Search by title"
      />
      <button className="search-btn" onClick={handleSearch}>Search</button>
      <ResultTable
        columns={['mid', 'movie_title', 'release_dt', 'og_language']}
        data={results}
      />
    </div>
  );
}