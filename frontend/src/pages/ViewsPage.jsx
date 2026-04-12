import { USERS, RATINGS } from '../data/mockData';
import ResultTable from '../components/ResultTable';

export default function ViewsPage() {
  const data = USERS.map((u) => {
    const rs = RATINGS.filter((r) => r.uid === u.uid);
    const avg = rs.length
      ? (rs.reduce((sum, r) => sum + r.rating, 0) / rs.length).toFixed(1)
      : '—';
    return { username: u.username, num_rated: rs.length, avg_rating: avg };
  });

  return (
    <div>
      <h2>User Rating Summary</h2>
      <ResultTable
        columns={['username', 'num_rated', 'avg_rating']}
        data={data}
      />
    </div>
  );
}
