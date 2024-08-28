import { useInitData } from "@telegram-apps/sdk-react";
import { useEffect, useRef, useState, type FC } from "react";

export const GamePage: FC = () => {
  const initData = useInitData();
  const [isGameReady, setGameReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleIframeMessage = (event: MessageEvent) => {
      // if (event.origin !== "http://localhost:8080") return;
      if (event.origin !== "https://imota-slots-demo.vercel.app") return;

      if (event.data.type === "SLOTS_GAME_READY") {
        setGameReady(true);
      }
    };

    window.addEventListener("message", handleIframeMessage);

    return () => {
      window.removeEventListener("message", handleIframeMessage);
    };
  }, []);

  useEffect(() => {
    if (isGameReady && initData && iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        { payload: initData, type: "TELEGRAM_INIT_DATA" },
        "*",
      );
    }
  }, [initData, isGameReady]);
  return (
    <div style={{ width: "100%", height: "848px" }}>
      <iframe
        ref={iframeRef}
        src="https://imota-slots-demo.vercel.app"
        // src="http://localhost:8080"
        title="Example Iframe"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
};
