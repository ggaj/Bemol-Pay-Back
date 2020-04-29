"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppError = /** @class */ (function () {
    function AppError(erro, statusCode, errors) {
        if (statusCode === void 0) { statusCode = 400; }
        if (errors === void 0) { errors = []; }
        this.erro = erro;
        this.statusCode = statusCode;
        this.errors = errors;
    }
    return AppError;
}());
exports.default = AppError;
