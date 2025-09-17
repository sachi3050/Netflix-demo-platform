import { Request, Response } from "express";
import { verifyPlaybackToken } from "../utils/jwt";

export const getManifest = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    verifyPlaybackToken(token);
    const manifestUrl = `https://cdn.example.com/hls/video123/master.m3u8`;
    res.json({ manifestUrl });
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};
