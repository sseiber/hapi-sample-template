
import { ConfigService } from './config';
import { LoggingService } from './logging';
import { AuthService } from './auth';
import { StorageService } from './storage';
import { StateService } from './state';
import { HealthService } from './health';
import { SampleService } from './sample';

export default [
    ConfigService,
    LoggingService,
    AuthService,
    StorageService,
    StateService,
    HealthService,
    SampleService
];
