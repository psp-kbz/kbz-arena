import { useMemo } from "react";
import { ShieldCheck } from "lucide-react";
import { useParams } from "react-router-dom";
import { joinRequests, type RequestStatus } from "@/mock/arena-data";

const steps: RequestStatus[] = ["Request Sent", "Approved", "Paid"];

export default function RequestStatusPage() {
  const { requestId = "" } = useParams();

  const request = useMemo(
    () => joinRequests.find((item) => item.id === requestId),
    [requestId],
  );

  const activeStep = request ? steps.indexOf(request.status) : -1;

  if (!request) {
    return (
      <section className="page-card">
        <h2 className="page-title">Request Not Found</h2>
        <p className="muted">Unable to load the request status.</p>
      </section>
    );
  }

  return (
    <section className="page-stack">
      <div className="page-card">
        <p className="muted">
          {request.tournamentTitle} · {request.teamName}
        </p>
      </div>

      <div className="page-card">
        <div className="stepper">
          {steps.map((step, index) => {
            const active = index <= activeStep;
            return (
              <div className="step-row" key={step}>
                <div className="dot-wrap">
                  <span className={`dot ${active ? "active" : ""}`} />
                  {index < steps.length - 1 && <span className="line" />}
                </div>
                <p className={`step-text ${active ? "active" : ""}`}>{step}</p>
              </div>
            );
          })}
        </div>

        {request.status === "Approved" && (
          <button
            className="btn btn-solid"
            type="button"
            style={{ marginTop: 14 }}
          >
            <ShieldCheck
              size={16}
              style={{ verticalAlign: "text-top", marginRight: 8 }}
            />
            Pay with KBZPay
          </button>
        )}
      </div>
    </section>
  );
}
