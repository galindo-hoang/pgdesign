"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = void 0;
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'pgdesign_dev',
        charset: 'utf8mb4',
        timezone: 'UTC'
    },
    pool: {
        min: 2,
        max: 10,
        acquireTimeoutMillis: 30000,
        createTimeoutMillis: 30000,
        destroyTimeoutMillis: 5000,
        idleTimeoutMillis: 30000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 100,
        propagateCreateError: false
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './database/migrations'
    },
    seeds: {
        directory: './database/seeds'
    },
    useNullAsDefault: true,
    debug: process.env.NODE_ENV === 'development'
};
const db = (0, knex_1.default)(config);
const testConnection = async () => {
    try {
        await db.raw('SELECT 1');
        console.log('✅ Database connection successful');
    }
    catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
};
exports.testConnection = testConnection;
exports.default = db;
//# sourceMappingURL=database.js.map