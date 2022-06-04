
const request = require('supertest');
import Routes from '../src/providers/Routes';
import apiRouter from '../src/routes/Api'
import express from 'express'
import Locals from '../src/providers/Locals';

const user = {
    username: "aangeles@litystyles.com",
    password: "admin2807"
}

const app = express();
const apiPrefix = Locals.config().apiPrefix;

app.use(`/${apiPrefix}`, apiRouter);

describe('Test login user', () => {
    test('It should respond with 200 success when login with correct credentials', async () => {
        await request(app)
            .post('/api/auth/login')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200);
    });
})