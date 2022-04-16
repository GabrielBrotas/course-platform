"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueProvider = void 0;
const inversify_1 = require("inversify");
const amqplib_1 = __importDefault(require("amqplib"));
const queue_1 = __importDefault(require("../../../../config/queue"));
const LoggerProvider_1 = require("../LoggerProvider/LoggerProvider");
let QueueProvider = class QueueProvider {
    constructor(loggerProvider) {
        this.loggerProvider = loggerProvider;
        this.client = amqplib_1.default.connect(queue_1.default.url, queue_1.default.socketOptions);
    }
    async sendMessage({ queue_name, message }) {
        const channel = await this.client.then(conn => conn.createChannel());
        channel.assertQueue(queue_name, { durable: false });
        channel.sendToQueue(queue_name, Buffer.from(message));
        this.loggerProvider.debug({
            type: 'debug',
            message: `Message sent to queue ${queue_name}`,
            payload: {
                message
            }
        });
    }
};
QueueProvider = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(LoggerProvider_1.LoggerProvider)),
    __metadata("design:paramtypes", [LoggerProvider_1.LoggerProvider])
], QueueProvider);
exports.QueueProvider = QueueProvider;
