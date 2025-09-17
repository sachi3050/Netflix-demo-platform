import { Request, Response } from "express";
import { prisma } from "../utils/db";

export const trackEvent = async (req: Request, res: Response) => {
  const { userId, contentId, eventType, bitrate, rebufferTime } = req.body;

  await prisma.playbackEvent.create({
    data: { userId, contentId, eventType, bitrate, rebufferTime },
  });

  res.json({ success: true });
};
