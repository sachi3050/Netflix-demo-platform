import { Router } from "express";
import multer from "multer";
import { uploadVideo } from "../controllers/ingestController";

const router = Router();
const upload = multer(); // in-memory buffer

router.post("/video", upload.single("video"), uploadVideo);
export default router;
