"use strict";
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
const jwt = require("jsonwebtoken");
class Tokens {
    /*
    * Generate the token for logins with email and password
    * @param _email: user email
    * @param _password: user hashed password
    * @param secretKey: sistem secret key for sign tokens
    * @return a string with a token.
    */
    static signEmailPasswordToken(_email, _password, secretKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield jwt.sign({ email: _email, password: _password, date: (new Date()).valueOf() }, secretKey);
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.default = Tokens;
//# sourceMappingURL=Tokens.js.map