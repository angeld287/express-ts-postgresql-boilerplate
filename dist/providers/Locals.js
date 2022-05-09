"use strict";
/**
 * Define App Locals & Configs
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Locals {
    /**
     * Makes env configs available for your app
     * throughout the app's runtime
     */
    static config() {
        const port = process.env.PORT || 3001;
        const PGHOST = 'localhost';
        const PGUSER = 'admin'; //process.env.USER || 
        const PGDATABASE = process.env.POSTGRES_DB || 'litystyles';
        const PGPASSWORD = process.env.POSTGRES_PASSWORD || 'admin';
        const PGPORT = process.env.POSTGRES_PORT || 5432;
        const appSecret = process.env.APP_SECRET || 'lity_secret_styles';
        const apiPrefix = process.env.API_PREFIX || 'api';
        return {
            apiPrefix,
            appSecret,
            port,
            pg: {
                user: PGUSER,
                host: PGHOST,
                database: PGDATABASE,
                password: PGPASSWORD,
                port: PGPORT,
            }
        };
    }
    /**
     * Injects your config to the app's locals
     */
    static init(_express) {
        _express.locals.app = this.config();
        return _express;
    }
}
exports.default = Locals;
//# sourceMappingURL=Locals.js.map