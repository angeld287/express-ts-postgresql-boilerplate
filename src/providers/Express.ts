/**
 * Primary file for your Clustered API Server
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import * as express from 'express';
import Locals from './Locals';
import Routes from './Routes';
import Bootstrap from '../middlewares/Kernel';

class Express {
    /**
    * Create the express object
    */
    public express: express.Application;

    /**
     * Initializes the express server
     */
    constructor() {
        this.express = express();

        this.mountMiddlewares();
        this.mountRoutes();
    }

    /**
     * Mounts all the defined middlewares
     */
    private mountMiddlewares(): void {
        this.express = Bootstrap.init(this.express);
    }

    /**
     * Mounts all the defined routes
     */
    private mountRoutes(): void {
        //this.express = Routes.mountWeb(this.express);
        this.express = Routes.mountApi(this.express);
    }

    /**
     * Starts the express server
     */
    public init(): any {
        const port: number = Locals.config().port;

        // Start the server on the specified port
        this.express.listen(port, () => {
            return console.log('\x1b[33m%s\x1b[0m', `Server :: Running @ 'http://localhost:${port}'`);
        }).on('error', (_error) => {
            return console.log('Error: ', _error.message);
        });;
    }
}

/** Export the express module */
export default new Express();