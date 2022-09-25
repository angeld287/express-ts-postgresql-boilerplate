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

const router = Router();

router.get('/', HomeController.index);

router.get('/signup', RegisterController.show);
router.post('/signup', RegisterController.perform);

router.get('/login', LoginController.show);
router.post('/login', LoginController.perform);

router.get('/logout', LogoutController.perform);

router.get('/account', Passport.isAuthenticated, AccountController.index);

//router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'], failureRedirect: '/login' }));
//router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), SocialController.googleCallback);

export default router;
