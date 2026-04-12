import { MOVIES, USERS, RATINGS } from '../data/mockData';
import ResultTable from '../components/ResultTable';

export default function RatingsPage() {
  const data = RATINGS.map((r) => {
    const user = USERS.find((u) => u.uid === r.uid);
    const movie = MOVIES.find((m) => m.mid === r.mid);
    return {
      uid: r.uid,
      username: user ? user.username : r.uid,
      movie_title: movie ? movie.movie_title : r.mid,
      rating: r.rating + ' / 10',
    };
  });

  return (
    <div>
      <h2>Ratings</h2>
      <ResultTable
        columns={['uid', 'username', 'movie_title', 'rating']}
        data={data}
      />
    </div>
  );
}