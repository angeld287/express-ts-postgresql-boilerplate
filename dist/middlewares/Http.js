"use strict";
/**
 * Defines all the requisites in HTTP
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
const express = require("express");
const flash = require("express-flash");
const compress = require("compression");
const session = require("express-session");
const Log_1 = require("./Log");
const Locals_1 = require("../providers/Locals");
//import Passport from '../providers/Passport';
class Http {
    static mount(_express) {
        Log_1.default.info('Booting the \'HTTP\' middleware...');
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
            secret: Locals_1.default.config().appSecret,
            cookie: {
                maxAge: 1209600000 // two weeks (in ms)
            }
        };
        _express.use(session(options));
        // Enables the CORS
        _express.use(cors());
        // Enables the "gzip" / "deflate" compression for response
        _express.use(compress());
        // Loads the passport configuration
        //_express = Passport.mountPackage(_express);
        return _express;
    }
}
exports.default = Http;
//# sourceMappingURL=Http.js.map