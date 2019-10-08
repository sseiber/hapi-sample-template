import { manifest } from './manifest';
import { compose, ComposeOptions } from 'spryly';
import {
    platform as osPlatform,
    cpus as osCpus,
    freemem as osFreeMem,
    totalmem as osTotalMem
} from 'os';
import { forget } from './utils';

const composeOptions: ComposeOptions = {
    relativeTo: __dirname,
    logger: (t, m) => {
        const tags = ((t && Array.isArray(t)) ? `[opt,${t.join(',')}]` : '[opt]');

        // tslint:disable-next-line:no-console
        console.log(`[${new Date().toTimeString()}] ${tags} ${m}`);
    }
};

// Get into Chipper's head on errors!
// process.on('unhandledRejection', (e) => {
//     // tslint:disable:no-console
//     console.log(['startup', 'error'], `Excepction on startup... ${e.message}`);`
//     console.log(['startup', 'error'], e.stack);
//     // tslint:enable:no-console
// });

async function start() {
    const server = await compose(manifest({}), composeOptions);

    server.log(['startup', 'info'], `🚀 Starting HAPI server instance...`);
    await server.start();

    server.log(['startup', 'info'], `✅ Server started`);
    server.log(['startup', 'info'], `🌎 ${server.info.uri}`);
    server.log(['startup', 'info'], ` > Hapi version: ${server.version}`);
    server.log(['startup', 'info'], ` > Plugins: [${Object.keys(server.registrations).join(', ')}]`);
    server.log(['startup', 'info'], ` > Machine: ${osPlatform()}, ${osCpus().length} core, ` +
        `freemem=${(osFreeMem() / 1024 / 1024).toFixed(0)}mb, totalmem=${(osTotalMem() / 1024 / 1024).toFixed(0)}mb`);
}

forget(start);
