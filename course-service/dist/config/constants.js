"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants = {
    JWT_SECRET: process.env.JWT_SECRET,
    // in production the log level must run in info mode because logs slow down the node thread and we just want to print what is really important to observe
    LOG_LEVEL: process.env.LOG_LEVEL
};
exports.default = constants;
