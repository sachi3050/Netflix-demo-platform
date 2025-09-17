import { Request, Response } from "express";
import { uploadToS3 } from "../utils/s3";
import { Queue } from "bullmq"; // Queue for transcoder jobs

const transcoderQueue = new Queue("transcode", { connection: { host: process.env.REDIS_HOST } });

export const uploadVideo = async (req: Request, res: Response) => {
  const file = req.file; // Multer middleware
  if (!file) return res.status(400).json({ error: "No file uploaded" });

  const s3Key = `uploads/${Date.now()}_${file.originalname}`;
  await uploadToS3(s3Key, file.buffer);

  // Push job to transcoder
  await transcoderQueue.add("transcode-job", { s3Key });

  res.json({ message: "Upload successful", s3Key });
};
