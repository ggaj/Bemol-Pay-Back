"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = __importDefault(require("../config/auth"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var ensureAuthenticated = function (request, response, next) {
    var authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.default('JWT token is missing', 401);
    }
    var _a = authHeader.split(' '), token = _a[1];
    try {
        var decode = jsonwebtoken_1.verify(token, auth_1.default.jwt.secret);
        var sub = decode.sub;
        request.user = {
            id: sub,
        };
        return next();
    }
    catch (_b) {
        throw new AppError_1.default('Invalid JWT token', 401);
    }
};
exports.default = ensureAuthenticated;
