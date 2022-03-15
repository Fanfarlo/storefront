"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
var { POSTGRES_HOST, POSTGRES_USER, POSTGRES_TEST_DB, POSTGRES_DB, POSTGRES_PASSWORD, BCRYPT_PASSWORD, SALT_ROUNDS, ENV } = process.env;
var client = new pg_1.Pool;
console.log(ENV);
if (ENV === 'dev') {
    client = new pg_1.Pool({
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
        host: POSTGRES_HOST,
    });
}
if (ENV === 'test') {
    client = new pg_1.Pool({
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_TEST_DB,
        host: POSTGRES_HOST,
    });
}
exports.default = client;
