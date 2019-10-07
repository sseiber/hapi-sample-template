import { RoutePlugin, route } from 'spryly';
import { Request, ResponseToolkit } from '@hapi/hapi';
import {
    dirname as pathDirname,
    resolve as pathResolve
} from 'path';

const rootDirectory = pathResolve(pathDirname(require.main.filename), '..');

export class HomePageRoutes extends RoutePlugin {
    @route({
        method: 'GET',
        path: '/',
        options: {
            tags: ['homepage'],
            description: 'The homepage spa'
        }
    })
    // @ts-ignore (request)
    public async getHomePage(request: Request, h: ResponseToolkit) {
        const homePageView = pathResolve(rootDirectory, 'client_dist', 'index.html');

        return h.file(homePageView);
    }

    @route({
        method: 'GET',
        path: '/inventory/{path*}',
        options: {
            tags: ['inventory'],
            description: 'The homepage spa inventory page'
        }
    })
    // @ts-ignore (request)
    public async getInventoryPage(request: Request, h: ResponseToolkit) {
        const inventoryPageView = pathResolve(rootDirectory, 'client_dist', 'index.html');

        return h.file(inventoryPageView);
    }

    @route({
        method: 'GET',
        path: '/annotation/{path*}',
        options: {
            tags: ['annotation'],
            description: 'The homepage spa annotation page'
        }
    })
    // @ts-ignore (request)
    public async getAnnotationPage(request: Request, h: ResponseToolkit) {
        const annotationPageView = pathResolve(rootDirectory, 'client_dist', 'index.html');

        return h.file(annotationPageView);
    }

    @route({
        method: 'GET',
        path: '/static/jsmpeg.min.js',
        options: {
            tags: ['homepage'],
            description: 'The JSMpeg minified source'
        }
    })
    // @ts-ignore (request, h)
    public async getJsMpeg(request: Request, h: ResponseToolkit) {
        const jsmpegSource = pathResolve(rootDirectory, 'static', 'jsmpeg.min.js');

        return h.file(jsmpegSource);
    }

    @route({
        method: 'GET',
        path: '/favicon.ico',
        options: {
            tags: ['homepage'],
            description: 'The homepage favicon',
            handler: {
                file: pathResolve(rootDirectory, 'static', 'favicons', 'favicon.ico')
            }
        }
    })
    // @ts-ignore (request, h)
    public async getFavicon(request: Request, h: ResponseToolkit) {
        return;
    }

    @route({
        method: 'GET',
        path: '/favicons/{path*}',
        options: {
            tags: ['homepage'],
            description: 'The homepage static assets',
            handler: {
                directory: {
                    path: pathResolve(rootDirectory, 'static', 'favicons'),
                    index: false
                }
            }
        }
    })
    // @ts-ignore (request , h)
    public async getStatic(request: Request, h: ResponseToolkit) {
        return;
    }

    @route({
        method: 'GET',
        path: '/dist/{path*}',
        options: {
            tags: ['homepage'],
            description: 'The homepage spa bundles',
            handler: {
                directory: {
                    path: pathResolve(rootDirectory, 'client_dist'),
                    index: false
                }
            }
        }
    })
    // @ts-ignore (request, h)
    public async getDist(request: Request, h: ResponseToolkit) {
        return;
    }

    @route({
        method: 'GET',
        path: '/client_dist/{path*}',
        options: {
            tags: ['homepage'],
            description: 'The homepage spa bundles',
            handler: {
                directory: {
                    path: pathResolve(rootDirectory, 'client_dist'),
                    index: false
                }
            }
        }
    })
    // @ts-ignore (request, h)
    public async getClientDist(request: Request, h: ResponseToolkit) {
        return;
    }
}
