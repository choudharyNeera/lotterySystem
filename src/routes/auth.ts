import { Router } from "express";
import { login } from "../controllers/usersController";

const router = Router();

router.post("/login", login);

export default router;
