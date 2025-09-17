import { Request, Response } from "express";
import axios from "axios";
import { prisma } from "../models/user";
import { generateToken } from "../utils/jwt";

export const googleCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  // Exchange code for access token
  const tokenRes = await axios.post(`https://oauth2.googleapis.com/token`, {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    grant_type: "authorization_code",
  });

  const accessToken = tokenRes.data.access_token;

  // Fetch user info
  const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const { email, name, id: providerId } = userInfo.data;

  const user = await prisma.user.upsert({
    where: { email },
    update: { lastLogin: new Date() },
    create: { email, name, providerId, provider: "google" },
  });

  const token = generateToken(user.id, user.email);
  res.json({ token });
};
