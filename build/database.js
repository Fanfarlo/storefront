"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_TEST_DB = _a.POSTGRES_TEST_DB, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, BCRYPT_PASSWORD = _a.BCRYPT_PASSWORD, SALT_ROUNDS = _a.SALT_ROUNDS, ENV = _a.ENV;
var client = new pg_1.Pool();
if (ENV === 'dev') {
    client = new pg_1.Pool({
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
        host: POSTGRES_HOST
    });
}
if (ENV === 'test') {
    client = new pg_1.Pool({
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_TEST_DB,
        host: POSTGRES_HOST
    });
}
console.log(ENV);
exports["default"] = client;
