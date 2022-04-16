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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheProvider = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const inversify_1 = require("inversify");
const cache_1 = __importDefault(require("../../../../config/cache"));
let CacheProvider = class CacheProvider {
    constructor() {
        this.client = new ioredis_1.default(cache_1.default.config.redis);
    }
    async save(key, value) {
        await this.client.set(key, JSON.stringify(value));
    }
    async recover(key) {
        const data = await this.client.get(key);
        if (!data)
            return null;
        return JSON.parse(data);
    }
    async invalidate(key) {
        await this.client.del(key);
    }
    async invalidatePrefix(prefix) {
        // pegar todos as chaves que começa com o prefixo passado, ex: providers-list:*<qualquer valor>
        const keys = await this.client.keys(`${prefix}:*`);
        // executar varias ações ao mesmo tempo de maneira performatica
        const pipeline = this.client.pipeline();
        keys.forEach((key) => {
            pipeline.del(key);
        });
        await pipeline.exec();
    }
};
CacheProvider = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], CacheProvider);
exports.CacheProvider = CacheProvider;
