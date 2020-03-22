import * as _ from 'lodash';
import {localConfig} from './request-local';

const defaultConfig = {
    protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
    domain: process.env.NODE_ENV === 'production' ? '127.0.0.1:8000' : '127.0.0.1:8000',
    version: 1
};

export default _.merge(defaultConfig, localConfig);
