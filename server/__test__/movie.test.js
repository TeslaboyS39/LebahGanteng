const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { hashPassword } = require('../helpers/bcrypt');
let access_token = ""

beforeAll(async () => {
    
    await sequelize.queryInterface.bulkInsert('Users', [
        {
            "userName": "admin123",
            "email": "admin123@gmail.com",
            "password": "abc123",
            "role": "admin",
            "phoneNumber": "089876543210",
            "address": "Jl. Administrator No. 456",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            "userName": "staff0",
            "email": "staff0@gmail.com",
            "password": "abc123",
            "role": "staff",
            "phoneNumber": "087654321098",
            "address": "Jl. User No. 012",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            "userName": "staff1",
            "email": "staff1@gmail.com",
            "password": "abc123",
            "role": "staff",
            "phoneNumber": "081234567890",
            "address": "Jl. User No. 123",
            createdAt: new Date(),
            updatedAt: new Date()
          }
    ], {})
    await sequelize.queryInterface.bulkInsert('Genres', [
        {
            "name": "Action",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            "name": "Adventure",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            "name": "Drama",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            "name": "Comedy",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            "name": "Fantasy",
            createdAt: new Date(),
            updatedAt: new Date()
          }
    ], {})
    await sequelize.queryInterface.bulkInsert('Movies', [
        {
            title: "Berserk",
            synopsis: "Berserk is an action-packed dark fantasy manga series written and illustrated by Kentaro Miura. It follows the journey of Guts, a lone mercenary with a tragic past, as he battles against demons, apostles, and dark forces in a world filled with violence and despair.",
            trailerUrl: "https://www.youtube.com/watch?v=XcY8qtMU9n0",
            imageUrl: "https://m.media-amazon.com/images/M/MV5BYzA0ZGYxYzAtMmJlOC00OTFkLThhNmItYTdlMTdkNDY2NzQ4L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
            rating: 9,
            genreId: 1,
            authorId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),            
            status: "Active"
        },
        {
            "title": "Vagabond",
            "synopsis": "Vagabond is a historical martial arts manga series written and illustrated by Takehiko Inoue. It portrays the fictionalized life of the famous swordsman Miyamoto Musashi, as he embarks on a journey of self-discovery, honing his skills in the way of the sword.",
            "trailerUrl": "https://www.youtube.com/watch?v=3YytHYb2qqg",
            "imageUrl": "https://ih1.redbubble.net/image.3873754750.1833/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
            "rating": 8,
            "genreId": 1,
            "authorId": 2,
            createdAt: new Date(),
            updatedAt: new Date(),            
            "status": "Active"
        },
        {
            "title": "Vinland Saga",
            "synopsis": "Vinland Saga is a historical adventure manga series written and illustrated by Makoto Yukimura. Set in the Viking Age, it follows the young Thorfinn's quest for revenge against Askeladd, the mercenary leader who killed his father, and his journey towards a new peaceful life in the legendary land of Vinland.",
            "trailerUrl": "https://www.youtube.com/watch?v=f8JrZ7Q_p-8",
            "imageUrl": "https://i.pinimg.com/1200x/6b/27/42/6b2742b9032c573c92b9dec673b2addc.jpg",
            "rating": 7,
            "genreId": 2,
            "authorId": 3,
            createdAt: new Date(),
            updatedAt: new Date(),            
            "status": "Active"
        },
        {
            "title": "Berserk 2",
            "synopsis": "Berserk 2 is an action-packed dark fantasy manga series written and illustrated by Kentaro Miura. It follows the journey of Guts, a lone mercenary with a tragic past, as he battles against demons, apostles, and dark forces in a world filled with violence and despair.",
            "trailerUrl": "https://www.youtube.com/watch?v=XcY8qtMU9n0",
            "imageUrl": "https://m.media-amazon.com/images/M/MV5BYzA0ZGYxYzAtMmJlOC00OTFkLThhNmItYTdlMTdkNDY2NzQ4L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
            "rating": 9,
            "genreId": 1,
            "authorId": 1,
            createdAt: new Date(),
            updatedAt: new Date(),            
            "status": "Active"
        },
        {
            "title": "Vagabond 2",
            "synopsis": "Vagabond 2 is a historical martial arts manga series written and illustrated by Takehiko Inoue. It portrays the fictionalized life of the famous swordsman Miyamoto Musashi, as he embarks on a journey of self-discovery, honing his skills in the way of the sword.",
            "trailerUrl": "https://www.youtube.com/watch?v=3YytHYb2qqg",
            "imageUrl": "https://ih1.redbubble.net/image.3873754750.1833/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
            "rating": 8,
            "genreId": 1,
            "authorId": 2,
            createdAt: new Date(),
            updatedAt: new Date(),            
            "status": "Active"
        },
        {
            "title": "Vinland Saga 2",
            "synopsis": "Vinland Saga 2 is a historical adventure manga series written and illustrated by Makoto Yukimura. Set in the Viking Age, it follows the young Thorfinn's quest for revenge against Askeladd, the mercenary leader who killed his father, and his journey towards a new peaceful life in the legendary land of Vinland.",
            "trailerUrl": "https://www.youtube.com/watch?v=f8JrZ7Q_p-8",
            "imageUrl": "https://i.pinimg.com/1200x/6b/27/42/6b2742b9032c573c92b9dec673b2addc.jpg",
            "rating": 7,
            "genreId": 2,
            "authorId": 3,
            createdAt: new Date(),
            updatedAt: new Date(),            
            "status": "Active"
        },
        {
            "title": "Berserk 3",
            "synopsis": "Berserk 3 is an action-packed dark fantasy manga series written and illustrated by Kentaro Miura. It follows the journey of Guts, a lone mercenary with a tragic past, as he battles against demons, apostles, and dark forces in a world filled with violence and despair.",
            "trailerUrl": "https://www.youtube.com/watch?v=XcY8qtMU9n0",
            "imageUrl": "https://m.media-amazon.com/images/M/MV5BYzA0ZGYxYzAtMmJlOC00OTFkLThhNmItYTdlMTdkNDY2NzQ4L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
            "rating": 9,
            "genreId": 1,
            "authorId": 1,
            createdAt: new Date(),
            updatedAt: new Date(),            
            "status": "Active"
        },
        {
            "title": "Vagabond 3",
            "synopsis": "Vagabond 3 is a historical martial arts manga series written and illustrated by Takehiko Inoue. It portrays the fictionalized life of the famous swordsman Miyamoto Musashi, as he embarks on a journey of self-discovery, honing his skills in the way of the sword.",
            "trailerUrl": "https://www.youtube.com/watch?v=3YytHYb2qqg",
            "imageUrl": "https://ih1.redbubble.net/image.3873754750.1833/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
            "rating": 8,
            "genreId": 1,
            "authorId": 2,
            createdAt: new Date(),
            updatedAt: new Date(),            
            "status": "Active"
        },
        {
            "title": "Vinland Saga 3",
            "synopsis": "Vinland Saga 3 is a historical adventure manga series written and illustrated by Makoto Yukimura. Set in the Viking Age, it follows the young Thorfinn's quest for revenge against Askeladd, the mercenary leader who killed his father, and his journey towards a new peaceful life in the legendary land of Vinland.",
            "trailerUrl": "https://www.youtube.com/watch?v=f8JrZ7Q_p-8",
            "imageUrl": "https://i.pinimg.com/1200x/6b/27/42/6b2742b9032c573c92b9dec673b2addc.jpg",
            "rating": 7,
            "genreId": 2,
            "authorId": 3,
            createdAt: new Date(),
            updatedAt: new Date(),            
            "status": "Active"
        },
        {
            "title": "Berserk 4",
            "synopsis": "Berserk 4 is an action-packed dark fantasy manga series written and illustrated by Kentaro Miura. It follows the journey of Guts, a lone mercenary with a tragic past, as he battles against demons, apostles, and dark forces in a world filled with violence and despair.",
            "trailerUrl": "https://www.youtube.com/watch?v=XcY8qtMU9n0",
            "imageUrl": "https://m.media-amazon.com/images/M/MV5BYzA0ZGYxYzAtMmJlOC00OTFkLThhNmItYTdlMTdkNDY2NzQ4L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
            "rating": 9,
            "genreId": 1,
            "authorId": 1,
            createdAt: new Date(),
            updatedAt: new Date(),            
            "status": "Active"
        },
        {
            "title": "Vagabond 4",
            "synopsis": "Vagabond 4 is a historical martial arts manga series written and illustrated by Takehiko Inoue. It portrays the fictionalized life of the famous swordsman Miyamoto Musashi, as he embarks on a journey of self-discovery, honing his skills in the way of the sword.",
            "trailerUrl": "https://www.youtube.com/watch?v=3YytHYb2qqg",
            "imageUrl": "https://ih1.redbubble.net/image.3873754750.1833/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
            "rating": 8,
            "genreId": 1,
            "authorId": 2,
            createdAt: new Date(),
            updatedAt: new Date(),            
            "status": "Active"
        },
        {
            "title": "Vinland Saga 4",
            "synopsis": "Vinland Saga 4 is a historical adventure manga series written and illustrated by Makoto Yukimura. Set in the Viking Age, it follows the young Thorfinn's quest for revenge against Askeladd, the mercenary leader who killed his father, and his journey towards a new peaceful life in the legendary land of Vinland.",
            "trailerUrl": "https://www.youtube.com/watch?v=f8JrZ7Q_p-8",
            "imageUrl": "https://i.pinimg.com/1200x/6b/27/42/6b2742b9032c573c92b9dec673b2addc.jpg",
            "rating": 7,
            "genreId": 2,
            "authorId": 3,
            createdAt: new Date(),
            updatedAt: new Date(),            
            "status": "Active"
        },
        {
            "title": "Berserk 5",
            "synopsis": "Berserk 5 is an action-packed dark fantasy manga series written and illustrated by Kentaro Miura. It follows the journey of Guts, a lone mercenary with a tragic past, as he battles against demons, apostles, and dark forces in a world filled with violence and despair.",
            "trailerUrl": "https://www.youtube.com/watch?v=XcY8qtMU9n0",
            "imageUrl": "https://m.media-amazon.com/images/M/MV5BYzA0ZGYxYzAtMmJlOC00OTFkLThhNmItYTdlMTdkNDY2NzQ4L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
            "rating": 9,
            "genreId": 1,
            "authorId": 1,
            createdAt: new Date(),
            updatedAt: new Date(),            
            "status": "Active"
        },
        {
            "title": "Vagabond 5",
            "synopsis": "Vagabond 5 is a historical martial arts manga series written and illustrated by Takehiko Inoue. It portrays the fictionalized life of the famous swordsman Miyamoto Musashi, as he embarks on a journey of self-discovery, honing his skills in the way of the sword.",
            "trailerUrl": "https://www.youtube.com/watch?v=3YytHYb2qqg",
            "imageUrl": "https://ih1.redbubble.net/image.3873754750.1833/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
            "rating": 8,
            "genreId": 1,
            "authorId": 2,
            createdAt: new Date(),
            updatedAt: new Date(),            
            "status": "Active"
        },
        {
            "title": "Vinland Saga 5",
            "synopsis": "Vinland Saga 5 is a historical adventure manga series written and illustrated by Makoto Yukimura. Set in the Viking Age, it follows the young Thorfinn's quest for revenge against Askeladd, the mercenary leader who killed his father, and his journey towards a new peaceful life in the legendary land of Vinland.",
            "trailerUrl": "https://www.youtube.com/watch?v=f8JrZ7Q_p-8",
            "imageUrl": "https://i.pinimg.com/1200x/6b/27/42/6b2742b9032c573c92b9dec673b2addc.jpg",
            "rating": 7,
            "genreId": 2,
            "authorId": 3,
            createdAt: new Date(),
            updatedAt: new Date(),            
            "status": "Active"
        },
        {
            "title": "Berserk 6",
            "synopsis": "Berserk 6 is an action-packed dark fantasy manga series written and illustrated by Kentaro Miura. It follows the journey of Guts, a lone mercenary with a tragic past, as he battles against demons, apostles, and dark forces in a world filled with violence and despair.",
            "trailerUrl": "https://www.youtube.com/watch?v=XcY8qtMU9n0",
            "imageUrl": "https://m.media-amazon.com/images/M/MV5BYzA0ZGYxYzAtMmJlOC00OTFkLThhNmItYTdlMTdkNDY2NzQ4L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
            "rating": 9,
            "genreId": 1,
            "authorId": 1,
            createdAt: new Date(),
            updatedAt: new Date(),            
            "status": "Active"
        },
        {
            "title": "Vagabond 6",
            "synopsis": "Vagabond 6 is a historical martial arts manga series written and illustrated by Takehiko Inoue. It portrays the fictionalized life of the famous swordsman Miyamoto Musashi, as he embarks on a journey of self-discovery, honing his skills in the way of the sword.",
            "trailerUrl": "https://www.youtube.com/watch?v=3YytHYb2qqg",
            "imageUrl": "https://ih1.redbubble.net/image.3873754750.1833/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
            "rating": 8,
            "genreId": 1,
            "authorId": 2,
            createdAt: new Date(),
            updatedAt: new Date(),            
            "status": "Active"
        },
        {
            "title": "Vinland Saga 6",
            "synopsis": "Vinland Saga 6 is a historical adventure manga series written and illustrated by Makoto Yukimura. Set in the Viking Age, it follows the young Thorfinn's quest for revenge against Askeladd, the mercenary leader who killed his father, and his journey towards a new peaceful life in the legendary land of Vinland.",
            "trailerUrl": "https://www.youtube.com/watch?v=f8JrZ7Q_p-8",
            "imageUrl": "https://i.pinimg.com/1200x/6b/27/42/6b2742b9032c573c92b9dec673b2addc.jpg",
            "rating": 7,
            "genreId": 2,
            "authorId": 3,
            createdAt: new Date(),
            updatedAt: new Date(),            
            "status": "Active"
        },
        {
            "title": "Berserk 7",
            "synopsis": "Berserk 7 is an action-packed dark fantasy manga series written and illustrated by Kentaro Miura. It follows the journey of Guts, a lone mercenary with a tragic past, as he battles against demons, apostles, and dark forces in a world filled with violence and despair.",
            "trailerUrl": "https://www.youtube.com/watch?v=XcY8qtMU9n0",
            "imageUrl": "https://m.media-amazon.com/images/M/MV5BYzA0ZGYxYzAtMmJlOC00OTFkLThhNmItYTdlMTdkNDY2NzQ4L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
            "rating": 9,
            "genreId": 1,
            "authorId": 1,
            createdAt: new Date(),
            updatedAt: new Date(),            
            "status": "Active"
        },
        {
            "title": "Vagabond 7",
            "synopsis": "Vagabond 7 is a historical martial arts manga series written and illustrated by Takehiko Inoue. It portrays the fictionalized life of the famous swordsman Miyamoto Musashi, as he embarks on a journey of self-discovery, honing his skills in the way of the sword.",
            "trailerUrl": "https://www.youtube.com/watch?v=3YytHYb2qqg",
            "imageUrl": "https://ih1.redbubble.net/image.3873754750.1833/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
            "rating": 8,
            "genreId": 1,
            "authorId": 2,
            createdAt: new Date(),
            updatedAt: new Date(),            
            "status": "Active"
        },
        {
            "title": "Vinland Saga 7",
            "synopsis": "Vinland Saga 7 is a historical adventure manga series written and illustrated by Makoto Yukimura. Set in the Viking Age, it follows the young Thorfinn's quest for revenge against Askeladd, the mercenary leader who killed his father, and his journey towards a new peaceful life in the legendary land of Vinland.",
            "trailerUrl": "https://www.youtube.com/watch?v=f8JrZ7Q_p-8",
            "imageUrl": "https://i.pinimg.com/1200x/6b/27/42/6b2742b9032c573c92b9dec673b2addc.jpg",
            "rating": 7,
            "genreId": 2,
            "authorId": 3,
            createdAt: new Date(),
            updatedAt: new Date(),            
            "status": "Active"
        }
    ], {})
    await sequelize.queryInterface.bulkInsert('Customers', [
        {
            email: "obamium1@nmail.com",
            password: hashPassword("abc123"),
            role: "Customer",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            email: "obamium2@nmail.com",
            password: hashPassword("abc123"),
            role: "Customer",
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ], {})

    const body = {
      email: "obamium1@nmail.com",
      password: hashPassword("abc123"),
    };

    await request(app).post("/pub/register").send(body);

    const response = await request(app).post("/pub/login").send({
      email: "obamium1@nmail.com",
      password: "abc123",
    });

    access_token = response.body.access_token; 
    console.log(access_token, '<<<< INI ERROR');

    await sequelize.queryInterface.bulkInsert('Bookmarks', [
        {
            CustomerId: 1,
            MovieId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            CustomerId: 1,
            MovieId: 5,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {})
 })

 describe('GET /pub/movies', () => {
    it('should successfully get all movies without access token and filter', async () => {
        const response = await request(app).get('/pub/movies');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(21);
    });

    it('should successfully get all movies without access token but with filter', async () => {
        const response = await request(app).get('/pub/movies?filter=2');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(7);
    });

    it('should successfully get all movies without access token but with pagination', async () => {
        const response = await request(app).get('/pub/movies?page=2');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(8);
    });

    it('should successfully get a specific movie with id', async () => {
        const response = await request(app).get('/pub/movies/3');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it('should be fail when get a specific movie with invalid id', async () => {
        const response = await request(app).get('/pub/movies/22');

        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
    });
 })
 
 describe('GET /pub/bookmarks', () => {
    it('should successfully get all bookmarks without access token and filter', async () => {
        const response = await request(app)
            .get('/pub/bookmarks')
            .set('acceess_token', access_token);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    }); 
 })

 describe('POST /pub/bookmarks', () => {
    it('should successfully post bookmark without access token and filter', async () => {
        const response = await request(app)
        .get('/pub/bookmarks')
        .set('acceess_token', access_token);
    
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
    })
 })
  
 afterAll(async () => {
    await sequelize.queryInterface.bulkDelete('Bookmarks', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
    await sequelize.queryInterface.bulkDelete('Movies', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
    await sequelize.queryInterface.bulkDelete('Genres', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
    await sequelize.queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
    await sequelize.queryInterface.bulkDelete('Customers', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})
