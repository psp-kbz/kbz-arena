import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Users } from "lucide-react";
import { RegistrationModal } from "@/components/arena/registration-modal";
import { teams, tournaments } from "@/mock/arena-data";

export default function TeamSelectionPage() {
  const navigate = useNavigate();
  const { tournamentId = "" } = useParams();
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  const tournament = useMemo(
    () => tournaments.find((item) => item.id === tournamentId),
    [tournamentId],
  );

  const availableTeams = useMemo(
    () => teams.filter((team) => team.tournamentId === tournamentId),
    [tournamentId],
  );

  const selectedTeam = useMemo(
    () => availableTeams.find((team) => team.id === selectedTeamId) ?? null,
    [availableTeams, selectedTeamId],
  );

  if (!tournament) {
    return (
      <section className="page-card">
        <h2 className="page-title">Tournament Not Found</h2>
        <p className="muted">This tournament may have been removed.</p>
      </section>
    );
  }

  return (
    <section className="page-stack">
      <div className="page-card">
        <p className="muted">
          {tournament.title} · {tournament.game}
        </p>
      </div>

      <div className="page-grid">
        {availableTeams.map((team) => (
          <article className="page-card" key={team.id}>
            <div className="row-between">
              <div className="row-inline">
                <span className="avatar-badge">{team.logo}</span>
                <strong>{team.name}</strong>
              </div>
              <span className="muted row-inline">
                <Users size={14} /> {team.slots}
              </span>
            </div>

            <div className="members-box">
              <p className="muted" style={{ marginBottom: 6 }}>
                Current members
              </p>
              <ul className="compact-list">
                {team.members.map((member) => (
                  <li key={member}>{member}</li>
                ))}
              </ul>
            </div>

            <div className="row-actions mt-12">
              <button
                className="btn btn-solid btn-block"
                type="button"
                onClick={() => setSelectedTeamId(team.id)}
              >
                Register
              </button>
            </div>
          </article>
        ))}
      </div>

      <RegistrationModal
        isOpen={!!selectedTeam}
        game={tournament.game}
        teamName={selectedTeam?.name ?? ""}
        onClose={() => setSelectedTeamId(null)}
        onSubmit={() => navigate("/requests")}
      />
    </section>
  );
}
