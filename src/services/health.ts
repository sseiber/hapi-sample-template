import { service, inject } from 'spryly';
import { LoggingService } from './logging';
import { SampleService } from './sample';
import * as _get from 'lodash.get';
import { bind, forget } from '../utils';

// const healthCheckInterval = 30;
// const healthCheckTimeout = 30;
const healthCheckStartPeriod = 60;
const healthCheckRetries = 3;

export const HealthState = {
    Good: 1,
    Warning: 0,
    Critical: 0
};

@service('health')
export class HealthService {
    @inject('logger')
    private logger: LoggingService;

    @inject('sample')
    private sample: SampleService;

    private heathCheckStartTime = Date.now();
    private failingStreak = 1;

    public async init() {
        this.logger.log(['HealthService', 'info'], 'initialize');

        if (_get(process.env, 'LOCAL_DEBUG') === '1') {
            setInterval(() => {
                forget(this.checkHealthState);
            }, (1000 * 15));
        }
    }

    @bind
    public async checkHealthState(): Promise<number> {
        const sampleServiceHealth = await this.sample.getHealth();
        let healthState = HealthState.Good;

        if (sampleServiceHealth < HealthState.Good) {

            this.logger.log(['HealthService', 'warning'], `Health check watch:${sampleServiceHealth}`);

            if ((Date.now() - this.heathCheckStartTime) > (1000 * healthCheckStartPeriod) && ++this.failingStreak >= healthCheckRetries) {
                this.logger.log(['HealthService', 'warning'], `Restart service here...`);
            }

            healthState = HealthState.Critical;
        }

        return healthState;
    }
}
