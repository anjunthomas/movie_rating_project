# Inserting values into each table 

insert into movie (mid, movie_title, release_dt, og_language)
values (278, 'The Shawshank Redemption', '2022-12-22', 'en'),
(240, 'The Godfather Part II', '2022-12-21', 'en'),
(315162, 'Puss in Boots:The Last Wish', '2022-12-16', 'en'),
(129, 'Spirited Away', '2022-11-30','ja'),
(389, '12 Angry Men',	'2022-11-30',	'en'),
(496243, 'Parasite', '2022-11-25','ko'),
(155, 'The Dark Knight', '2022-11-24',	'en'),
(122, 'The Lord of the Rings: The Return of the King', '1011-11-18', 'en'),
(324857,	'Spider-Man: Into the Spider-Verse','2022-10-19',	'en'),
(366564,	"Comment c'est loin",	'2014-8-7',	'fr'),
(127380, 	'Finding Dory',	'2014-8-6',	'en'),
(447332,	'A Quiet Place',	'2018-2-2',	'en'),
(25623,	'House',	'2018-2-9',	'ja');
select * from movie;


insert into country (countryID, country_nm)
values (1, 'United States'),
(2, 'Japan'),
(3, 'South Korea'),
(4, 'Italy'),
(5, 'Canada'),
(6, 'United Kingdom'),
(7, 'France');
select * from country;


insert into user (uid, email, username)
values (182, 'carrie.bradshaw@gmail.com', 'CarrieBradshaw123'),
(123, 'ItadorYuji@hotmail.com', 'YujiItadori'),
(734, 'snowjon@gmail.com', 'JonSnow'),
(293, 'gumabllwaterson@icloud.com', 'GumballWaterson'),
(567, 'mordecai&rigby@yahoo.com', 'Mordecai&Rigbi');

select * from user;



insert into ratings (uid, mid, rating)
values (182, 315162, 9),
(123, 129,  8),
(123, 155,  10),
(734, 278,  8),
(293, 240, 5),
(293, 315162, 10),
(182, 240, 4),
(182, 496243, 8),
(123, 389, 6),
(123, 278, 9),
(734, 155, 10),
(293, 129, 7),
(567,25623, 5),
(567, 129, 8),
(567, 155, 10),
(734, 366564, 7),
(123, 25623, 6),
(293, 25623, 10);

select * from ratings;


insert into watchlist ( uid, mid)
values (734, 122),
(123, 240),
(293, 155),
(182,447332),
(567, 240),
(734, 25623),
(293, 127380),
(123, 278);

select * from watchlist;


insert into moviecountry ( mid, countryID) 
values (278, 1),
(240, 1),
(315162, 1),
(129, 2),
(389, 1),
(496243, 3),
(155, 1),
(122, 1),
(366564, 7),
(127380, 1),
(447332, 1),
(25623, 2);
select * from moviecountry;


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





