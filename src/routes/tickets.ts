import { Router } from "express";
import { allTickets } from "../controllers/ticketsController";
import middleware from "../middleware/auth";

const router = Router();

router.post("/allTickets", allTickets);
export default router;
