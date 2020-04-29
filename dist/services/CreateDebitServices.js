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
var typeorm_1 = require("typeorm");
var Transaction_1 = __importDefault(require("../models/Transaction"));
var braspag_axios_1 = __importDefault(require("../lib/braspag.axios"));
var BraspagValidations_1 = __importDefault(require("../validations/BraspagValidations"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var CreateDebitServices = /** @class */ (function () {
    function CreateDebitServices() {
    }
    CreateDebitServices.prototype.execute = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var body, data, transactionRepository, transaction, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, BraspagValidations_1.default(payload)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        body = {
                            MerchantOrderId: payload.id,
                            Customer: {
                                Name: payload.name
                            },
                            Payment: {
                                Provider: process.env.API_BRASPAG_PROVIDER,
                                Type: payload.type,
                                Amount: payload.amount,
                                Installments: payload.installments,
                                Capture: payload.capture || false,
                                Authenticate: payload.authenticate || false,
                                DebitCard: {
                                    CardNumber: payload.cardNumber,
                                    Holder: payload.holder,
                                    ExpirationDate: payload.expirationDate,
                                    SecurityCode: payload.securityCode,
                                    Brand: payload.brand
                                }
                            }
                        };
                        return [4 /*yield*/, braspag_axios_1.default(true).post('/v2/sales', body)];
                    case 3:
                        data = (_a.sent()).data;
                        transactionRepository = typeorm_1.getRepository(Transaction_1.default);
                        transaction = transactionRepository.create({
                            order_id: data.MerchantOrderId,
                            name: data.Customer.Name,
                            type: data.Payment.Type,
                            amount: data.Payment.Amount,
                            installments: 1,
                            card_number: data.Payment.DebitCard.CardNumber,
                            holder: data.Payment.DebitCard.Holder,
                            expiration_date: data.Payment.DebitCard.ExpirationDate,
                            brand: data.Payment.DebitCard.Brand,
                            authorization_code: data.Payment.AuthorizationCode,
                            payment_id: data.Payment.PaymentId,
                            received_date: data.Payment.ReceivedDate,
                            captured: payload.capture || false,
                            provider: data.Payment.Provider,
                            status: data.Payment.Status,
                        });
                        return [4 /*yield*/, transactionRepository.save(transaction)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, transaction];
                    case 5:
                        error_1 = _a.sent();
                        console.error(error_1);
                        throw new AppError_1.default('Create fails transaction debit card in Braspag');
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return CreateDebitServices;
}());
exports.default = CreateDebitServices;
