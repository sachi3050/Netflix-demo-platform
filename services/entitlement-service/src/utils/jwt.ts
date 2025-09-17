import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET!;

export const generatePlaybackToken = (userId: number, contentId: string) => {
  return jwt.sign({ userId, contentId }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyPlaybackToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
