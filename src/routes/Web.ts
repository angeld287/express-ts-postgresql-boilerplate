/**
 * Define all your Web routes
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

import * as passport from 'passport';
import { Router } from 'express';

import Passport from './../providers/Passport';

import HomeController from '../controllers/Home';
import AccountController from '../controllers/Account';
import LoginController from '../controllers/Auth/Login';
import LogoutController from '../controllers/Auth/Logout';
import RegisterController from '../controllers/Auth/Register';
import { body } from 'express-validator';

const router = Router();

router.get('/', HomeController.index);

router.get('/signup', RegisterController.show);
router.post('/signup', RegisterController.perform);

router.get('/login', LoginController.show);
router.post(
    '/login',
    body('username', 'E-mail cannot be blank.').notEmpty(),
    body('username', 'E-mail is not valid.').isEmail(),
    body('password', 'Password cannot be blank.').notEmpty(),
    body('password', 'Password length must be atleast 8 characters.').isLength({ min: 8 }),
    body('username').normalizeEmail({ gmail_remove_dots: false }),
    LoginController.perform
);

router.get('/logout', LogoutController.perform);

router.get('/account', Passport.isAuthenticated, AccountController.index);

//router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'], failureRedirect: '/login' }));
//router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), SocialController.googleCallback);

export default router;
