import { spawn } from "child_process";

export const transcodeVideo = async (inputPath: string, outputPath: string) => {
  return new Promise<void>((resolve, reject) => {
    const args = [
      "-i", inputPath,
      "-filter_complex",
      "[0:v]split=3[v1][v2][v3]; \
       [v1]scale=w=426:h=240[v1out]; \
       [v2]scale=w=640:h=360[v2out]; \
       [v3]scale=w=1280:h=720[v3out]",
      "-map", "[v1out]", "-c:v:0", "libx264", "-b:v:0", "400k",
      "-map", "[v2out]", "-c:v:1", "libx264", "-b:v:1", "800k",
      "-map", "[v3out]", "-c:v:2", "libx264", "-b:v:2", "1500k",
      "-map", "0:a", "-c:a", "aac",
      "-f", "hls",
      "-hls_time", "6",
      "-hls_playlist_type", "vod",
      "-hls_segment_filename", `${outputPath}/v%v/segment_%03d.ts`,
      `${outputPath}/master.m3u8`
    ];

    const ffmpeg = spawn("ffmpeg", args);

    ffmpeg.stderr.on("data", data => console.log(data.toString()));
    ffmpeg.on("close", code => {
      if (code === 0) resolve();
      else reject(`FFmpeg exited with ${code}`);
    });
  });
};
