import { service, inject } from 'spryly';
import { LoggingService } from './logging';
import { SampleService } from './sample';
import {
    SampleModuleFieldIds,
    IoTCentralService
} from './iotcentral';
import * as _get from 'lodash.get';
import { bind } from '../utils';

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

    @inject('iotCentral')
    private iotCentral: IoTCentralService;

    private heathCheckStartTime = Date.now();
    private failingStreak = 1;

    public async init() {
        this.logger.log(['HealthService', 'info'], 'initialize');

        if (_get(process.env, 'LOCAL_DEBUG') === '1') {
            setInterval(async () => {
                await this.checkHealthState();
            }, (1000 * 15));
        }
    }

    @bind
    public async checkHealthState(): Promise<number> {
        const sampleServiceHealth = await this.sample.getHealth();
        const iotCentralHealth = await this.iotCentral.getHealth();
        let healthState = HealthState.Good;

        await this.iotCentral.sendTelemetryData({
            [SampleModuleFieldIds.Telemetry.DeviceHeartbeat]: sampleServiceHealth + iotCentralHealth
        });

        if (sampleServiceHealth < HealthState.Good || iotCentralHealth < HealthState.Good) {

            this.logger.log(['HealthService', 'warning'], `Health check watch - s:${sampleServiceHealth} i:${iotCentralHealth}`);

            if ((Date.now() - this.heathCheckStartTime) > (1000 * healthCheckStartPeriod) && ++this.failingStreak >= healthCheckRetries) {
                this.logger.log(['HealthService', 'warning'], `Restart service here...`);
            }

            healthState = HealthState.Critical;
        }

        return healthState;
    }
}
