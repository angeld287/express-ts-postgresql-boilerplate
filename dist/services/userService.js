"use strict";
/**
 * Define User model
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
const Database_1 = require("../providers/Database");
class userService {
    /*
    * Query to valitad user credentials
    * @param email: email or phone of the user
    * @param password: password hash of the user
    * @return User model with data
    */
    static validateUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginQuery = {
                name: 'fetch-user-by-mail-password',
                text: 'select * from dbo.users where email = $1 and user_password = $2',
                values: [email, password],
            };
            let result = null;
            try {
                result = yield Database_1.default.sqlToDB(loginQuery);
                if (result.rows.length > 0) {
                    delete result.rows[0].user_password;
                    return result.rows[0];
                }
                else {
                    return false;
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.default = userService;
//# sourceMappingURL=userService.js.map