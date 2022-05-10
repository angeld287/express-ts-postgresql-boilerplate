"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Define all your API web-routes
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const Login_1 = require("../controllers/Api/Auth/Login");
const Register_1 = require("../controllers/Api/Auth/Register");
const router = (0, express_1.Router)();
router.post('/auth/login', (0, express_validator_1.body)('username', 'E-mail cannot be blank').notEmpty(), (0, express_validator_1.body)('username', 'E-mail is not valid').isEmail(), (0, express_validator_1.body)('password', 'Password cannot be blank').notEmpty(), (0, express_validator_1.body)('password', 'Password length must be atleast 8 characters').isLength({ min: 8 }), (0, express_validator_1.body)('username').normalizeEmail({ gmail_remove_dots: false }), Login_1.default.perform);
router.post('/auth/register', (0, express_validator_1.body)('username', 'Username cannot be blank').notEmpty(), (0, express_validator_1.body)('email', 'E-mail cannot be blank').notEmpty(), (0, express_validator_1.body)('email', 'E-mail is not valid').isEmail(), (0, express_validator_1.body)('email').normalizeEmail({ gmail_remove_dots: false }), (0, express_validator_1.body)('phoneNumber', 'Phone Number cannot be blank').notEmpty(), (0, express_validator_1.check)('phoneNumber', 'invalid Phone Number format').custom((value) => Register_1.default.isPhoneNumber(value)), (0, express_validator_1.body)('password', 'Password cannot be blank').notEmpty(), (0, express_validator_1.body)('password', 'Password length must be atleast 8 characters').isLength({ min: 8 }), (0, express_validator_1.check)("password", "invalid password").custom((value, { req }) => Register_1.default.verifyPasswordsMatch(value, req)), (0, express_validator_1.body)('confirmPassword', 'Confirmation Password cannot be blank').notEmpty(), (0, express_validator_1.body)('fullName', 'fullName cannot be blank').notEmpty(), (0, express_validator_1.body)('gender', 'Gender cannot be blank').notEmpty(), Register_1.default.perform);
exports.default = router;
//# sourceMappingURL=Api.js.map