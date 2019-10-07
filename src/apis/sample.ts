import { inject, RoutePlugin, route } from 'spryly';
import { Request, ResponseToolkit } from '@hapi/hapi';
import { SampleService } from '../services/sample';
import * as Boom from '@hapi/boom';
import * as _get from 'lodash.get';

export class SampleRoutes extends RoutePlugin {
    @inject('sample')
    private sample: SampleService;

    @route({
        method: 'POST',
        path: '/api/v1/sample/route1',
        options: {
            auth: {
                strategies: ['client-jwt', 'client-localnetwork'],
                access: {
                    scope: ['api-client', 'admin']
                }
            },
            tags: ['sample'],
            description: 'Route sample 1'
        }
    })
    // @ts-ignore (request)
    public async postSampleRoute1(request: Request, h: ResponseToolkit) {
        try {
            const result = await this.sample.route1(request.params.testParam);

            return h.response(result).code(201);
        }
        catch (ex) {
            throw Boom.badRequest(ex.message);
        }
    }

    @route({
        method: 'GET',
        path: '/api/v1/sample/route2',
        options: {
            auth: {
                strategies: ['client-jwt', 'client-localnetwork'],
                access: {
                    scope: ['api-client', 'admin']
                }
            },
            tags: ['sample'],
            description: 'Route sample 2'
        }
    })
    // @ts-ignore (request)
    public async getSampleRoute2(request: Request, h: ResponseToolkit) {
        try {
            const result = await this.sample.route2(request.query.testParam as string);

            return h.response(result).code(200);
        }
        catch (ex) {
            throw Boom.badRequest(ex.message);
        }
    }
}
