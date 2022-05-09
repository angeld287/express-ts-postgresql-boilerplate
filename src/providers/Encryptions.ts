
import * as jwt from 'jsonwebtoken';
import { createHash } from 'crypto';

class Encryptions {

    /* 
    * Generate the token for logins with email and password
    * @param _email: user email
    * @param _password: user hashed password
    * @param secretKey: sistem secret key for sign tokens
    * @return a string with a token.
    */
    public static async signEmailPasswordToken(_email, _password, secretKey) {
        try {
            return await jwt.sign(
                { email: _email, password: _password, date: (new Date()).valueOf() },
                secretKey,
            );
        } catch (error) {
            return false;
        }
    }

    /*
    * Generate the password hash of the user with the 'sha256' algorithm
    * @param password: user password
    * @return a string with a hashed password.
    */
    public static hash(password: string): string {
        return createHash('sha256').update(password).digest('hex');
    }


}

export default Encryptions;