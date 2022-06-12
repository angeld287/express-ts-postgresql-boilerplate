/**
 * Defines the passport config
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import { Application } from 'express';
import * as passport from 'passport';

import LocalStrategy from '../services/strategies/Local';

import Log from '../middlewares/Log';
import IUserService from '../interfaces/IUserService';
import userService from '../services/userService';
import IUser from '../interfaces/models/User';

class Passport {
	public mountPackage(_express: Application): Application {
		let _user: IUserService = new userService();

		_express = _express.use(passport.initialize());
		_express = _express.use(passport.session());

		passport.serializeUser<any, any>((req, user, done) => {
			done(null, user);
			console.log(req.isAuthenticated());

		});

		passport.deserializeUser<any, any>((req, sessionData, done) => {
			_user.getUserById(sessionData.user.id).then(u => {
				done(null, u);
			}).catch(e => {
				done(e, null);
			})
		});

		this.mountLocalStrategies();

		return _express;
	}

	public mountLocalStrategies(): void {
		try {
			LocalStrategy.init(passport);
		} catch (_err) {
			Log.error(_err.stack);
		}
	}

	public isAuthenticated(req, res, next): any {
		if (req.isAuthenticated()) {
			return next();
		}

		return res.status(401).json({
			msg: 'Must be authenticated!',
		});
	}

	public isAuthorized(req, res, next): any {
		const provider = req.path.split('/').slice(-1)[0];
		const token = req.user.tokens.find(token => token.kind === provider);
		if (token) {
			return next();
		} else {
			return res.redirect(`/auth/${provider}`);
		}
	}
}

export default new Passport;
