/**
 * Define the Register API logic
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import { validationResult } from 'express-validator';
import IUserService from '../../../interfaces/IUserService';

class Register {
    /**
     * Execute the action of register an user if the inputs are valid
     * @param {string} req: get the request from the post
     * @param {string} res: the response expected by the post
     * @return {Promise<>} return a promise with the json result
     */
    public static async perform(req, res): Promise<any> {
        try {
            const errors = validationResult(req);
            let user: IUserService

            if (!errors.isEmpty()) {
                return res.json({
                    errors: errors.array()
                });
            }

            const _email = req.body.email;
            const _phoneNumber = req.body.phoneNumber;
            const _userName = req.body.username;
            const _password = req.body.password;
            const _fullName = req.body.fullName;
            const _gender = req.body.gender;

            const existenceVerifications = await Promise.all(
                [
                    user.verifyIfEmailExist(_email),
                    user.verifyIfPhoneNumberExist(_phoneNumber),
                    user.verifyIfUserNameExist(_userName)
                ]
            );

            if (existenceVerifications.filter(_ => _.exist).length > 0) {
                return res.json({
                    errors: existenceVerifications.filter(_ => _.exist)
                });
            }

            const createUser = await user.createNewUser(_email, _phoneNumber, _password, _fullName, _gender, _userName, null);

            if (createUser.created) {
                return res.json({
                    userId: createUser.id,
                    message: 'The user has been created successfully'
                });
            } else {
                return res.status(500).json({
                    error: 'An error was occurred while creating the user',
                });
            }

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: 'Internal Server Error',
            });
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
            throw new Error("Passwords don't match");
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
