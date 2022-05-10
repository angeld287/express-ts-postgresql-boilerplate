"use strict";
/**
 * Define the Register API logic
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const userService_1 = require("../../../services/userService");
class Register {
    /**
     * Execute the action of register an user if the inputs are valid
     * @param {string} req: get the request from the post
     * @param {string} res: the response expected by the post
     * @return {Promise<>} return a promise with the json result
     */
    static perform(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
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
                const existenceVerifications = yield Promise.all([
                    userService_1.default.verifyIfEmailExist(_email),
                    userService_1.default.verifyIfPhoneNumberExist(_phoneNumber),
                    userService_1.default.verifyIfUserNameExist(_userName)
                ]);
                if (existenceVerifications.filter(_ => _.exist).length > 0) {
                    return res.json({
                        errors: existenceVerifications.filter(_ => _.exist)
                    });
                }
                const createUser = yield userService_1.default.createNewUser(_email, _phoneNumber, _password, _fullName, _gender, _userName, null);
                if (createUser.created) {
                    return res.json({
                        userId: createUser.id,
                        message: 'The user has been created successfully'
                    });
                }
                else {
                    return res.status(500).json({
                        error: 'An error was occurred while creating the user',
                    });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    error: 'Internal Server Error',
                });
            }
        });
    }
    /**
     * Verify if the field password match with the confirmPassword
     * @param {string} value: the values of the field password
     * @param {string} req: get the request from the post
     * @return {string} return the values of the field password
     */
    static verifyPasswordsMatch(value, req) {
        if (value !== req.body.confirmPassword) {
            // trow error if passwords do not match
            throw new Error("Passwords don't match");
        }
        else {
            return value;
        }
    }
    /**
     * Verify if the field phoneNumber match with the correct format:
     * Valid formats: (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725
     * @param {string} value: the values of the field phoneNumber
     * @return {string} return a boolean with the validation of the phone number format
     */
    static isPhoneNumber(value) {
        try {
            return value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.default = Register;
//# sourceMappingURL=Register.js.map