
/**
 * Primary file for your Clustered API Server
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import Express from './Express';

class App {
    // Loads your Server
    public loadServer(): void {
        //Log.info('Server :: Booting @ Master...');

        Express.init();
    }
}

export default new App