import { MOVIES, USERS, RATINGS } from '../data/mockData';

export default function Home() {
  return (
    <div>
      <h2>Welcome to the Movie Rating Tracker</h2>
      <p>{MOVIES.length} movies | {RATINGS.length} ratings | {USERS.length} users</p>
    </div>
  );
}