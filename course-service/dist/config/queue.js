"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queueConfig = {
    url: process.env.RABBIT_MQ_URL || 'amqp://localhost',
};
exports.default = queueConfig;
