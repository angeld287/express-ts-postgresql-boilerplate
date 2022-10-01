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
        const DATABASE_URL = process.env.DATABASE_URL || 'postgres://admin:admin@localhost:35432/db';

        const appSecret = process.env.APP_SECRET || 'secret_key';
        const apiPrefix = process.env.API_PREFIX || 'api';

        //allow origin cors
        const url = process.env.APP_URL || `http://aallitypitbulls.com:${port}`;

        const clientId = process.env.GOOGLE_ID || "123519622891-6eds7r9o2t43nfmg0mpgu4r7a9p28rip.apps.googleusercontent.com";
        const clientSecret = process.env.GOOGLE_SECRET || "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";

        return {
            apiPrefix,
            appSecret,
            port,
            dbUrl: DATABASE_URL,
            url,
            clientId,
            clientSecret
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