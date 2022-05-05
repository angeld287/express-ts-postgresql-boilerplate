"use strict";
/**
 * Primary file for your Clustered API Server
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Locals_1 = require("./Locals");
class Express {
    /**
     * Initializes the express server
     */
    constructor() {
        this.express = express();
    }
    /**
     * Starts the express server
     */
    init() {
        const port = Locals_1.default.config().port;
        // Start the server on the specified port
        this.express.listen(port, () => {
            return console.log('\x1b[33m%s\x1b[0m', `Server :: Running @ 'http://localhost:${port}'`);
        }).on('error', (_error) => {
            return console.log('Error: ', _error.message);
        });
        ;
    }
}
/** Export the express module */
exports.default = new Express();
//# sourceMappingURL=Express.js.map