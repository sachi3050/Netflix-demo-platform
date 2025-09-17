import AWS from "aws-sdk";

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const uploadToS3 = async (key: string, buffer: Buffer) => {
  await s3
    .putObject({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
      Body: buffer,
      ContentType: "video/mp4",
    })
    .promise();
  return `s3://${process.env.S3_BUCKET}/${key}`;
};
