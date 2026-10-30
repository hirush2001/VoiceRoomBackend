
import { Router } from "express";
import { createToken } from "../controllers/livekit.controller.js";

const router = Router();

router.post("/token", createToken);

export default router;
