# Movie App

## List available endpoints

- POST /register
- POST /login
- POST /google-login
- GET /movies
- GET /movies/:id
- POST /movies
- GET /genres
- GET /histories
- PUT /movies/:id
- PATCH /movies/:id
- DELETE /movies/:id

- POST /pub/register
- POST /pub/login
- POST /pub/google-login
- GET /pub/movies
- GET /pub/movies/:id
- GET /pub/bookmarks
- POST /pub/bookmarks

### POST /register

This endpoint allows a user to register for the application.

- Request Body

```js
{
    "userName": <String>, 
    "email": <String>, 
    "password": <String>, 
    "phoneNumber": <String>, 
    "address": <String> 
}
```

Response 201 - Created

- Response Body

```js
{
    "message": `User with id ${user.id} is created`
}
```

Response 400 - Bad Request

if the email or password is empty:
```js
{
    "message": "Email is required"
}

or

{
    "message": "Password is required"
}
```

if email is not valid:
```js
{
    "message": "Invalid email format"
}
```

if password length is less than 5 characters:
```js
{
    "message": "Password must be at least 5 characters long"
}
```

if email is already registered:
```js
{
    "message": "Email must be unique"
}
```


### POST /login

This endpoint allows a user to log in and receive an access token.

- Request Body

```js
{
    "email": <String>, 
    "password": <String>, 
}
```

Response 200 - OK

- Response Body

```js
{
    "access_token": <access_token value>
    "registered_username": <userName value>
}
```

Response 400 - Bad Request

- Response Body

if the email or password is empty:
```js
{
    "message": "Email cannot be empty"
}

or

{
    "message": "Password cannot be empty"
}
```

Response 401 - Unauthorized

- Response Body

if email or password is incorrect:
```js
{
    "message": "Invalid email"
}

or

{
    "message": "Invalid password"
}
```

### POST /google-login

This endpoint allows a user to log in and receive an access token easily from their Google account.

Response 200 - OK

- Response Body

```js
    "access_token": <access_token value>,
    "registered_username": <userName value>
```

OR

Response 201 - Created

- Response Body

```js
    "access_token": <access_token value>,
    "registered_username": <userName value>
```

Response 400 - Bad Request

- Response Body

If the Google token is missing or invalid:

```js
    "message": "Invalid Google token"
```

### Get /movies

This endpoint allows you to retrieve a list of all movies stored in the database, including their associated user information.

- Request Headers

```js
{
    "access_token": <access_token value>
}
```

Response 200 - OK

- Response Body

```js
[
    {
        "id": 1,
        "title": "Berserk",
        "synopsis": "Berserk is an action-packed dark fantasy manga series written and illustrated by Kentaro Miura. It follows the journey of Guts, a lone mercenary with a tragic past, as he battles against demons, apostles, and dark forces in a world filled with violence and despair.",
        "trailerUrl": "https://www.youtube.com/watch?v=XcY8qtMU9n0",
        "imageUrl": "https://m.media-amazon.com/images/M/MV5BYzA0ZGYxYzAtMmJlOC00OTFkLThhNmItYTdlMTdkNDY2NzQ4L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
        "rating": 9,
        "genreId": 1,
        "authorId": 1,
        "createdAt": "2023-08-07T18:08:16.814Z",
        "updatedAt": "2023-08-07T18:08:16.814Z",
        "User": {
            "id": 1,
            "userName": "admin123",
            "email": "admin123@gmail.com",
            "password": "abc123",
            "role": "admin",
            "phone": "089876543210",
            "address": "Jl. Administrator No. 456",
            "createdAt": "2023-08-07T18:08:16.790Z",
            "updatedAt": "2023-08-07T18:08:16.790Z"
        }
    },
    ...
]
```

### Get /movies/:id

This endpoint allows you to retrieve a specific movie based on its ID.

- Request Headers

```js
{
    "access_token": <access_token value>
}
```

- Request Params

```js
{
    id: <Integer>
}
```

Response 200 - OK

- Response Body

```js
{
    "id": 2,
    "title": "Vagabond",
    "synopsis": "Vagabond is a historical martial arts manga series written and illustrated by Takehiko Inoue. It portrays the fictionalized life of the famous swordsman Miyamoto Musashi, as he embarks on a journey of self-discovery, honing his skills in the way of the sword.",
    "trailerUrl": "https://www.youtube.com/watch?v=3YytHYb2qqg",
    "imageUrl": "https://ih1.redbubble.net/image.3873754750.1833/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
    "rating": 8,
    "genreId": 1,
    "authorId": 2,
    "createdAt": "2023-08-07T18:08:16.814Z",
    "updatedAt": "2023-08-07T18:08:16.814Z",
    "User": {
        "id": 2,
        "userName": "user0",
        "email": "user0@gmail.com",
        "password": "abc123",
        "role": "user",
        "phone": "087654321098",
        "address": "Jl. User No. 012",
        "createdAt": "2023-08-07T18:08:16.790Z",
        "updatedAt": "2023-08-07T18:08:16.790Z"
    },
    "Genre": {
        "id": 1,
        "name": "Action",
        "createdAt": "2023-08-07T18:08:16.809Z",
        "updatedAt": "2023-08-07T18:08:16.809Z"
    }
}
```

Response 404 - Not Found

- Response Body

```js
{
    "error": 'error not found' 
}
```

### POST /movies

This endpoint allows you to add a new movie to the database.

- Request Headers

```js
{
    "access_token": <access_token value>
}
```

- Request Body

```js
{
    "title": <String>, 
    "synopsis": <Text>, 
    "trailerUrl": <String>, 
    "imageUrl": <String>, 
    "rating": <Integer>, 
    "genreId": <Integer>, 
    "authorId": <Integer>
}
```

Response 201 - Created

- Response Body

```js
{
    "message": "Movie with id 25 has been created",
    "newMovie": {
        "id": 25,
        "title": "Barbenheimer 10: End Game Revised Ultra",
        "synopsis": "Tentang seorang ilmuwan dari negeri barbie yang berpetualang ke alam manusia untuk menemukan senjata pemusnah massal yang jadi titik kunci kemenangan amerika di perang melawan Sauron.",
        "trailerUrl": "https://www.youtube.com/watch?v=KA6l2d_Z2v8",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIsrTidXWFfmEOlyWJFUd282ICeDTOD8trwPRRuXDBBFbqWJwUDueAVYO4tMHRBRebau8&usqp=CAU",
        "rating": 8,
        "genreId": 3,
        "authorId": 23,
        "updatedAt": "2023-08-15T05:04:18.902Z",
        "createdAt": "2023-08-15T05:04:18.902Z",
        "status": "Active"
    },
    "history": {
        "id": 24,
        "title": "Barbenheimer 10: End Game Revised Ultra",
        "description": "new entity with id 25 created",
        "updatedBy": "staffx@gmail.com",
        "updatedAt": "2023-08-15T05:04:18.925Z",
        "createdAt": "2023-08-15T05:04:18.925Z"
    }
}
```

Response 404 - Not Found

- Response Body

```js
{
    "error": 'Genre or author not found' 
}
```

Response 400 - Bad Request

- Response Body

if the title or/and synopsis is empty:
```js
{
    "message": "Title cannot be empty"
}

or

{
    "message": "Synopsis cannot be empty"
}
```

if the rating is lower than 1:
```js
{
    "message": "Minimum rating is 1"
}
```

### GET /genres

This endpoint allows you to retrieve a list of all genres available in the database.

- Request Headers

```js
{
    "access_token": <access_token value>
}
```

Response 200 - OK

- Response Body
```js
[
    {
    "id": 1,
    "name": "Action",
    "createdAt": "2023-08-07T18:08:16.809Z",
    "updatedAt": "2023-08-07T18:08:16.809Z"
    },
    ...
]
```

### GET /histories

This endpoint allows you to retrieve a list of all histories/logs available in the database.

- Request Headers

```js
{
    "access_token": <access_token value>
}
```

Response 200 - OK

- Response Body
```js
[
    {
        "id": 20,
        "title": "Barbenheimer 8: End Game Revised",
        "description": "new entity with id 24 created",
        "updatedBy": "staff1@gmail.com",
        "createdAt": "2023-08-14T23:12:00.888Z",
        "updatedAt": "2023-08-14T23:12:00.888Z"
    },
    ...
]
```

### PUT /movies/:id

This endpoint allows you to update a movie details available in the database.

- Request Headers

```js
{
    "access_token": <access_token value>
}
```

- Request Params

```js
{
    id: <Integer>
}
```

Response 200 - OK

- Response Body

```js
{
    "message": "Movie updated successfully",
    "updatedMovie": [
        1
    ],
    "history": {
        "id": 21,
        "title": "Barbenheimer 8: End Game Final Revised",
        "description": "Movie with id 20 updated",
        "updatedBy": "staff1@gmail.com",
        "updatedAt": "2023-08-14T23:51:12.291Z",
        "createdAt": "2023-08-14T23:51:12.291Z"
    }
}
```

Response 403 - Forbidden

- Response Body
If req.user.role === "admin" or "staff" that req.user.id !== findMovie.authorId
```js
{
    "message": "Forbidden"
}
```

Response 404 - Not Found

- Response Body

```js
{
    "error": `Movie with id ${req.params.id} not found` 
}
```


### PATCH /movies/:id

This endpoint allows you to update a movie status in the database.

- Request Headers

```js
{
    "access_token": <access_token value>
}
```

- Request Params

```js
{
    id: <Integer>
}
```

Response 200 - OK

- Response Body
From Active(default) into Inactive
```js
{
    "message": "Movie status updated successfully",
    "updatedStatus": [
        1
    ],
    "history": {
        "id": 22,
        "title": "Barbenheimer 8: End Game Revised",
        "description": "entity with id 24 status has been updated from Active into Inactive",
        "updatedBy": "staffx@gmail.com",
        "updatedAt": "2023-08-15T00:04:17.949Z",
        "createdAt": "2023-08-15T00:04:17.949Z"
    }
}
```

From Inactive into Archived
```js
{
    "message": "Movie status updated successfully",
    "updatedStatus": [
        1
    ],
    "history": {
        "id": 23,
        "title": "Barbenheimer 8: End Game Revised",
        "description": "entity with id 24 status has been updated from Inactive into Archived",
        "updatedBy": "staffx@gmail.com",
        "updatedAt": "2023-08-15T00:05:35.284Z",
        "createdAt": "2023-08-15T00:05:35.284Z"
    }
}
```

Response 403 - Forbidden

- Response Body
If req.user.role === "staff"
```js
{
    "message": "Forbidden"
}
```

Response 404 - Not Found

- Response Body

```js
{
    "error": `Movie with id ${req.params.id} not found` 
}
```

### DELETE /movies/:id

This endpoint allows you to delete a specific movie based on its ID.

- Request Headers

```js
{
    "access_token": <access_token value>
}
```

- Request Params

```js
{
    id: <Integer>
}
```

Response 200 - OK

- Response Body

```js
{
    "message": `Movie with id ${req.params.id} deleted succesfully.`
}
```

Response 404 - Not Found

- Response Body

```js
{
    "error": `Movie with id ${req.params.id} not found` 
}
```

### POST /pub/register

This endpoint allows a customer to register for the application.

- Request Body

```js
{
    "userName": <String>, 
    "email": <String>, 
    "password": <String>, 
    "phoneNumber": <String>, 
    "address": <String> 
}
```

Response 201 - Created

- Response Body

```js
{
    "message": "User with id 2 is created",
    "email": "obamium1@nmail.com",
    "password": "abc123"
}
```

Response 400 - Bad Request

if the email or password is empty:
```js
{
    "message": "Email is required"
}

or

{
    "message": "Password is required"
}
```

if email is not valid:
```js
{
    "message": "Invalid email format"
}
```

if password length is less than 5 characters:
```js
{
    "message": "Password must be at least 5 characters long"
}
```

if email is already registered:
```js
{
    "message": "Email must be unique"
}
```

### POST /pub/login

This endpoint allows a customer to log in and receive an access token.

- Request Body

```js
{
    "email": <String>, 
    "password": <String>, 
}
```

Response 200 - OK

- Response Body

```js
{
    "access_token": <access_token value>
}
```

Response 400 - Bad Request

- Response Body

if the email or password is empty:
```js
{
    "message": "Email cannot be empty"
}

or

{
    "message": "Password cannot be empty"
}
```

Response 401 - Unauthorized

- Response Body

if email or password is incorrect:
```js
{
    "message": "Invalid email"
}

or

{
    "message": "Invalid password"
}
```

### POST /pub/google-login

This endpoint allows a customer to log in and receive an access token easily from their Google account.

Response 200 - OK

- Response Body

```js
    "access_token": <access_token value>
```

OR

Response 201 - Created

- Response Body

```js
    "access_token": <access_token value>
```

Response 400 - Bad Request

- Response Body

If the Google token is missing or invalid:

```js
    "message": "Invalid Google token"
```

### Get /pub/movies

This endpoint allows customer to retrieve a list of all movies stored in the database, including their associated user information.

Response 200 - OK

- Response Body

```js
[
    {
        "id": 1,
        "title": "Berserk",
        "synopsis": "Berserk is an action-packed dark fantasy manga series written and illustrated by Kentaro Miura. It follows the journey of Guts, a lone mercenary with a tragic past, as he battles against demons, apostles, and dark forces in a world filled with violence and despair.",
        "trailerUrl": "https://www.youtube.com/watch?v=XcY8qtMU9n0",
        "imageUrl": "https://m.media-amazon.com/images/M/MV5BYzA0ZGYxYzAtMmJlOC00OTFkLThhNmItYTdlMTdkNDY2NzQ4L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
        "rating": 9,
        "genreId": 1,
        "authorId": 1,
        "createdAt": "2023-08-07T18:08:16.814Z",
        "updatedAt": "2023-08-07T18:08:16.814Z",
        "User": {
            "id": 1,
            "userName": "admin123",
            "email": "admin123@gmail.com",
            "password": "abc123",
            "role": "admin",
            "phone": "089876543210",
            "address": "Jl. Administrator No. 456",
            "createdAt": "2023-08-07T18:08:16.790Z",
            "updatedAt": "2023-08-07T18:08:16.790Z"
        }
    },
    ...
]
```

### Get /pub/movies/:id

This endpoint allows customer to retrieve a specific movie based on its ID.

- Request Params

```js
{
    id: <Integer>
}
```

Response 200 - OK

- Response Body

```js
{
    "movie": {
        "id": 1,
        "title": "Berserk",
        "synopsis": "Berserk is an action-packed dark fantasy manga series written and illustrated by Kentaro Miura. It follows the journey of Guts, a lone mercenary with a tragic past, as he battles against demons, apostles, and dark forces in a world filled with violence and despair.",
        "trailerUrl": "https://www.youtube.com/watch?v=XcY8qtMU9n0",
        "imageUrl": "https://m.media-amazon.com/images/M/MV5BYzA0ZGYxYzAtMmJlOC00OTFkLThhNmItYTdlMTdkNDY2NzQ4L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
        "rating": 9,
        "genreId": 1,
        "authorId": 1,
        "status": "Active",
        "createdAt": "2023-08-09T10:53:15.322Z",
        "updatedAt": "2023-08-17T21:51:06.071Z",
        "Customers": [
            {
                "id": 1,
                "email": "obamium@nmail.com",
                "password": "$2a$08$tWrKWH/QJ2qr0LKFVfVqWeMk3z6oZk8RXgM6/k1qt0COa7nT1qyn.",
                "role": "Customer",
                "createdAt": "2023-08-22T16:58:25.253Z",
                "updatedAt": "2023-08-22T16:58:25.253Z",
                "Bookmark": {
                    "CustomerId": 4,
                    "MovieId": 1,
                    "createdAt": "2023-08-27T17:02:21.544Z",
                    "updatedAt": "2023-08-27T17:02:21.544Z"
                }
            }
        ],
        "Genre": {
            "id": 1,
            "name": "Action",
            "createdAt": "2023-08-09T10:53:15.317Z",
            "updatedAt": "2023-08-09T10:53:15.317Z"
        }
    },
    "data": "<svg version=\"1.0\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n\t viewBox=\"0 0 100 100\" enable-background=\"new 0 0 100 100\" xml:space=\"preserve\">\n\t\n<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" width=\"100\" height=\"100\" viewBox=\"0 0 2000 2000\" x=\"0\" y=\"0\" 
    ...
}
```

Response 404 - Not Found

- Response Body

```js
{
    "error": 'error not found' 
}
```

### GET /pub/bookmarks

This endpoint allows customer to retrieve a list of all their bookmarks/favorites movies.

- Request Headers

```js
{
    "access_token": <access_token value>
}
```

Response 200 - OK

- Response Body
```js
[
    {
        "CustomerId": 1,
        "MovieId": 35,
        "createdAt": "2023-08-23T16:31:13.276Z",
        "updatedAt": "2023-08-23T16:31:13.276Z",
        "Movie": {
            "id": 35,
            "title": "The Good, the Bad and the Ugly",
            "synopsis": "During the Civil War, two men, Blondie and Tuco, form an uncomfortable alliance while looking for treasure. They must also outwit Angel Eyes, an outlaw who wants to plunder the riches for himself.",
            "trailerUrl": "https://www.youtube.com/watch?v=IFNUGzCOQoI&ab_channel=MGM",
            "imageUrl": "https://m.media-amazon.com/images/I/51cwIVtrVHL.jpg",
            "rating": 8,
            "genreId": 1,
            "authorId": 31,
            "status": "Active",
            "createdAt": "2023-08-21T02:54:46.424Z",
            "updatedAt": "2023-08-21T02:54:46.424Z"
        }
    },
    ...
]
```

### Global Error

Response 500 - Internal Server Error

```js
{
    "message": `Internal Server Error` 
}
```