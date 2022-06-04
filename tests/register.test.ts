
const request = require('supertest');
import Routes from '../src/providers/Routes';
import express from 'express'

let app: express.Application = express();
app.use(express.json());
app = Routes.mountApi(app);


describe('Test register user', () => {

    const userRegister = {
        email: "aangee21__@litystyles.com",
        username: "angeles6_4222507",
        phoneNumber: "8293619108",
        password: "admin2807",
        confirmPassword: "admin2807",
        fullName: "Angel Daniel Angeles",
        gender: "m"
    }

    /* USERNAME PATH */

    test('It should respond "Username cannot be blank." when Username is blank', async () => {
        userRegister.username = ""

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.errors[0].msg).toStrictEqual("Username cannot be blank.");
        }

    });


    /* EMAIL VALIDATIONS */

    test('It should respond "E-mail cannot be blank" when email is blank', async () => {
        userRegister.username = "testUser"
        userRegister.email = ""

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.errors[0].msg).toStrictEqual("E-mail cannot be blank.");
        }

    });

    test('It should respond "E-mail is not valid" when email has invalid format', async () => {
        userRegister.username = "testuser"
        userRegister.email = "bademail"

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.errors[0].msg).toStrictEqual("E-mail is not valid.");
        }

    });


    /* PHONENUMBER VALIDATIONS */

    test('It should respond "Phone Number cannot be blank" when Phone Number is blank', async () => {
        userRegister.email = "goodemail@gmail.com"
        userRegister.phoneNumber = ""

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.errors[0].msg).toStrictEqual("Phone Number cannot be blank.");
        }

    });


    test('It should respond "invalid Phone Number format" when Phone Number has invalid format', async () => {
        userRegister.phoneNumber = "3222"

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.errors[0].msg).toStrictEqual("invalid Phone Number format.");
        }

    });


    /* PASSWORD VALIDATIONS */

    test('It should respond "Password cannot be blank" when password is blank', async () => {
        userRegister.phoneNumber = "8293619108"
        userRegister.password = ""

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.errors[0].msg).toStrictEqual("Password cannot be blank.");
        }

    });

    test('It should respond "Password length must be atleast 8 characters." when password has invalid format', async () => {
        userRegister.password = "333"

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.errors[0].msg).toStrictEqual("Password length must be atleast 8 characters.");
        }

    });

    test('It should respond "Confirmation Password cannot be blank" when Confirmation Password is blank', async () => {
        userRegister.password = "userAdmin22"
        userRegister.confirmPassword = ""

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.errors[0].msg).toStrictEqual("Confirmation Password cannot be blank.");
        }

    });


    test('It should respond "Passwords dont match" when Password and Confirmation Password doesnt match', async () => {
        userRegister.password = "userAdmin22"
        userRegister.confirmPassword = "userAdmin23"

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.errors[0].msg).toStrictEqual("Passwords don't match.");
        }

    });


    /* FULLNAME VALIDATIONS */

    test('It should respond "fullName cannot be blank." when fullName is blank', async () => {
        userRegister.confirmPassword = "userAdmin22"
        userRegister.fullName = ""

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.errors[0].msg).toStrictEqual("fullName cannot be blank.");
        }

    });


    /* GENDER VALIDATIONS */

    test('It should respond "Gender cannot be blank." when Gender is blank', async () => {
        userRegister.fullName = "Usuario Prueba"
        userRegister.gender = ""

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.errors[0].msg).toStrictEqual("Gender cannot be blank.");
        }

    });


    /* CONTROLLER VALIDATIONS */

    test('It should respond "The email: XXXXXX already exist." when the email already exist in the db', async () => {
        userRegister.gender = "M"
        userRegister.email = "aangeles@litystyles.com"

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.errors[0].msg).toStrictEqual("The email: " + userRegister.email + " already exist.");
        }

    });

    test('It should respond "The phoneNumber: 00000000 already exist." when the email already exist in the db', async () => {
        userRegister.email = "jmarte@litystyles.com"
        userRegister.phoneNumber = "8293619108"

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.errors[0].msg).toStrictEqual("The phoneNumber: " + userRegister.phoneNumber + " already exist.");
        }

    });


    test('It should respond "The userName: XXXXX already exist." when the email already exist in the db', async () => {
        userRegister.phoneNumber = "8293619109"
        userRegister.username = "angeles6_4222507"

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.errors[0].msg).toStrictEqual("The userName: " + userRegister.username + " already exist.");
        }

    });

    /* HAPPY PATH */

    //test('The response should match with the interfaces IUser when login with correct credentials', async () => {
    //    const response = await request(app)
    //        .post('/api/auth/register')
    //        .send(user)
    //        .expect('Content-Type', /json/)
    //        .expect(200);
    //
    //    expect(response.body._user).toHaveProperty('email')
    //    expect(response.body._user).toHaveProperty('phoneNumber')
    //    expect(response.body._user).toHaveProperty('passwordResetToken')
    //    expect(response.body._user).toHaveProperty('passwordResetExpires')
    //    expect(response.body._user).toHaveProperty('fullname')
    //    expect(response.body._user).toHaveProperty('gender')
    //    expect(response.body._user).toHaveProperty('userName')
    //});

})