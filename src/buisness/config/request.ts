import * as _ from 'lodash';
import { localConfig } from './request-local';

const defaultConfig = {
  protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
  domain:
    process.env.NODE_ENV === 'production'
      ? 'api.beta.litota.com.ua'
      : 'api.litota.local',
  site:
    process.env.NODE_ENV === 'production' ? 'litota.com.ua' : 'litota.local',
  version: 1,
};

let local = localConfig;
if (_.isUndefined(local)) {
  local = {
    protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
    domain:
      process.env.NODE_ENV === 'production'
        ? 'api.beta.litota.com.ua'
        : 'api.litota.local',
    site:
      process.env.NODE_ENV === 'production' ? 'litota.com.ua' : 'litota.local',
    version: 1,
  };
}

export default _.merge(defaultConfig, local);
