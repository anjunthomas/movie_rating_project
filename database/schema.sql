drop table moviecountry;
drop table watchlist;
drop table ratings;
drop table country;
drop table movie;
drop table user;


create table Movie (
	mid integer primary key,
    movie_title varchar(200) not NULL,
    release_dt date,
    og_language varchar(10),
	constraint uq_movie unique (movie_title, release_dt, og_language)
);

create table Country (
	countryID integer primary key,
    country_nm varchar(100) not NULL,
    constraint uq_country unique (countryID, country_nm)
);

create table user (
	uid integer primary key,
    email varchar(200) not NULL,
    username varchar(200) not NULL,
    constraint uq_user_email unique (email),
    constraint uq_user_username unique (username)
);

create table Ratings (
	uid integer,
	mid integer,
    countryID integer,
    rating integer not NULL,
    constraint chk_rating check (rating between 1 and 10),
    foreign key (uid) references User(uid) on delete cascade,
    foreign key (mid) references Movie(mid) on delete cascade
);

create table Watchlist (
	uid integer,
	mid integer,
    foreign key (uid) references User(uid) on delete cascade,
    foreign key (mid) references Movie(mid) on delete cascade
);

create table MovieCountry (
	mid integer,
    countryID integer,
    foreign key (mid) references Movie(mid) on delete cascade,
    foreign key (countryID) references Country(countryID) on delete cascade
);