"use strict";
/**
 * Define Login Login for the API
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
const Encryptions_1 = require("../../../providers/Encryptions");
const userService_1 = require("../../../services/userService");
const express_validator_1 = require("express-validator");
class Login {
    static perform(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.json({
                        errors: errors.array()
                    });
                }
                const _username = req.body.username.toLowerCase();
                const _password = Encryptions_1.default.hash(req.body.password);
                const _user = yield userService_1.default.validateUser(_username, _password);
                if (_user === false) {
                    return res.json({
                        error: true,
                        message: 'Invalid Username or Password',
                    });
                }
                const token = yield Encryptions_1.default.signEmailPasswordToken(_username, _password, res.locals.app.appSecret);
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
            }
            catch (error) {
                return res.status(500).json({
                    error: 'Internal Server Error',
                });
            }
        });
    }
}
exports.default = Login;
//# sourceMappingURL=Login.js.map