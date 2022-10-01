/**
 * Define Google OAuth2
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

import { Strategy, StrategyOptionsWithRequest } from 'passport-google-oauth20';
import Locals from '../../providers/Locals';

class Google {
	public static init(_passport: any): any {
		try {
			const options: StrategyOptionsWithRequest = {
				clientID: Locals.config().clientId,
				clientSecret: Locals.config().clientSecret,
				callbackURL: `${Locals.config().url}/auth/google/callback`,
				passReqToCallback: true,
			}

			const _strategy: Strategy = new Strategy(options, (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {

				console.log(req.user);

				if (req.user) {

				} else {

				}
			});

			_passport.use(_strategy);
		} catch (error) {
			console.log('Google Strategy Error: ', error)
		}

	}
}

export default Google;
