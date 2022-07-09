/**
 * Define User model
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import Database from '../providers/Database';
import { IUser, UserPictures, FederatedAuthProfiles, Tokens } from '../interfaces/models/User';
import { IUserService } from '../interfaces/IUserService';
import { IUserExistenceVerificationResponse } from '../interfaces/response/UserResponses';

class userService implements IUserService {

    /*
    * Query to valitad user credentials
    * @param email: email or phone of the user
    * @param password: password hash of the user
    * @return User model with data
    */
    async validateUser(email: string, password: string): Promise<any | ErrorConstructor> {
        const loginQuery = {
            name: 'fetch-user-by-mail-password',
            text: 'select * from public.users where email = $1 and user_password = $2',
            values: [email, password],
        }
        let result = null;
        try {
            result = await Database.sqlToDB(loginQuery);
            if (result.rows.length > 0) {
                delete result.rows[0].user_password;
                return result.rows[0];
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /*
    * Query to get user by id
    * @param id: user id in the db
    * @return User model with data
    */
    async getUserById(id: number): Promise<any | ErrorConstructor> {
        const getQuery = {
            name: 'fetch-user-by-id',
            text: 'select * from public.users where id = $1',
            values: [id],
        }
        let result = null;
        try {
            result = await Database.sqlToDB(getQuery);
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /*
    * Query to get user by id
    * @param email: the user email
    * @return User model with data
    */
    async getUserByEmail(email: string): Promise<any | ErrorConstructor> {
        const getQuery = {
            name: 'fetch-user-by-email',
            text: 'select * from public.users where email = $1',
            values: [email],
        }
        let result = null;
        try {
            result = await Database.sqlToDB(getQuery);
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /*
    * Query to verify if Email is in the database
    * @param email: email of the user
    * @return : returns an object with the result
    */
    async verifyIfEmailExist(email: string): Promise<IUserExistenceVerificationResponse | ErrorConstructor> {
        const verifyQuery = {
            name: 'verify-email-exist',
            text: 'SELECT email FROM public.users where email = $1',
            values: [email],
        }

        let execution = null;
        try {
            execution = await Database.sqlToDB(verifyQuery);
            if (execution.rows.length === 0) {
                return { exist: false, message: null };
            } else {
                return { exist: true, message: `The email: ${email} already exist.` };
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /*
    * Query to verify if PhoneNumber is in the database
    * @param phoneNumber: PhoneNumber of the user
    * @return : returns an object with the result
    */
    async verifyIfPhoneNumberExist(phoneNumber: string): Promise<IUserExistenceVerificationResponse | ErrorConstructor> {
        const verifyQuery = {
            name: 'verify-phoneNumber-exist',
            text: 'SELECT phone_number FROM public.users where phone_number = $1',
            values: [phoneNumber],
        }
        let execution = null;
        try {
            execution = await Database.sqlToDB(verifyQuery);
            if (execution.rows.length === 0) {
                return { exist: false, message: null };
            } else {
                return { exist: true, message: `The phoneNumber: ${phoneNumber} already exist.` };
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /*
    * Query to verify if UserName is in the database
    * @param username: username of the user
    * @return : returns an object with the result
    */
    async verifyIfUserNameExist(userName: string): Promise<IUserExistenceVerificationResponse | ErrorConstructor> {
        const verifyQuery = {
            name: 'verify-userName-exist',
            text: 'SELECT user_name FROM public.users where user_name = $1',
            values: [userName],
        }

        let execution = null;
        try {
            execution = await Database.sqlToDB(verifyQuery);
            if (execution.rows.length === 0) {
                return { exist: false, message: null };
            } else {
                return { exist: true, message: `The userName: ${userName} already exist.` };
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /*
    * Transaction to create a new user
    * @param username: username of the user
    * @return : returns a boolean with the result
    */
    async createNewUser(email: string, phoneNumber: string, userPassword: string, fullname: string, gender: string, userName: string, profile: number): Promise<any | ErrorConstructor> {
        const createTransaction = {
            name: 'create-new-user',
            text: 'INSERT INTO public.users(email, phone_number, user_password, fullname, gender, user_name, profile)VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            values: [email, phoneNumber, userPassword, fullname, gender, userName, profile],
        }

        let result = null, client = null;
        try {
            client = await Database.getTransaction();

            try {
                result = await Database.sqlExecSingleRow(client, createTransaction);
                await Database.commit(client);
            } catch (error) {
                await Database.rollback(client);
                throw new Error(error);
            }

            return { created: true, id: result.rows[0].id };

        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default userService;