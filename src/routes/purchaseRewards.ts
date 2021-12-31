import { Router } from "express";
import {
  purchaseTicket,
  findWinner,
} from "../controllers/purchseRewardsController";
import middleware from "../middleware/auth";

const router = Router();

router.get("/:ticketId", middleware, purchaseTicket);
router.get("/findWinner/:ticketId", findWinner);
export default router;
