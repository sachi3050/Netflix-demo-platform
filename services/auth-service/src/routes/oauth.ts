import { Router } from "express";
import { googleCallback } from "../controllers/authController";

const router = Router();
router.get("/google/callback", googleCallback);

export default router;
