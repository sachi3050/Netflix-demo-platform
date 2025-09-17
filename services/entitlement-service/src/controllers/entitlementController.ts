import { Request, Response } from "express";
import { generatePlaybackToken } from "../utils/jwt";
import { prisma } from "../models/subscription"; // subscription DB

export const checkEntitlement = async (req: Request, res: Response) => {
  const { userId, contentId } = req.body;

  // Fetch subscription
  const sub = await prisma.subscription.findFirst({
    where: { userId, status: "active" },
  });

  if (!sub) return res.status(403).json({ error: "No active subscription" });

  // Generate playback JWT
  const token = generatePlaybackToken(userId, contentId);
  res.json({ playbackToken: token });
};
