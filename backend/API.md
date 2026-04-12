# Movie Rating API

## Getting Started

```bash
docker compose up -d              
cd backend && npm install
npm run dev                       
node scripts/validate.js        
```

---

## Endpoints

### GET /movies

Search or list movies.

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `q` | string | `""` | Title search (case-insensitive, partial match) |
| `limit` | number | `20` | Max results |
| `offset` | number | `0` | Pagination offset |

```
GET /movies?q=godfather&limit=2
```
```json
[
  { "mid": 238,  "movie_title": "The Godfather",        "release_dt": "1972-03-14T00:00:00.000Z", "og_language": "en" },
  { "mid": 240,  "movie_title": "The Godfather Part II", "release_dt": "1974-12-20T00:00:00.000Z", "og_language": "en" }
]
```

---

### GET /movies/:mid

Single movie with average rating and associated countries.

```
GET /movies/315162
```
```json
{
  "mid": 315162,
  "movie_title": "Puss in Boots: The Last Wish",
  "release_dt": "2022-12-21T00:00:00.000Z",
  "og_language": "en",
  "avg_rating": "9.50",
  "rating_count": 2,
  "countries": [
    { "countryID": 1, "country_nm": "United States" }
  ]
}
```

`404` if movie not found.

---

### GET /movies/:mid/ratings

Rating summary broken down by rater country.

```
GET /movies/315162/ratings
```
```json
{
  "avg_rating": "9.50",
  "count": 2,
  "by_country": [
    { "country_nm": "United States", "countryID": 1, "avg_rating": "9.50", "count": 2 }
  ]
}
```

---

### GET /countries

All countries.

```
GET /countries
```
```json
[
  { "countryID": 1, "country_nm": "United States" },
  { "countryID": 2, "country_nm": "Japan" },
  { "countryID": 3, "country_nm": "South Korea" },
  { "countryID": 4, "country_nm": "Italy" },
  { "countryID": 5, "country_nm": "Canada" },
  { "countryID": 6, "country_nm": "United Kingdom" },
  { "countryID": 7, "country_nm": "France" }
]
```

---

### POST /ratings

Create or update a rating. One rating per user per movie (upsert via `ON DUPLICATE KEY UPDATE`).

**Body:** `{ uid, mid, countryID, rating }` — `rating` must be 1–10.

```
POST /ratings
{ "uid": 293, "mid": 315162, "countryID": 1, "rating": 8 }
```
```json
{ "ok": true }
```

---

### POST /users

Create a new user.

**Body:** `{ email, username, password }`

```
POST /users
{ "email": "jane@example.com", "username": "JaneDoe", "password": "secret123" }
```
```json
201
{ "uid": 735 }
```

`400` if any field is missing.

---

### POST /users/login

Authenticate a user.

**Body:** `{ email, password }`

```
POST /users/login
{ "email": "snowjon@gmail.com", "password": "winteriscoming" }
```
```json
{ "uid": 734, "email": "snowjon@gmail.com", "username": "JonSnow" }
```

`401` if credentials are invalid.

---

### GET /users/:uid

Get a user's profile.

```
GET /users/293
```
```json
{ "uid": 293, "email": "gumabllwaterson@icloud.com", "username": "GumballWaterson" }
```

`404` if user not found.

---

### GET /users/:uid/ratings

All ratings submitted by a user.

```
GET /users/293/ratings
```
```json
[
  { "mid": 240,    "movie_title": "The Godfather Part II",        "rating": 5,  "countryID": 1 },
  { "mid": 315162, "movie_title": "Puss in Boots: The Last Wish", "rating": 10, "countryID": 1 },
  { "mid": 129,    "movie_title": "Spirited Away",                "rating": 7,  "countryID": 1 },
  { "mid": 25623,  "movie_title": "House",                        "rating": 10, "countryID": 1 }
]
```

---

### GET /users/:uid/watchlist

A user's watchlist.

```
GET /users/293/watchlist
```
```json
[
  { "mid": 155,    "movie_title": "The Dark Knight", "release_dt": "2008-07-18T00:00:00.000Z", "og_language": "en" },
  { "mid": 127380, "movie_title": "Finding Dory",    "release_dt": "2016-06-17T00:00:00.000Z", "og_language": "en" }
]
```

---

### POST /users/:uid/watchlist

Add a movie to a user's watchlist.

**Body:** `{ mid }`

```
POST /users/293/watchlist
{ "mid": 129 }
```
```json
201
{ "ok": true }
```

`400` if `mid` is missing.

---

### DELETE /users/:uid/watchlist/:mid

Remove a movie from a user's watchlist.

```
DELETE /users/293/watchlist/129
```
```json
{ "ok": true }
```

---

## Error Responses

| Status | Meaning |
|--------|---------|
| 400 | Missing or invalid fields |
| 401 | Invalid login credentials |
| 404 | Resource not found |
| 500 | Server or database error |

All errors return `{ "error": "<message>" }`.
