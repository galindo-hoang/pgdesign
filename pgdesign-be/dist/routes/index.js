"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homepage_1 = __importDefault(require("./homepage"));
const intropage_1 = __importDefault(require("./intropage"));
const projectpage_1 = __importDefault(require("./projectpage"));
const router = (0, express_1.Router)();
const API_VERSION = 'v1';
router.use(`/${API_VERSION}/homepage`, homepage_1.default);
router.use(`/${API_VERSION}/intropage`, intropage_1.default);
router.use(`/${API_VERSION}/projectpage`, projectpage_1.default);
router.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        version: API_VERSION
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map