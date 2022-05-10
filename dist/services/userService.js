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
    /*
    * Query to verify if Email is in the database
    * @param email: email of the user
    * @return : returns an object with the result
    */
    static verifyIfEmailExist(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyQuery = {
                name: 'verify-email-exist',
                text: 'SELECT email FROM dbo.users where email = $1',
                values: [email],
            };
            let result = null;
            try {
                result = yield Database_1.default.sqlToDB(verifyQuery);
                if (result.rows.length === 0) {
                    return { exist: false, message: null };
                }
                else {
                    return { exist: true, message: `The email: ${email} already exist` };
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    /*
    * Query to verify if PhoneNumber is in the database
    * @param phoneNumber: PhoneNumber of the user
    * @return : returns an object with the result
    */
    static verifyIfPhoneNumberExist(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyQuery = {
                name: 'verify-phoneNumber-exist',
                text: 'SELECT phone_number FROM dbo.users where phone_number = $1',
                values: [phoneNumber],
            };
            let result = null;
            try {
                result = yield Database_1.default.sqlToDB(verifyQuery);
                if (result.rows.length === 0) {
                    return { exist: false, message: null };
                }
                else {
                    return { exist: true, message: `The phoneNumber: ${phoneNumber} already exist` };
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    /*
    * Query to verify if UserName is in the database
    * @param username: username of the user
    * @return : returns an object with the result
    */
    static verifyIfUserNameExist(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyQuery = {
                name: 'verify-userName-exist',
                text: 'SELECT user_name FROM dbo.users where user_name = $1',
                values: [userName],
            };
            let result = null;
            try {
                result = yield Database_1.default.sqlToDB(verifyQuery);
                if (result.rows.length === 0) {
                    return { exist: false, message: null };
                }
                else {
                    return { exist: true, message: `The userName: ${userName} already exist` };
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    /*
    * Transaction to create a new user
    * @param username: username of the user
    * @return : returns a boolean with the result
    */
    static createNewUser(email, phoneNumber, userPassword, fullname, gender, userName, profile) {
        return __awaiter(this, void 0, void 0, function* () {
            const createTransaction = {
                name: 'create-new-user',
                text: 'INSERT INTO dbo.users(email, phone_number, user_password, fullname, gender, user_name, profile)VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
                values: [email, phoneNumber, userPassword, fullname, gender, userName, profile],
            };
            let result = null, client = null;
            try {
                client = yield Database_1.default.getTransaction();
                try {
                    result = yield Database_1.default.sqlExecSingleRow(client, createTransaction);
                    yield Database_1.default.commit(client);
                }
                catch (error) {
                    yield Database_1.default.rollback(client);
                    throw new Error(error);
                }
                return { created: true, id: result.rows[0].id };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.default = userService;
//# sourceMappingURL=userService.js.map