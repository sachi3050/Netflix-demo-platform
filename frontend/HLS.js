import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface PlayerProps { manifestUrl: string; token: string; userId: number; contentId: string }

export const Player: React.FC<PlayerProps> = ({ manifestUrl, token, userId, contentId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hls = new Hls();
    hls.loadSource(manifestUrl);
    hls.attachMedia(video);

    video.addEventListener("play", () => trackEvent("play"));
    video.addEventListener("pause", () => trackEvent("pause"));
    video.addEventListener("waiting", () => trackEvent("buffering"));
    video.addEventListener("error", () => trackEvent("error"));

    const trackEvent = async (eventType: string) => {
      await fetch("https://analytics.example.com/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, contentId, eventType }),
      });
    };

    return () => hls.destroy();
  }, [manifestUrl]);

  return <video ref={videoRef} controls autoPlay style={{ width: "100%" }} />;
};
