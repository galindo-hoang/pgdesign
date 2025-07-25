"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homepage_1 = __importDefault(require("./homepage"));
const intropage_1 = __importDefault(require("./intropage"));
const projectpage_1 = __importDefault(require("./projectpage"));
const servicepage_1 = __importDefault(require("./servicepage"));
const consultation_1 = __importDefault(require("./consultation"));
const projectdetail_1 = __importDefault(require("./projectdetail"));
const blogpage_1 = __importDefault(require("./blogpage"));
const projectsubcategories_1 = __importDefault(require("./projectsubcategories"));
const upload_1 = __importDefault(require("./upload"));
const router = (0, express_1.Router)();
const API_VERSION = 'v1';
router.use(`/${API_VERSION}/homepage`, homepage_1.default);
router.use(`/${API_VERSION}/intropage`, intropage_1.default);
router.use(`/${API_VERSION}/projectpage`, projectpage_1.default);
router.use(`/${API_VERSION}/servicepage`, servicepage_1.default);
router.use(`/${API_VERSION}/consultation`, consultation_1.default);
router.use(`/${API_VERSION}/projectdetail`, projectdetail_1.default);
router.use(`/${API_VERSION}/blogpage`, blogpage_1.default);
router.use(`/${API_VERSION}/projectsubcategories`, projectsubcategories_1.default);
router.use(`/${API_VERSION}/upload`, upload_1.default);
router.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        version: API_VERSION
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map