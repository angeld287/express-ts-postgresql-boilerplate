/**
 * Define Login Login for the API
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import Encryptions from '../../../providers/Encryptions'
import IUserService from "../../../interfaces/IUserService";

import { validationResult } from 'express-validator';


class Login {
    public static async perform(req, res): Promise<any> {
        try {
            const errors = validationResult(req);
            let user: IUserService;

            if (!errors.isEmpty()) {
                return res.json({
                    errors: errors.array()
                });
            }

            const _username = req.body.username.toLowerCase();
            const _password = Encryptions.hash(req.body.password);

            const _user = await user.validateUser(_username, _password);

            if (_user === false) {
                return res.json({
                    error: true,
                    message: 'Invalid Username or Password',
                });
            }

            const token = await Encryptions.signEmailPasswordToken(_username, _password, res.locals.app.appSecret);

            if (token === false) {
                return res.json({
                    error: true,
                    token: 'An error was occurred while generating the user token',
                });
            }

            return res.json({
                _user,
                token,
            });

        } catch (error) {
            return res.status(500).json({
                error: 'Internal Server Error',
            });
        }
    }
}

export default Login;