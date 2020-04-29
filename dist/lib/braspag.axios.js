"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv/config');
var axios_1 = __importDefault(require("axios"));
var braspapApi = function (transaction) { return axios_1.default.create({
    baseURL: "" + (transaction ? process.env.URL_TRANSACTION : process.env.URL_SERVICE),
    headers: {
        Merchantid: process.env.MERCHANT_ID,
        MerchantKey: process.env.MERCHANT_KEY
    }
}); };
exports.default = braspapApi;
