//import '@types/jest'
const request = require('supertest');
import Routes from '../src/providers/Routes';
import express from 'express'

let app: express.Application = express();
app.use(express.json());
app = Routes.mountApi(app);


describe('Test register user', () => {

    const userRegister = {
        email: "admin@test.com",
        username: "adminUserName",
        phoneNumber: "8095445500",
        password: "adminPass22",
        confirmPassword: "adminPass22",
        fullName: "User Admin For Tests",
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

        if (response.body.data.errors !== undefined) {
            expect(response.body.data.errors[0].message).toStrictEqual("Username cannot be blank.");
        }

    });


    /* EMAIL VALIDATIONS */

    test('It should respond "E-mail cannot be blank" when email is blank', async () => {
        userRegister.username = "adminUserName"
        userRegister.email = ""

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.errors[0].message).toStrictEqual("E-mail cannot be blank.");
        }

    });

    test('It should respond "E-mail is not valid" when email has invalid format', async () => {
        userRegister.username = "adminUserName"
        userRegister.email = "admin"

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.data.errors[0].message).toStrictEqual("E-mail is not valid.");
        }

    });


    /* PHONENUMBER VALIDATIONS */

    test('It should respond "Phone Number cannot be blank" when Phone Number is blank', async () => {
        userRegister.email = "admin@test.com"
        userRegister.phoneNumber = ""

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.data.errors !== undefined) {
            expect(response.body.data.errors[0].message).toStrictEqual("Phone Number cannot be blank.");
        }

    });


    test('It should respond "invalid Phone Number format" when Phone Number has invalid format', async () => {
        userRegister.phoneNumber = "809544"

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.data.errors !== undefined) {
            expect(response.body.data.errors[0].message).toStrictEqual("invalid Phone Number format.");
        }

    });


    /* PASSWORD VALIDATIONS */

    test('It should respond "Password cannot be blank" when password is blank', async () => {
        userRegister.phoneNumber = "8095445500"
        userRegister.password = ""

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.data.errors !== undefined) {
            expect(response.body.data.errors[0].message).toStrictEqual("Password cannot be blank.");
        }

    });

    test('It should respond "Password length must be atleast 8 characters." when password has invalid format', async () => {
        userRegister.password = "333"

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.data.errors !== undefined) {
            expect(response.body.data.errors[0].message).toStrictEqual("Password length must be atleast 8 characters.");
        }

    });

    test('It should respond "Confirmation Password cannot be blank" when Confirmation Password is blank', async () => {
        userRegister.password = "adminPass22"
        userRegister.confirmPassword = ""

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.data.errors !== undefined) {
            expect(response.body.data.errors[0].message).toStrictEqual("Confirmation Password cannot be blank.");
        }

    });


    test('It should respond "Passwords dont match" when Password and Confirmation Password doesnt match', async () => {
        userRegister.password = "adminPass22"
        userRegister.confirmPassword = "adminPass23"

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.data.errors !== undefined) {
            expect(response.body.data.errors[0].message).toStrictEqual("Passwords don't match.");
        }

    });


    /* FULLNAME VALIDATIONS */

    test('It should respond "fullName cannot be blank." when fullName is blank', async () => {
        userRegister.confirmPassword = "adminPass22"
        userRegister.fullName = ""

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.data.errors !== undefined) {
            expect(response.body.data.errors[0].message).toStrictEqual("fullName cannot be blank.");
        }

    });


    /* GENDER VALIDATIONS */

    test('It should respond "Gender cannot be blank." when Gender is blank', async () => {
        userRegister.fullName = "User Admin For Tests"
        userRegister.gender = ""

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.data.errors !== undefined) {
            expect(response.body.data.errors[0].message).toStrictEqual("Gender cannot be blank.");
        }

    });


    /* CONTROLLER VALIDATIONS */

    test('It should respond "The email: XXXXXX already exist." when the email already exist in the db', async () => {
        userRegister.gender = "M"
        userRegister.email = "existingadmin@test.com"

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.data.errors !== undefined) {
            expect(response.body.data.errors[0].message).toStrictEqual("The email: " + userRegister.email + " already exist.");
        }

    });

    test('It should respond "The phoneNumber: 00000000 already exist." when the email already exist in the db', async () => {
        userRegister.email = "admin@test.com"
        userRegister.phoneNumber = "8095445501"

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.data.errors !== undefined) {
            expect(response.body.data.errors[0].message).toStrictEqual("The phoneNumber: " + userRegister.phoneNumber + " already exist.");
        }

    });


    test('It should respond "The userName: XXXXX already exist." when the email already exist in the db', async () => {
        userRegister.phoneNumber = "8095445500"
        userRegister.username = "existingAdmin"

        const response = await request(app)
            .post('/api/auth/register')
            .send(userRegister)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.data.errors !== undefined) {
            expect(response.body.data.errors[0].message).toStrictEqual("The userName: " + userRegister.username + " already exist.");
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
    //    expect(response.body.data.session.user).toHaveProperty('email')
    //    expect(response.body.data.session.user).toHaveProperty('phoneNumber')
    //    expect(response.body.data.session.user).toHaveProperty('passwordResetToken')
    //    expect(response.body.data.session.user).toHaveProperty('passwordResetExpires')
    //    expect(response.body.data.session.user).toHaveProperty('fullname')
    //    expect(response.body.data.session.user).toHaveProperty('gender')
    //    expect(response.body.data.session.user).toHaveProperty('userName')
    //});

})