import * as _ from 'lodash';
import {localConfig} from './request-local';

const defaultConfig = {
    protocol: process.env.NODE_ENV === 'production' ? 'https' : 'https',
    domain: process.env.NODE_ENV === 'production' ? 'patterns-study.api' : 'patterns-study.api',
    version: 1
};

export default _.merge(defaultConfig, localConfig);
