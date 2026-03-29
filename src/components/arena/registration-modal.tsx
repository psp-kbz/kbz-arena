import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Game } from "@/mock/arena-data";
import { rolesByGame } from "@/mock/arena-data";

type RegistrationModalProps = {
  isOpen: boolean;
  game: Game;
  teamName: string;
  onClose: () => void;
  onSubmit: () => void;
};

export function RegistrationModal({
  isOpen,
  game,
  teamName,
  onClose,
  onSubmit,
}: RegistrationModalProps) {
  const roles = useMemo(() => rolesByGame[game], [game]);
  const [ign, setIgn] = useState("");
  const [serverId, setServerId] = useState("");
  const [characterId, setCharacterId] = useState("");
  const [role, setRole] = useState(roles[0]);

  const handleClose = () => {
    setIgn("");
    setServerId("");
    setCharacterId("");
    setRole(roles[0]);
    onClose();
  };

  const handleSubmit = () => {
    onSubmit();
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="modal-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="page-title" style={{ marginBottom: 6 }}>
              Registration Form
            </h3>
            <p className="muted" style={{ marginBottom: 12 }}>
              Team: {teamName} ({game})
            </p>

            <div className="form-grid">
              {game === "MLBB" ? (
                <>
                  <label className="field-label">
                    In-Game Name (IGN)
                    <input
                      className="field-input"
                      placeholder="Enter IGN"
                      value={ign}
                      onChange={(event) => setIgn(event.target.value)}
                    />
                  </label>
                  <label className="field-label">
                    Server ID (4-5 digits)
                    <input
                      className="field-input"
                      placeholder="e.g. 11422"
                      value={serverId}
                      onChange={(event) =>
                        setServerId(
                          event.target.value.replace(/\D/g, "").slice(0, 5),
                        )
                      }
                    />
                  </label>
                </>
              ) : (
                <label className="field-label full">
                  Character ID (Numeric)
                  <input
                    className="field-input"
                    placeholder="Enter PUBG Character ID"
                    value={characterId}
                    onChange={(event) =>
                      setCharacterId(event.target.value.replace(/\D/g, ""))
                    }
                  />
                </label>
              )}

              <label className="field-label full">
                Role
                <select
                  className="field-input"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                >
                  {roles.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="row-actions" style={{ marginTop: 14 }}>
              <button
                className="btn btn-ghost"
                type="button"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="btn btn-solid"
                type="button"
                onClick={handleSubmit}
              >
                Submit Request
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
