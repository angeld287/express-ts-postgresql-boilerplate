const request = require('supertest');
import Routes from '../src/providers/Routes';
import express from 'express'
import Locals from '../src/providers/Locals';
import session from 'express-session';
import Passport from '../src/providers/Passport';
import passport from 'passport';

let app: express.Application = express();
app.use(express.json());

const options = {
    resave: true,
    saveUninitialized: true,
    secret: Locals.config().appSecret,
    cookie: {
        maxAge: 1209600000
    }
};

app.use(session(options))

app = Passport.mountPackage(app, passport);

app = Routes.mountApi(app);

describe('Test login user', () => {

    const user = {
        username: "existingadmin@test.com",
        password: "admin2807"
    }

    test('It must logout the current authenticated user and set the token null', async () => {
        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(loginResponse.body.data.session).toBeDefined()

        const response = await request(app)
            .post('/api/auth/logout')
            .set('Cookie', loginResponse.header['set-cookie'])
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.data.session).toBeUndefined()
    });

})