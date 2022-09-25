/**
 * Register your Express middlewares
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import { Application } from 'express';

import CORS from './CORS';
import Http from './Http';

import Locals from '../providers/Locals';
import Views from './Views';
import CsrfToken from './CsrfToken';

class Kernel {
    public static init(_express: Application): Application {
        // Check if CORS is enabled
        if (Locals.config().isCORSEnabled) {
            // Mount CORS middleware
            _express = CORS.mount(_express);
        }

        // Mount basic express apis middleware
        _express = Http.mount(_express);

        // Mount csrf token verification middleware
        _express = CsrfToken.mount(_express);

        // Mount view engine middleware
        _express = Views.mount(_express);

        return _express;
    }
}

export default Kernel;