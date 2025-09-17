import { Router } from "express";
import { checkEntitlement } from "../controllers/entitlementController";

const router = Router();
router.post("/check", checkEntitlement);

export default router;
