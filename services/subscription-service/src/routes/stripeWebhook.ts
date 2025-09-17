import { Router } from "express";
import { stripeWebhook } from "../controllers/subscriptionController";

const router = Router();
router.post("/webhook", stripeWebhook);
export default router;
