import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET!;

export const generateToken = (userId: number, email: string) => {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
