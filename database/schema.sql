drop table if exists moviecountry;
drop table if exists watchlist;
drop table if exists ratings;
drop table if exists country;
drop table if exists movie;
drop table if exists user;


create table movie (
	mid integer primary key,
    movie_title varchar(200) not NULL,
    release_dt date,
    og_language varchar(10),
	constraint uq_movie unique (movie_title, release_dt, og_language)
);

create table country (
	countryID integer primary key,
    country_nm varchar(100) not NULL,
    constraint uq_country unique (countryID, country_nm)
);

create table user (
	uid integer primary key,
    email varchar(200) not NULL,
    username varchar(200) not NULL,
    password varchar(200) not NULL,
    constraint uq_user_email unique (email),
    constraint uq_user_username unique (username)
);

create table ratings (
	uid integer,
	mid integer,
    countryID integer,
    rating integer not NULL,
    constraint uq_ratings_uid_mid unique (uid, mid),
    constraint chk_rating check (rating between 1 and 10),
    foreign key (uid) references user(uid) on delete cascade,
    foreign key (mid) references movie(mid) on delete cascade
);

create table watchlist (
	uid integer,
	mid integer,
    constraint uq_watchlist_uid_mid unique (uid, mid),
    foreign key (uid) references user(uid) on delete cascade,
    foreign key (mid) references movie(mid) on delete cascade
);

create table moviecountry (
	mid integer,
    countryID integer,
    foreign key (mid) references movie(mid) on delete cascade,
    foreign key (countryID) references country(countryID) on delete cascade
);
