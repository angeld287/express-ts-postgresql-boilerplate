/**
 * Define User model
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import Database from '../providers/Database';
import { IUser, UserPictures, FederatedAuthProfiles, Tokens } from '../interfaces/models/User';

class userService {

    /*
    * Query to valitad user credentials
    * @param email: email or phone of the user
    * @param password: password hash of the user
    * @return User model with data
    */
    static async validateUser(email: string, password: string) {
        const loginQuery = {
            name: 'fetch-user-by-mail-password',
            text: 'select * from dbo.users where email = $1 and user_password = $2',
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
}

export default userService;