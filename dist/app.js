"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
require("express-async-errors");
var routes_1 = __importDefault(require("./routes"));
var AppError_1 = __importDefault(require("./errors/AppError"));
var database_1 = __importDefault(require("./database"));
database_1.default();
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(function (err, request, response, _) {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.erro,
            errors: err.errors
        });
    }
    console.error(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
exports.default = app;
