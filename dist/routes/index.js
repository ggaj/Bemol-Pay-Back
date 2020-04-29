"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var sessions_routers_1 = __importDefault(require("./sessions.routers"));
var users_routers_1 = __importDefault(require("./users.routers"));
var debits_routers_1 = __importDefault(require("./debits.routers"));
var credits_routers_1 = __importDefault(require("./credits.routers"));
var routes = express_1.Router();
routes.use('/users', users_routers_1.default);
routes.use('/sessions', sessions_routers_1.default);
routes.use('/debits', debits_routers_1.default);
routes.use('/credits', credits_routers_1.default);
exports.default = routes;
