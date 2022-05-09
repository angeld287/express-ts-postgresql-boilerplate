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
exports.validateUser = void 0;
const Database_1 = require("../providers/Database");
/*
 * Query to valitad user credentials
 * @param email: email or phone of the user
 * @param password: password hash of the user
 * @return User model with data
 */
const validateUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    let sql = "SELECT NOW()";
    let result = null;
    try {
        result = yield Database_1.default.sqlToDB(sql);
        user = {
            email: 'aangeles@litystyles.com',
            fullname: '',
            gender: '',
            id: '',
            password: '',
        };
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.validateUser = validateUser;
//# sourceMappingURL=User.js.map