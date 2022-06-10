/**
 * Define App Locals & Configs
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import { Application } from 'express'

class Locals {

    /**
     * Makes env configs available for your app
     * throughout the app's runtime
     */
    public static config(): any {
        const port = process.env.PORT || 3001;
        const DATABASE_URL = process.env.DATABASE_URL || 'postgres://admin:admin@localhost:5432/litystyles';

        const appSecret = process.env.APP_SECRET || 'lity_secret_styles';
        const apiPrefix = process.env.API_PREFIX || 'api';


        return {
            apiPrefix,
            appSecret,
            port,
            dbUrl: DATABASE_URL
        }
    }

    /**
     * Injects your config to the app's locals
     */
    public static init(_express: Application): Application {
        _express.locals.app = this.config();
        return _express;
    }
}

export default Locals;