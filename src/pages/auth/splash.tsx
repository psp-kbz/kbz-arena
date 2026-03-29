import { useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo/KBZArena-logo.png";

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate("/home", { replace: true });
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [navigate]);

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
