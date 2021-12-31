import { Router } from "express";
import { allTickets, ticketById } from "../controllers/ticketsController";
import middleware from "../middleware/auth";

const router = Router();

router.get("/allTickets", allTickets);
router.get("/:ticketId", middleware, ticketById);
export default router;
