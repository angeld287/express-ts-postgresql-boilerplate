/**
 * Define all your routes
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import { Application } from 'express';
import Locals from './Locals';
import apiRouter from './../routes/Api';
import Log from '../middlewares/Log';

class Routes {

	public mountApi(_express: Application): Application {
		const apiPrefix = Locals.config().apiPrefix;
		Log.info('Routes :: Mounting API Routes...');
		return _express.use(`/${apiPrefix}`, apiRouter);
	}
}

export default new Routes;
