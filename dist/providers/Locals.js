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
        return {
            port,
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