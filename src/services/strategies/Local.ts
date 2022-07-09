/**
 * Define passport's local strategy
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import { Strategy } from 'passport-local';
import Log from '../../middlewares/Log';
import IUserService from '../../interfaces/IUserService';
import userService from '../userService';

class Local {
	public static init(_passport: any): any {
		_passport.use(new Strategy({}, (username: string, password: string, done: any) => {
			Log.info(`Email is ${username}`);
			Log.info(`Password is ${password}`);

			let _user: IUserService = new userService();
			_user.getUserByEmail(username.toLowerCase()).then(user => {
				Log.info(`user is ${user.email}`);

				if (!user) {
					return done(null, false, { msg: `E-mail ${username} not found.` });
				}

				if (user && !user.user_password) {
					return done(null, false, { msg: `E-mail ${username} was not registered with us using any password. Please use the appropriate providers to Log-In again!` });
				}

				Log.info('comparing password now!');
				let db_pass = user.user_password.replace(/ /g, '')

				if (db_pass !== password) {
					return done(null, false, { msg: 'Invalid E-mail or password.' });
				}

				return done(null, user);
			}).catch(e => {
				Log.info(`error is ${e}`);
				return done(e);
			})
		}));
	}
}

export default Local;
