/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

export const usePreventZoom = () => {
  useEffect(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    if (!isIOS) return;

    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content =
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    document.head.appendChild(meta);

    const handleTouchStart = (e: TouchEvent) => {
      if (
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLInputElement
      ) {
        e.target.style.fontSize = "16px";
      }
    };

    document.addEventListener("touchstart", handleTouchStart);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.head.removeChild(meta);
    };
  }, []);
};
