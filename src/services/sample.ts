import { service, inject } from 'spryly';
import { Server } from '@hapi/hapi';
import { ConfigService } from './config';
import { LoggingService } from './logging';
import { StateService } from './state';
import { HealthState } from './health';
import { bind } from '../utils';

export interface IRequestResult {
    status: boolean;
    title: string;
    message: string;
    body?: any;
}

@service('sample')
export class SampleService {
    @inject('$server')
    private server: Server;

    @inject('config')
    private config: ConfigService;

    @inject('logger')
    private logger: LoggingService;

    @inject('state')
    private state: StateService;

    private healthState = HealthState.Good;
    private sampleSetting1: string = '';
    private sampleSetting2: string = '';

    public async init(): Promise<void> {
        this.logger.log(['SampleService', 'info'], 'initialize');

        this.server.method({ name: 'sample.startModule', method: this.startModule });

        // read some state from the device itself - sometimes handy
        // for device configuration scenarios
        this.logger.log(['SampleService', 'info'], `State configuration is: ${JSON.stringify(this.state.data, null, 4)}`);

        this.healthState = HealthState.Good;
        this.sampleSetting1 = this.config.get('sampleSetting1');
        this.sampleSetting2 = this.config.get('sampleSetting2');
    }

    @bind
    public async startModule(): Promise<void> {
        setTimeout(() => {
            this.logger.log(['SampleService', 'info'], `In procesing callback`);
        }, (1000 * 15));
    }

    public async sampleTest1(testParam: string): Promise<IRequestResult> {
        this.logger.log(['SampleService', 'info'], `In route1 handler with testParam ${testParam}`);

        const result: IRequestResult = {
            status: true,
            title: 'Route1 Handler',
            message: 'Success'
        };

        try {
            this.logger.log(['SampleService', 'info'], `SampleSetting1 to old value: ${this.sampleSetting1}`);

            this.sampleSetting1 = Math.floor(100000 + Math.random() * 900000).toString();
            this.logger.log(['SampleService', 'info'], `Setting sampleSetting1 to new value: ${this.sampleSetting1}`);
        }
        catch (ex) {
            this.logger.log(['SampleService', 'error'], ex.message);

            result.status = false;
            result.message = 'Error';
        }

        return result;
    }

    public async sampleTest2(testParam: string): Promise<IRequestResult> {
        this.logger.log(['SampleService', 'info'], `In route2 handler with testParam ${testParam}`);

        const result: IRequestResult = {
            status: true,
            title: 'Route2 Handler',
            message: 'Success'
        };

        try {
            this.logger.log(['SampleService', 'info'], `SampleSetting2 to old value: ${this.sampleSetting2}`);

            this.sampleSetting2 = Math.floor(100000 + Math.random() * 900000).toString();
            this.logger.log(['SampleService', 'info'], `Setting sampleSetting2 to new value: ${this.sampleSetting2}`);
        }
        catch (ex) {
            this.logger.log(['SampleService', 'error'], ex.message);

            result.status = false;
            result.message = 'Error';
        }

        return result;
    }

    public async getHealth(): Promise<number> {
        return this.healthState;
    }
}
