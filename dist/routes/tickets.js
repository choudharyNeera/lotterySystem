"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticketsController_1 = require("../controllers/ticketsController");
const router = (0, express_1.Router)();
router.post("/allTickets", ticketsController_1.allTickets);
exports.default = router;
