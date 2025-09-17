import { Worker } from "bullmq";
import { transcodeVideo } from "../utils/ffmpeg";
import { uploadToS3 } from "../utils/s3";

const worker = new Worker("transcode", async job => {
  const { s3Key } = job.data;
  const localPath = `/tmp/${s3Key.split("/").pop()}`;

  // Download file from S3 to /tmp
  // (Assume a helper function downloadFromS3)
  await downloadFromS3(s3Key, localPath);

  const outputPath = `/tmp/output/${Date.now()}`;
  await transcodeVideo(localPath, outputPath);

  // Upload HLS output back to S3
  await uploadDirectoryToS3(outputPath, `hls/${Date.now()}`);
});
