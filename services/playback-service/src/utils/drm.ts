import crypto from "crypto";

export const generateAESKey = () => {
  return crypto.randomBytes(16); // 128-bit AES
};

export const encryptSegment = (segment: Buffer, key: Buffer) => {
  const cipher = crypto.createCipheriv("aes-128-cbc", key, Buffer.alloc(16, 0));
  return Buffer.concat([cipher.update(segment), cipher.final()]);
};
