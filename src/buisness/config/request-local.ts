export const localConfig = {
    protocol: process.env.NODE_ENV === 'production' ? 'https' : 'https',
    domain: process.env.NODE_ENV === 'production' ? 'patterns-study.api' : 'patterns-study.api',
    version: 1
};
