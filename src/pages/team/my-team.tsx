import { useState } from "react";
import {
  Clipboard,
  Crown,
  Headphones,
  Shield,
  Swords,
  Target,
  Users,
} from "lucide-react";
import { myTeam } from "@/mock/arena-data";

const roleIconMap: Record<string, typeof Swords> = {
  Jungler: Swords,
  Roamer: Shield,
  Mid: Target,
  "Gold Lane": Crown,
  "EXP Lane": Shield,
  IGL: Crown,
  Sniper: Target,
  Fragger: Swords,
  Scout: Users,
};

export default function MyTeamPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyDiscord = async () => {
    await navigator.clipboard.writeText(myTeam.discordChannel);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="page-stack">
      <div className="page-card team-hero-card">
        <div className="team-hero-top">
          <div>
            <p className="team-kicker">Active Squad</p>
            <p className="page-title">{myTeam.name}</p>
            <p className="muted">{myTeam.game}</p>
          </div>
          <span className="team-mark">
            {myTeam.name.slice(0, 2).toUpperCase()}
          </span>
        </div>

        <div className="team-meta-grid mt-16">
          <div className="team-meta-card">
            <p className="muted">Tournament</p>
            <strong>{myTeam.tournament}</strong>
          </div>
          <div className="team-meta-card">
            <p className="muted">Members</p>
            <strong>{myTeam.members.length} Players</strong>
          </div>
        </div>
      </div>

      <div className="page-card">
        <div className="row-between">
          <div>
            <h3 className="sub-title">Discord Channel</h3>
            <p className="muted">Joinable squad voice and match coordination</p>
          </div>
          <Headphones size={18} />
        </div>

        <div className="discord-box mt-12">
          <p className="discord-link">{myTeam.discordChannel}</p>
          <button
            className="btn btn-solid"
            type="button"
            onClick={handleCopyDiscord}
          >
            <Clipboard size={16} />
            <span>{copied ? "Copied" : "Copy Link"}</span>
          </button>
        </div>
      </div>

      <div className="page-card">
        <div className="row-between">
          <div>
            <h3 className="sub-title">Squad Members</h3>
            <p className="muted">Roles and current lineup</p>
          </div>
          <Users size={18} />
        </div>

        <div className="team-member-list mt-16">
          {myTeam.members.map((member) => {
            const Icon = roleIconMap[member.role] ?? Users;

            return (
              <article className="team-member-row" key={member.id}>
                <div className="team-member-main">
                  <span className="team-role-icon">
                    <Icon size={16} />
                  </span>
                  <div>
                    <p className="team-member-name">{member.name}</p>
                    <p className="muted">{member.role}</p>
                  </div>
                </div>

                <span
                  className={`status-chip ${member.status === "Captain" ? "paid" : "request-sent"}`}
                >
                  {member.status}
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
