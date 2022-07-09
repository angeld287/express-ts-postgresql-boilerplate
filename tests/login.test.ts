const request = require('supertest');
import Routes from '../src/providers/Routes';
import express from 'express'
import session from 'express-session';
import Locals from '../src/providers/Locals';
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

    test('The response should match with the interfaces IUser when login with correct credentials', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.data.session).toHaveProperty('email')
        expect(response.body.data.session).toHaveProperty('phoneNumber')
        expect(response.body.data.session).toHaveProperty('passwordResetToken')
        expect(response.body.data.session).toHaveProperty('passwordResetExpires')
        expect(response.body.data.session).toHaveProperty('fullname')
        expect(response.body.data.session).toHaveProperty('gender')
        expect(response.body.data.session).toHaveProperty('userName')
    });

    test('It should respond "E-mail cannot be blank" when email is blank', async () => {
        user.username = ""

        const response = await request(app)
            .post('/api/auth/login')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.data.errors[0].message).toStrictEqual("E-mail cannot be blank.");
        }

    });

    test('It should respond "E-mail is not valid" when email is invalid', async () => {
        user.username = "existingadmin"

        const response = await request(app)
            .post('/api/auth/login')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.data.errors[0].message).toStrictEqual("E-mail is not valid.");
        }

    });


    test('It should respond "Password cannot be blank" when password is blank', async () => {
        user.username = 'existingadmin@test.com';
        user.password = ""

        const response = await request(app)
            .post('/api/auth/login')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.data.errors[0].message).toStrictEqual("Password cannot be blank.");
        }

    });

    test('It should respond "Password length must be atleast 8 characters." when password is invalid', async () => {
        user.password = "34"

        const response = await request(app)
            .post('/api/auth/login')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.data.errors[0].message).toStrictEqual("Password length must be atleast 8 characters.");
        }

    });

    test('It should respond "Invalid Username or Password." when password is invalid', async () => {
        user.username = "existingadmin@test.com"
        user.password = "admin2809"

        const response = await request(app)
            .post('/api/auth/login')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.data.errors[0].message).toStrictEqual("Invalid Username or Password.");
        }

    });
})