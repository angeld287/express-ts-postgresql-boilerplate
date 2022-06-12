/**
 * Define Login Login for the API
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import Encryptions from '../../../providers/Encryptions'

import { validationResult } from 'express-validator';
import Log from '../../../middlewares/Log';
import IUser from "../../../interfaces/models/User";
import IUserService from "../../../interfaces/IUserService";
import userService from '../../../services/userService';
import Locals from '../../../providers/Locals'
var passport = require('passport');
import { IResponse, IRequest, INext } from '../../../interfaces/vendors';


class Login {
    public static async perform(req: IRequest, res: IResponse, next: INext): Promise<any> {
        try {
            const errors = validationResult(req);
            let user: IUserService = new userService();

            if (!errors.isEmpty()) {
                return res.json({
                    errors: errors.array()
                });
            }

            const _username = req.body.username.toLowerCase();
            const _password = Encryptions.hash(req.body.password);
            req.body.password = _password;

            const _user = await user.validateUser(_username, _password);

            if (_user === false) {
                return res.json({
                    error: true,
                    message: 'Invalid Username or Password',
                });
            }

            const token = await Encryptions.signEmailPasswordToken(_username, _password, Locals.config().appSecret);

            if (token === false) {
                return res.json({
                    error: true,
                    token: 'An error was occurred while generating the user token',
                });
            }

            Log.info(`New user logged ` + _username);

            let userObject: IUser = {
                id: _user.id,
                email: _user.email,
                phoneNumber: _user.phone_number,
                passwordResetToken: _user.password_reset_token,
                passwordResetExpires: _user.password_reset_expires,
                fullname: _user.fullname,
                gender: _user.gender,
                profile: _user.profile,
                userName: _user.user_name,
            };

            passport.authenticate('local', (err, user, info) => {
                Log.info('Here in the login controller #2!');

                if (err) {
                    return next(err);
                }

                if (info) {
                    return res.json({
                        error: true,
                        msg: info.message || info.msg,
                    });
                }

                return req.logIn({ token, user: userObject }, () => {
                    return res.json({
                        _user: req.session.passport.user,
                        token: req.session.passport.token,
                    })
                });

            })(req, res, next);

        } catch (error) {
            Log.error(`Internal Server Error ` + error);
            return res.status(500).json({
                error: 'Internal Server Error',
            });
        }
    }
}

export default Login;