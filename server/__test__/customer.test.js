const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { hashPassword } = require('../helpers/bcrypt');

beforeAll(async () => {
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
})

describe('POST /pub/register', () => {
    it('responds with 201 when success', async () => {
        const body = {
            email: "obamium9@nmail.com",
            password: "abc123"
        }

        const response = await request(app).post('/pub/register').send(body)
        
        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('email')
        expect(response.body).toHaveProperty('password')
    })
    
    it('responds with 400 when email not submitted', async() => {
        const body = {
            password: "abc123"
        }
        
        const response = await request(app).post('/pub/register').send(body)
        
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message')
        // expect(response.body).toHaveProperty('password')
    })
    
    it('responds with 400 when password not submitted', async() => {
        const body = {
            email: "obamium9@nmail.com"
        }
        
        const response = await request(app).post('/pub/register').send(body)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message')
        // expect(response.body).toHaveProperty('email')
    })
    
    it('responds with 400 when email is empty', async () => {
        const body = {
            email: "",
            password: "abc123"
        }

        const response = await request(app).post('/pub/register').send(body)
        
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message')
    })
    
    it('responds with 400 when password is empty', async () => {
        const body = {
            email: "obamium9@nmail.com",
            password: ""
        }
        
        const response = await request(app).post('/pub/register').send(body)
        
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message')
    })
    
    it('responds with 400 when email is already registered', async () => {
        const body = {
            email: "obamium9@nmail.com",
            password: "abc123"
        }
        
        await request(app).post('/pub/register').send(body)
        
        // Nyoba register dengan email sama
        const response = await request(app).post('/pub/register').send(body)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message')
    })
    
    it('responds with 400 when email format is invalid', async () => {
        const body = {
            email: "invalidemail",
            password: "abc123"
        }
        
        const response = await request(app).post('/pub/register').send(body)
        
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message')
    })
})

describe ('POST /pub/login', ()=> {
    it('responds with 200 and access token when login success', async () => {
        const body = {
            email: "obamium1@nmail.com",
            password: "abc123"
        }
        
        const response = await request(app).post('/pub/login').send(body)
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('access_token');
    })
    
    it('responds with 401 when login with wrong password', async () => {
        const body = {
            email: "obamium9@nmail.com",
            password: "wrongpassword"
        }
        
        const response = await request(app).post('/pub/login').send(body)
        
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
    })
    
    it('responds with 401 when login with not-exist email', async () => {
        const body = {
            email: "notexist@nmail.com",
            password: "abc123"
        }
        
        const response = await request(app).post('/pub/login').send(body)
        
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
    })
})

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete('Customers', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})