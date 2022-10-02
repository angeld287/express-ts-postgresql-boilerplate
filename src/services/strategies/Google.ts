/**
 * Define Google OAuth2
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

import { Strategy, StrategyOptionsWithRequest } from 'passport-google-oauth20';
import IUserService from '../../interfaces/IUserService';
import IUser, { FederatedAuthProfiles, UserPictures } from '../../interfaces/models/User';
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

				let googleUserExist = await user.getUserByGoogle(profile.id)

				if (googleUserExist !== false) {
					return done(null, googleUserExist);
				}

				const emailIsBusy = await user.verifyIfEmailExist(profile.emails[0].value)

				if (emailIsBusy.exist) {
					req.flash('errors', { msg: 'There is already an account using this email address. Sing in to that accoount and link it with Google manually from Account Settings.' });
					return done(null);
				}

				const newUserProfile = await user.createNewFederatedAuthProfiles(profile.provider, profile.id)

				let userData: IUser = {
					id: '',
					email: profile.emails[0].value,
					fullname: profile.displayName,
					userName: '',
					password: 'google',
					roles: []
				}

				const createUser = await user.createNewUserFromGoogle(userData, newUserProfile.id);
				await user.createNewUserProfileImage(profile._json.picture, createUser.id)
				await user.addUserToRole(createUser.id, 'customer')

				googleUserExist = await user.getUserByGoogle(profile.id)

				return done(null, googleUserExist)
			});

			_passport.use(_strategy);
		} catch (error) {
			console.log('Google Strategy Error: ', error)
		}

	}
}

export default Google;
