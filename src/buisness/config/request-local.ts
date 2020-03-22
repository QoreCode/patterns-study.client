export const localConfig = {
  protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
  domain:
    process.env.NODE_ENV === 'production'
      ? 'api.beta.litota.com.ua'
      : 'api.litota.local',
  site:
    process.env.NODE_ENV === 'production' ? 'litota.com.ua' : 'litota.local',
  version: 1,
};
