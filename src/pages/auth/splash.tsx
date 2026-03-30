import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo/KBZArena-logo.png";
import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";
import { getAuthCodeAsync, requestTokenAsync, splashLoginAsync } from "./query";

export function Splash() {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUser = useUserStore((state) => state.setUser);
  const [statusMessage, setStatusMessage] = useState("Preparing your arena...");
  const [errorMessage, setErrorMessage] = useState("");
  const startedRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (startedRef.current) {
      return;
    }

    startedRef.current = true;
    let cancelled = false;

    (async () => {
      try {
        setStatusMessage("Requesting access token...");
        const tokenResponse = await requestTokenAsync();
        const accessToken = tokenResponse.access_token;

        if (!accessToken) {
          throw new Error("Access token is missing in token response");
        }

        if (!cancelled) {
          setAccessToken(accessToken);
        }

        setStatusMessage("Getting authorization code...");
        const authCode = await getAuthCodeAsync();

        if (!authCode) {
          throw new Error("Auth code is missing");
        }

        setStatusMessage("Signing you in...");
        const loginResponse = await splashLoginAsync(authCode);

        const user = loginResponse.result;

        if (!cancelled) {
          setUser(user ?? null);
          setStatusMessage("Welcome to KBZ Arena");
          timerRef.current = window.setTimeout(() => {
            navigate("/home", { replace: true });
          }, 700);
        }
      } catch (error) {
        console.error("Splash auto login failed:", error);

        if (!cancelled) {
          setErrorMessage("Unable to auto login. You can still continue.");
          setStatusMessage("Auto login failed");
        }
      }
    })();

    return () => {
      cancelled = true;
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [navigate, setAccessToken, setUser]);

  return (
    <section className="splash-screen">
      <div className="splash-glow splash-glow-left" />
      <div className="splash-glow splash-glow-right" />

      <motion.div
        className="splash-shell"
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.img
          className="splash-logo"
          src={logo}
          alt="KBZ Arena"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        />

        <motion.div
          className="splash-copy"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
        >
          <p className="splash-kicker">KBZ Arena</p>
          <h1 className="splash-title">Tournament Hub</h1>
          <p className="splash-text">
            Squad up, register fast, and enter the arena.
          </p>
          <p className="splash-text">{statusMessage}</p>
          {errorMessage && <p className="splash-text">{errorMessage}</p>}
        </motion.div>

        <motion.button
          className="splash-skip"
          type="button"
          onClick={() => navigate("/home", { replace: true })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.45 }}
        >
          Enter Arena <ChevronRight size={16} />
        </motion.button>
      </motion.div>
    </section>
  );
}
