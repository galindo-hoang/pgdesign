"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ConsultationController_1 = require("../controllers/ConsultationController");
const validateContentType_1 = require("../middleware/validateContentType");
const router = express_1.default.Router();
const consultationController = new ConsultationController_1.ConsultationController();
router.post('/submit', validateContentType_1.validateContentType, consultationController.submitConsultationForm);
router.get('/health', consultationController.getEmailServiceStatus);
exports.default = router;
//# sourceMappingURL=consultation.js.map