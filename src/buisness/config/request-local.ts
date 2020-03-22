export const localConfig = {
    protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
    domain: process.env.NODE_ENV === 'production' ? '127.0.0.1:8000' : '127.0.0.1:8000',
    version: 1
};
