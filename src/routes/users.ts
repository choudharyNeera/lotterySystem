import { Router, Request, Response } from "express";
import { createUser, profileDetail } from "../controllers/usersController";
import middleware from "../middleware/auth";

const router = Router();

router.post("/signUp", createUser);

router.get("/Profile", middleware, profileDetail);

export default router;
