import { MOVIES, USERS, RATINGS, WATCHLIST } from '../data/mockData';
import ResultTable from '../components/ResultTable';

export default function WatchlistPage() {
  const data = WATCHLIST.map((w) => {
    const user = USERS.find((u) => u.uid === w.uid);
    const movie = MOVIES.find((m) => m.mid === w.mid);
    const rs = RATINGS.filter((r) => r.mid === w.mid);
    const avg = rs.length
      ? (rs.reduce((sum, r) => sum + r.rating, 0) / rs.length).toFixed(1)
      : '—';
    return {
      uid: w.uid,
      username: user ? user.username : w.uid,
      movie_title: movie ? movie.movie_title : w.mid,
      avg_rating: avg,
    };
  });

  return (
    <div>
      <h2>Watchlist</h2>
      <ResultTable
        columns={['uid', 'username', 'movie_title', 'avg_rating']}
        data={data}
      />
    </div>
  );
}