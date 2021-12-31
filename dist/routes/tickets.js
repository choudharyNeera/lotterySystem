"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticketsController_1 = require("../controllers/ticketsController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.get("/allTickets", ticketsController_1.allTickets);
router.get("/:ticketId", auth_1.default, ticketsController_1.ticketById);
exports.default = router;
