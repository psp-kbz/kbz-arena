import { useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useParams } from "react-router-dom";
import { joinRequests, type RequestStatus } from "@/mock/arena-data";
import { submitPaymentAsync } from "@/pages/requests/query";
import { StartPay, ShowToast } from "@/utils/native-apis";

const steps: RequestStatus[] = ["Request Sent", "Approved", "Paid"];

const extractStartPayPayload = (response: unknown) => {
  const rawRequest =
    response && typeof response === "object"
      ? (
          response as {
            result?: {
              rawRequest?: {
                prepay_id?: string;
                prepayId?: string;
                orderinfo?: string;
                orderInfo?: string;
                sign?: string;
                signType?: string;
              };
            };
          }
        ).result?.rawRequest
      : undefined;

  return {
    prepayId: rawRequest?.prepay_id || rawRequest?.prepayId || "",
    orderInfo: rawRequest?.orderinfo || rawRequest?.orderInfo || "",
    sign: rawRequest?.sign || "",
    signType: rawRequest?.signType || "",
    useMiniResultFlag: true,
  };
};

export default function RequestStatusPage() {
  const { requestId = "" } = useParams();
  const [currentStatus, setCurrentStatus] = useState<RequestStatus | null>(
    null,
  );
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const request = useMemo(
    () => joinRequests.find((item) => item.id === requestId),
    [requestId],
  );

  const resolvedStatus = currentStatus || request?.status || null;

  const handlePayment = async () => {
    if (!request || isPaying) {
      return;
    }

    try {
      setIsPaying(true);
      setPaymentError("");
      const orderRef = `${request.id}-${Date.now()}`;

      const paymentResponse = await submitPaymentAsync(
        orderRef,
        request.tournamentTitle,
        1000,
      );

      if (paymentResponse?.resCode !== "0") {
        throw new Error(
          paymentResponse?.resMsg || "Payment initialization failed.",
        );
      }

      const startPayPayload = extractStartPayPayload(paymentResponse);
      if (
        !startPayPayload.prepayId ||
        !startPayPayload.orderInfo ||
        !startPayPayload.sign ||
        !startPayPayload.signType
      ) {
        throw new Error("Payment response is missing required KBZPay fields.");
      }

      StartPay(startPayPayload, () => {
        setCurrentStatus("Paid");
        setIsPaying(false);
        ShowToast({ title: "Payment successful", icon: "success" });
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to start payment. Please try again.";
      setPaymentError(message);
      setIsPaying(false);
    }
  };

  const activeStep = resolvedStatus ? steps.indexOf(resolvedStatus) : -1;

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

        {resolvedStatus === "Approved" && (
          <button
            className="btn btn-solid"
            type="button"
            style={{ marginTop: 14 }}
            onClick={handlePayment}
            disabled={isPaying}
          >
            <ShieldCheck
              size={16}
              style={{ verticalAlign: "text-top", marginRight: 8 }}
            />
            {isPaying ? "Starting payment..." : "Pay with KBZPay"}
          </button>
        )}

        {paymentError && (
          <p className="muted" style={{ marginTop: 10 }}>
            {paymentError}
          </p>
        )}
      </div>
    </section>
  );
}
