"use strict";
/**
 * Primary file for your Clustered API Server
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Express_1 = require("./Express");
class App {
    // Loads your Server
    loadServer() {
        //Log.info('Server :: Booting @ Master...');
        Express_1.default.init();
    }
}
exports.default = new App;
//# sourceMappingURL=App.js.map