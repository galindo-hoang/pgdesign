"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateContentType_1 = require("../middleware/validateContentType");
const ConsultationController_1 = __importDefault(require("../controllers/ConsultationController"));
const router = (0, express_1.Router)();
router.post('/submit', validateContentType_1.validateContentType, ConsultationController_1.default.submitConsultationForm);
router.get('/status', ConsultationController_1.default.getEmailServiceStatus);
exports.default = router;
//# sourceMappingURL=consultation.js.map