# What's the movies in a User's watchlist ordered highest to lowest
create view WatchlistRanked as (
    select u.username, m.movie_title, avg(r.rating) as Rating from watchlist w, movie m, user u, ratings r
	where w.mid = m.mid 
		and w.uid = u.uid 
		and r.mid = w.mid
		and w.uid = 123
	group by u.username, m.movie_title
	order by Rating desc
);
select * from WatchlistRanked;


# A list of movies and their overall ratings
create view MovieRatings as (
	select m.movie_title as Title, avg(r.rating) as MovieRating, count(r.uid) as NumRatings 
    from movie m, ratings r, moviecountry mc
	where m.mid = r.mid and m.mid = mc.mid 
	group by m.movie_title 
);
select * from MovieRatings;

