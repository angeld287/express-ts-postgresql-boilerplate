/**
 * Define all your API web-routes
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */
import { body } from 'express-validator';
import { Router } from 'express';

import LoginController from '../controllers/Api/Auth/Login'

const router = Router();

router.post(
    '/auth/login',
    body('username', 'E-mail cannot be blank').notEmpty(),
    body('username', 'E-mail is not valid').isEmail(),
    body('password', 'Password cannot be blank').notEmpty(),
    body('password', 'Password length must be atleast 8 characters').isLength({ min: 8 }),
    body('username').normalizeEmail({ gmail_remove_dots: false }),
    LoginController.perform
);

export default router;