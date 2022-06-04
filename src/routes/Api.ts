/**
 * Define all your API web-routes
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */
import { body, check } from 'express-validator';
import { Router } from 'express';

import LoginController from '../controllers/Api/Auth/Login'
import RegisterController from '../controllers/Api/Auth/Register'

const router = Router();

router.post(
    '/auth/login',
    body('username', 'E-mail cannot be blank.').notEmpty(),
    body('username', 'E-mail is not valid.').isEmail(),
    body('password', 'Password cannot be blank.').notEmpty(),
    body('password', 'Password length must be atleast 8 characters.').isLength({ min: 8 }),
    body('username').normalizeEmail({ gmail_remove_dots: false }),
    LoginController.perform
);

router.post(
    '/auth/register',
    body('username', 'Username cannot be blank.').notEmpty(),

    body('email', 'E-mail cannot be blank.').notEmpty(),
    body('email', 'E-mail is not valid.').isEmail(),
    body('email').normalizeEmail({ gmail_remove_dots: false }),

    body('phoneNumber', 'Phone Number cannot be blank.').notEmpty(),
    check('phoneNumber', 'invalid Phone Number format.').custom((value) => RegisterController.isPhoneNumber(value)),

    body('password', 'Password cannot be blank.').notEmpty(),
    body('password', 'Password length must be atleast 8 characters.').isLength({ min: 8 }),
    body('confirmPassword', 'Confirmation Password cannot be blank.').notEmpty(),

    check("password", "invalid password.").custom((value, { req }) => RegisterController.verifyPasswordsMatch(value, req)),

    body('fullName', 'fullName cannot be blank.').notEmpty(),

    body('gender', 'Gender cannot be blank.').notEmpty(),


    RegisterController.perform
);

export default router;