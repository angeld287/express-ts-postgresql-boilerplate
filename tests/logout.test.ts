
const request = require('supertest');
import Routes from '../src/providers/Routes';
import express from 'express'
import IUser from '../src/interfaces/models/User'



const userRegister = {
    email: "aangee21__@litystyles.com",
    username: "angeles6_4222507",
    phoneNumber: "8293619108",
    password: "admin2807",
    confirmPassword: "admin2807",
    fullName: "Angel Daniel Angeles",
    gender: "m"
}

let app: express.Application = express();
app.use(express.json());
app = Routes.mountApi(app);


describe('Test login user', () => {
    const user = {
        username: "aangeles@litystyles.com",
        password: "admin2807"
    }

    test('The response should match with the interfaces IUser when login with correct credentials', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body._user).toHaveProperty('email')
        expect(response.body._user).toHaveProperty('phoneNumber')
        expect(response.body._user).toHaveProperty('passwordResetToken')
        expect(response.body._user).toHaveProperty('passwordResetExpires')
        expect(response.body._user).toHaveProperty('fullname')
        expect(response.body._user).toHaveProperty('gender')
        expect(response.body._user).toHaveProperty('userName')
    });

    test('It should respond "E-mail cannot be blank" when email is blank', async () => {
        user.username = ""

        const response = await request(app)
            .post('/api/auth/login')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.errors[0].msg).toStrictEqual("E-mail cannot be blank.");
        }

    });

    test('It should respond "E-mail is not valid" when email is invalid', async () => {
        user.username = "usuariosinarroba"

        const response = await request(app)
            .post('/api/auth/login')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.errors[0].msg).toStrictEqual("E-mail is not valid.");
        }

    });


    test('It should respond "Password cannot be blank" when password is blank', async () => {
        user.username = 'aangeles@litystyles.com';
        user.password = ""

        const response = await request(app)
            .post('/api/auth/login')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.errors[0].msg).toStrictEqual("Password cannot be blank.");
        }

    });

    test('It should respond "Password length must be atleast 8 characters." when password is invalid', async () => {
        user.password = "3"

        const response = await request(app)
            .post('/api/auth/login')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.errors[0].msg).toStrictEqual("Password length must be atleast 8 characters.");
        }

    });

    test('It should respond "Invalid Username or Password." when password is invalid', async () => {
        user.username = "jdavid@hotmail.com"
        user.password = "admin2807"

        const response = await request(app)
            .post('/api/auth/login')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.errors[0].msg).toStrictEqual("Invalid Username or Password.");
        }

    });
})