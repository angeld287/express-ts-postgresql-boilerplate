/**
 * Defines all the requisites in HTTP
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import * as cors from 'cors';
import * as express from 'express';
import * as flash from 'express-flash';
import * as compress from 'compression';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';

import Log from './Log';
import Locals from '../providers/Locals';
import Passport from '../providers/Passport';
import CORS from './CORS';
//import Passport from '../providers/Passport';

class Http {
	public static mount(_express: express.Application): express.Application {
		Log.info('Booting the \'HTTP\' middleware...');

		// Enables the request body parser
		_express.use(express.json());

		// Disable the x-powered-by header in response
		_express.disable('x-powered-by');

		// Enables the request flash messages
		_express.use(flash());

		/**
		 * Enables the session store
		 *
		 * Note: You can also add redis-store
		 * into the options object.
		 */
		const options = {
			resave: true,
			saveUninitialized: true,
			secret: Locals.config().appSecret,
			cookie: {
				maxAge: 1209600000 // two weeks (in ms)
			}
		};

		_express.use(session(options));

		// Enables the CORS
		_express = CORS.mount(_express);

		// Enables the "gzip" / "deflate" compression for response
		_express.use(compress());

		// Loads the passport configuration
		_express = Passport.mountPackage(_express);

		return _express;
	}
}

export default Http;
