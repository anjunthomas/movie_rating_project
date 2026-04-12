import { MOVIES, RATINGS } from '../data/mockData';
import ResultTable from '../components/ResultTable';

export default function ReportsPage() {
  const data = MOVIES.map((m) => {
    const rs = RATINGS.filter((r) => r.mid === m.mid);
    const avg = rs.length
      ? (rs.reduce((sum, r) => sum + r.rating, 0) / rs.length).toFixed(1)
      : null;
    return { movie_title: m.movie_title, num_ratings: rs.length, avg_rating: avg };
  }).filter((m) => m.num_ratings > 0)
    .sort((a, b) => b.avg_rating - a.avg_rating);

  return (
    <div>
      <h2>Average Rating by Movie</h2>
      <ResultTable
        columns={['movie_title', 'num_ratings', 'avg_rating']}
        data={data}
      />
    </div>
  );
}