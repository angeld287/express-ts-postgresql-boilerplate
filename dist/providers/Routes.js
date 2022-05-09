"use strict";
/**
 * Define all your routes
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Locals_1 = require("./Locals");
//import Log from '../middlewares/Log';
//import webRouter from './../routes/Web';
const Api_1 = require("./../routes/Api");
class Routes {
    //public mountWeb(_express: Application): Application {
    //Log.info('Routes :: Mounting Web Routes...');
    //return _express.use('/', webRouter);
    //}
    mountApi(_express) {
        const apiPrefix = Locals_1.default.config().apiPrefix;
        //Log.info('Routes :: Mounting API Routes...');
        return _express.use(`/${apiPrefix}`, Api_1.default);
    }
}
exports.default = new Routes;
//# sourceMappingURL=Routes.js.map