/**
 * Define the Register API logic
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import Encryptions from '../../providers/Encryptions'
import IUserService from '../../interfaces/IUserService';
import { IRequest, IResponse } from '../../interfaces/vendors';
import Log from '../../middlewares/Log';
import userService from '../../services/userService';
import { IUserExistenceVerificationResponse } from '../../interfaces/response/UserResponses';
import ExpressValidator from '../../providers/ExpressValidation';

class Register {

    public static show(req: IRequest, res: IResponse): any {
        return res.render('pages/signup', {
            title: 'SignUp'
        });
    }
    /**
     * Execute the action of register an user if the inputs are valid
     * @param {string} req: get the request from the post
     * @param {string} res: the response expected by the post
     * @return {Promise<>} return a promise with the json result
     */
    public static async perform(req: IRequest, res: IResponse): Promise<any> {
        try {
            const errors = new ExpressValidator().validator(req);
            let user: IUserService = new userService()
            console.log(req.body);


            if (!errors.isEmpty()) {
                console.log('Inputs Errors');
                console.log(errors);
                req.flash('errors', errors);
                return res.redirect('/signup');
            }

            const _email = req.body.email;
            const _phoneNumber = req.body.phoneNumber;
            const _userName = req.body.username;
            const _password = Encryptions.hash(req.body.password);
            const _fullName = req.body.fullName;
            const _gender = req.body.gender;

            console.log('Existence Verification');

            const existenceVerifications: Array<IUserExistenceVerificationResponse> = await Promise.all(
                [
                    user.verifyIfEmailExist(_email),
                    user.verifyIfPhoneNumberExist(_phoneNumber),
                    user.verifyIfUserNameExist(_userName)
                ]
            );

            if (existenceVerifications.filter(_ => _.exist).length > 0) {
                console.log('User Exist');
                req.flash('errors', {
                    error: true,
                    errors: existenceVerifications.filter(_ => _.exist)
                });
                return res.redirect('/signup');
            }

            console.log('Creating User...');
            const createUser = await user.createNewUser(_email, _phoneNumber, _password, _fullName, _gender, _userName, null);

            if (createUser.created) {
                console.log('User Created');
                Log.info(`New user created ` + _userName);
                req.flash('success', { msg: 'The user has been created successfully' });
                res.redirect('/login');
            } else {
                console.log('Error Creating user');
                Log.error(`An error was occurred while creating the user`);
                req.flash('errors', {
                    error: true,
                    message: 'An error was occurred while creating the user',
                });
                return res.redirect('/signup');
            }

        } catch (error) {
            console.log('Try catch error');
            Log.error(`Internal Server Error ` + error);
            req.flash('errors', {
                error: true,
                message: 'Internal Server Error',
            });
            return res.redirect('/signup');
        }
    }

    /**
     * Verify if the field password match with the confirmPassword
     * @param {string} value: the values of the field password
     * @param {string} req: get the request from the post
     * @return {string} return the values of the field password
     */
    public static verifyPasswordsMatch(value, req) {
        if (value !== req.body.confirmPassword) {
            // trow error if passwords do not match
            throw new Error("Passwords don't match.");
        } else {
            return value;
        }
    }

    /**
     * Verify if the field phoneNumber match with the correct format:
     * Valid formats: (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725
     * @param {string} value: the values of the field phoneNumber
     * @return {string} return a boolean with the validation of the phone number format
     */
    public static isPhoneNumber(value) {
        try {
            return value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default Register;
