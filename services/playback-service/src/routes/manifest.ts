import { Router } from "express";
import { getManifest } from "../controllers/playbackController";
const router = Router();
router.get("/manifest", getManifest);
export default router;
