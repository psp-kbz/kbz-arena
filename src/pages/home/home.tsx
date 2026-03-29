import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Coins, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { tournaments, type Game } from "@/mock/arena-data";

export default function Home() {
  const [selectedGame, setSelectedGame] = useState<Game>("MLBB");
  const navigate = useNavigate();

  const filteredTournaments = useMemo(
    () => tournaments.filter((item) => item.game === selectedGame),
    [selectedGame],
  );

  return (
    <section className="page-stack">
      <div className="page-card game-toggle">
        <button
          type="button"
          className={`toggle-btn ${selectedGame === "MLBB" ? "active mlbb" : ""}`}
          onClick={() => setSelectedGame("MLBB")}
        >
          MLBB
        </button>
        <button
          type="button"
          className={`toggle-btn ${selectedGame === "PUBG" ? "active pubg" : ""}`}
          onClick={() => setSelectedGame("PUBG")}
        >
          PUBG
        </button>
      </div>

      <div className="page-grid">
        {filteredTournaments.map((item) => (
          <motion.article
            key={item.id}
            className="page-card"
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <div className={`tournament-thumb ${item.game.toLowerCase()}`}>
              <span className="badge">{item.badge}</span>
              <Trophy size={18} />
            </div>

            <div className="meta-grid">
              <strong>{item.title}</strong>
              <p className="muted row-inline">
                <Coins size={14} /> {item.prizePool}
              </p>
              <p className="muted row-inline">
                <CalendarDays size={14} /> {item.date}
              </p>
            </div>

            <div className="row-actions" style={{ marginTop: 12 }}>
              <button
                className="btn btn-solid"
                type="button"
                onClick={() => navigate(`/tournaments/${item.id}/teams`)}
              >
                Team Selection
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
