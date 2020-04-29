"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var typeorm_1 = require("typeorm");
var database_1 = __importDefault(require("../database"));
var app_1 = __importDefault(require("../app"));
var connection;
describe('Transaction', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default('test-connection')];
                case 1:
                    connection = _a.sent();
                    return [4 /*yield*/, connection.runMigrations()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.query('DELETE FROM users')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.query('DELETE FROM transactions')];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var mainConnection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mainConnection = typeorm_1.getConnection();
                    return [4 /*yield*/, connection.close()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, mainConnection.close()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able create new users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).post('/users').send({
                        name: 'Gildo Jr',
                        email: 'gildoaraujo@bemol.com.br',
                        password: '123456'
                    })];
                case 1:
                    user = _a.sent();
                    expect(user.status).toBe(200);
                    expect(user.body).toMatchObject(expect.objectContaining({
                        id: expect.any(String),
                        name: 'Gildo Jr',
                        email: 'gildoaraujo@bemol.com.br',
                        created_at: expect.any(String),
                        updated_at: expect.any(String),
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be not able create users with duplicate mail', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user1, user2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).post('/users').send({
                        name: 'Gildo Jr',
                        email: 'gildoaraujo@bemol.com.br',
                        password: '123456'
                    })];
                case 1:
                    user1 = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default).post('/users').send({
                            name: 'Gildo Jr',
                            email: 'gildoaraujo@bemol.com.br',
                            password: '123456'
                        })];
                case 2:
                    user2 = _a.sent();
                    expect(user2.status).toBe(400);
                    expect(user2.body).toEqual(expect.objectContaining({
                        status: 'error',
                        message: "Email address already used",
                        errors: [],
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
});
