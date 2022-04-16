"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerProvider = void 0;
const pino_1 = __importDefault(require("pino"));
const inversify_1 = require("inversify");
const constants_1 = __importDefault(require("../../../../config/constants"));
const pinoLogger = (0, pino_1.default)({
    level: constants_1.default.LOG_LEVEL,
});
const parseLoggerInputToPinoFormat = ({ message, error, ...data }) => ({
    msg: message,
    err: error,
    ...data,
});
let LoggerProvider = class LoggerProvider {
    debug(logData) {
        pinoLogger.debug(parseLoggerInputToPinoFormat(logData));
    }
    async info(logData) {
        pinoLogger.info(parseLoggerInputToPinoFormat(logData));
    }
    async warn(logData) {
        pinoLogger.warn(parseLoggerInputToPinoFormat(logData));
    }
    async error(logData) {
        pinoLogger.error(parseLoggerInputToPinoFormat(logData));
    }
};
LoggerProvider = __decorate([
    (0, inversify_1.injectable)()
], LoggerProvider);
exports.LoggerProvider = LoggerProvider;
