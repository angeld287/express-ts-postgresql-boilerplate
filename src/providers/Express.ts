import * as express from 'express';
import Locals from './Locals';

class Express {

    public express: express.Application;

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

export default new Express();