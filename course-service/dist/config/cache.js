"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cacheConfig = {
    driver: 'redis',
    config: {
        redis: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            password: process.env.REDIS_PASS || undefined,
        },
    },
};
exports.default = cacheConfig;
