export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"
      style={{ background: '#1a1a1a' }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');`}</style>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', lineHeight: '1.2', fontWeight: 700, color: '#fff', margin: '0 0 32px' }}>
        Browse movies you'd like to watch.<br />
        Rate movies you've seen and save new movies to your watchlist.<br />
        Explore ratings by country, by user, and overall.
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#aaa', maxWidth: '420px' }}>
        Select a user from the dropdown above to view their personalized ratings and watchlist data
      </p>
    </div>
  );
}