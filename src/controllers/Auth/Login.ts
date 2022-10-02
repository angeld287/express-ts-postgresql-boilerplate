/**
 * Define Login Login for the API
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import Encryptions from '../../providers/Encryptions'

import Log from '../../middlewares/Log';
import IUser, { UserRole } from "../../interfaces/models/User";
import IUserService from "../../interfaces/IUserService";
import userService from '../../services/userService';
var passport = require('passport');
import ExpressValidator from '../../providers/ExpressValidation';
import { INext, IRequest, IResponse } from '../../interfaces/vendors';


class Login {

    public static show(req: IRequest, res: IResponse): any {
        return res.render('pages/login', {
            title: 'LogIn'
        });
    }

    /**
     * Execute the action of login an user if the inputs are valid
     * @param {string} req: get the request from the post
     * @param {string} res: the response expected by the post
     * @return {Promise<>} return a promise with the json result
     */
    public static async perform(req: IRequest, res: IResponse, next: INext): Promise<any> {
        try {
            const errors = new ExpressValidator().validator(req);
            let user: IUserService = new userService();

            if (!errors.isEmpty()) {
                console.log(errors.array());
                req.flash('errors', 'Input validation errors');
                return res.redirect('/login');
            }

            Log.info('Here in the login controller #1!');

            const _username = req.body.username.toLowerCase();
            const _password = Encryptions.hash(req.body.password);
            req.body.password = _password;

            const userVerifications: Array<any> = await Promise.all(
                [
                    user.checkIfUserComesFromGoogle(_username),
                    user.validateUser(_username, _password),
                ]
            );

            if (userVerifications[0]) {
                req.flash('errors', { msg: "User exist in the sistem as created from Google. Please login with google" });
                return res.redirect('/login');
            }

            const _user = userVerifications[1];

            if (_user === false) {
                req.flash('errors', { msg: "Invalid Username or Password" });
                return res.redirect('/login');
            }

            Log.info(`New user logged ` + _username);

            const userRoles: Array<UserRole> = await user.getUserRoles(_user.id)

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
                roles: userRoles
            };

            passport.authenticate('local', (err: any, user: any, info: any) => {

                Log.info('Here in the login controller #2!');

                if (err) {
                    console.log('Error 1 autenticacion');
                    return next(err);
                }

                if (info) {
                    console.log('Error Info autenticacion: ', info);
                    req.flash('errors', {
                        error: true,
                        msg: info.message || info.msg,
                    });
                    return res.redirect('/login');
                }

                return req.logIn({ ...userObject }, () => {
                    req.flash('success', { msg: 'You are successfully logged in now!' });
                    res.redirect('/account');
                });

            })(req, res, next);

        } catch (error) {
            Log.error(`Internal Server Error ` + error);
            req.flash('errors', {
                error: true,
                message: "Server Error"
            });
            return res.redirect('/login');
        }
    }
}

export default Login;