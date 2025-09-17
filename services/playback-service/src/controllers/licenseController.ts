import { Request, Response } from "express";
import { generateAESKey } from "../utils/drm";

export const getLicense = async (req: Request, res: Response) => {
  // Validate playback token
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No token");

  // Generate DRM key
  const key = generateAESKey();
  res.json({ key: key.toString("base64") });
};
