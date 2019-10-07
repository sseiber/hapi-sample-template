import { ComposeManifest } from 'spryly';
import { resolve as pathResolve } from 'path';

const DefaultPort = 9010;
const PORT = process.env.PORT || process.env.port || process.env.PORT0 || process.env.port0 || DefaultPort;

export function manifest(config?: any): ComposeManifest {
    return {
        server: {
            port: PORT,
            app: {
                usePortal: config.usePortal,
                rootDirectory: pathResolve(__dirname, '..'),
                dataMiscRootDirectory: process.env.DATAMISC_ROOT || '/data/misc',
                slogan: 'Hapi sample template'
            }
        },
        services: [
            './services'
        ],
        plugins: [
            ...[
                {
                    plugin: '@hapi/inert'
                },
                {
                    plugin: '@hapi/good',
                    options: generateLoggingOptions(config)
                }
            ],
            ...[
                {
                    plugin: './plugins'
                }
            ],
            ...[
                {
                    plugin: './apis'
                }
            ]
        ]
    };
}

// @ts-ignore (config)
function generateLoggingOptions(config: any) {
    return {
        ops: {
            interval: 1000
        },
        reporters: {
            console: [
                {
                    module: '@hapi/good-squeeze',
                    name: 'Squeeze',
                    args: [
                        {
                            log: '*',
                            response: '*',
                            request: '*',
                            error: '*'
                        }
                    ]
                },
                {
                    module: '@hapi/good-console',
                    args: [
                        {
                            format: '[[]hh:mm:ss [GMT]ZZ[]]',
                            utc: false
                        }
                    ]
                },
                'stdout'
            ]
        }
    };
}
