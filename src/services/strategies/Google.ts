/**
 * Define Google OAuth2
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

import { Strategy, StrategyOptionsWithRequest } from 'passport-google-oauth20';
import IUserService from '../../interfaces/IUserService';
import IUser, { FederatedAuthProfiles } from '../../interfaces/models/User';
import Locals from '../../providers/Locals';
import userService from '../userService';

class Google {
	public static init(_passport: any): any {
		let user: IUserService = new userService()
		try {
			const options: StrategyOptionsWithRequest = {
				clientID: Locals.config().clientId,
				clientSecret: Locals.config().clientSecret,
				callbackURL: `${Locals.config().url}/auth/google/callback`,
				passReqToCallback: true,
			}

			const _strategy: Strategy = new Strategy(options, async (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
				if (req.user) {

				} else {

					console.log(profile)

					const googleUserExist = await user.getUserByGoogle(profile.id)

					if (googleUserExist) {
						return done(null, googleUserExist);
					}

					const emailIsBusy = await user.verifyIfEmailExist(profile.emails[0].value)

					if (emailIsBusy) {
						req.flash('errors', { msg: 'There is already an account using this email address. Sing in to that accoount and link it with Google manually from Account Settings.' });
						return done(null);
					}


					//let userData: IUser = {
					//	email: profile.emails[0].value,
					//	fullname:
					//}
					//let federated: FederatedAuthProfiles = {}
					//
					//user.email = profile.emails[0].value;
					//user.google = profile.id;
					//user.tokens.push({ kind: 'google', accessToken });
					//user.fullname = user.fullname || profile.displayName;
					//user.gender = user.gender || profile._json.gender;
					//
					//const createUser = await user.createNewUser(_email, _phoneNumber, _password, _fullName, _gender, _userName, null);

				}
			});

			_passport.use(_strategy);
		} catch (error) {
			console.log('Google Strategy Error: ', error)
		}

	}
}

export default Google;
