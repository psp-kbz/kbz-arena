import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { joinRequests } from "@/mock/arena-data";

export default function RequestHistoryPage() {
  const navigate = useNavigate();

  const requests = useMemo(() => joinRequests, []);

  return (
    <section className="page-stack">
      <div className="page-grid">
        {requests.map((request) => (
          <article className="page-card" key={request.id}>
            <div className="row-between" style={{ marginBottom: 8 }}>
              <strong>{request.tournamentTitle}</strong>
              <span
                className={`status-chip ${request.status.toLowerCase().replace(" ", "-")}`}
              >
                {request.status}
              </span>
            </div>

            <p className="muted">{request.teamName}</p>
            <p className="muted">Applied: {request.appliedAt}</p>

            <div className="row-actions" style={{ marginTop: 12 }}>
              <button
                className="btn btn-solid"
                type="button"
                onClick={() => navigate(`/requests/${request.id}/status`)}
              >
                View Status & Payment
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
