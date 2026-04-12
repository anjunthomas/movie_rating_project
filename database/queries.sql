# update 1
update user 
set username = 'TheRealGumballWaterson'
where username = 'GumballWaterson';

select * from user;

# update 2
update ratings
set rating = 8
where uid = 293 and mid = 315162;
select * from ratings;

# update 3
update watchlist
set mid = 366564
where uid = 734;
select * from watchlist;

# delete 1
delete from country c
where not exists (
    select mc.countryID from moviecountry mc
    where mc.countryID = c.countryID
);
select * from country;

# delete 2
delete from ratings
where uid = 182;
select * from ratings;

# delete 3
delete from movie 
where mid = 389;
select * from movie;



# Counting how many movie reviews each user has and their average rating 
select u.username, count(m.movie_title) as NumMoviesRated, avg(r.rating) as AvgRating from movie m, user u, ratings r 
where m.mid = r.mid and u.uid = r.uid
group by u.username;

# Finding the average rating for each country
select c.country_nm, floor(avg(r.rating)) as AvgRating from movie m, ratings r, moviecountry mc, country c
where m.mid = mc.mid and mc.mid = r.mid and c.countryID = mc.countryID
group by c.country_nm;


# Finding the average rating for each movie 
select m.movie_title, floor(avg(r.rating)) as MovieRating from movie m, ratings r
where m.mid = r.mid 
group by m.movie_title;





