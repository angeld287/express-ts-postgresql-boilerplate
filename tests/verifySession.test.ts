
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

describe('Test User Session', () => {

    const user = {
        username: "existingadmin@test.com",
        password: "admin2807"
    }

    test('It must must return a user session data when user is logged in', async () => {
        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(loginResponse.body.data.session).toBeDefined()

        const response = await request(app)
            .get('/api/auth/getsession')
            .set('Cookie', loginResponse.header['set-cookie'])
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.data.session).not.toBeNull()
        expect(response.body.data.session).toBeDefined()

        const logoutresponse = await request(app)
            .post('/api/auth/logout')
            .set('Cookie', loginResponse.header['set-cookie'])
            .expect('Content-Type', /json/)
            .expect(200);

        expect(logoutresponse.body.session).toBeUndefined()
    });

    test('It must must return null when user is not logged', async () => {

        const response = await request(app)
            .get('/api/auth/getsession')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.data.session).toBeNull()

    });

})