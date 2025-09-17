import { Router } from "express";
import { getLicense } from "../controllers/licenseController";
const router = Router();
router.get("/license", getLicense);
export default router;
