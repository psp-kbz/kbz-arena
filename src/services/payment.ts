import { APIRoutes } from "@/config/consts";
import { coreApiClient } from "@/libs/axios/core-api-client";

type SubmitPaymentParams = {
  orderRef: string;
  serviceName: string;
  amount: number;
};

type RawPayRequest = {
  prepay_id?: string;
  prepayId?: string;
  orderinfo?: string;
  orderInfo?: string;
  sign?: string;
  signType?: string;
};

type SubmitPaymentResult = {
  rawRequest?: RawPayRequest;
};

const sanitizeServiceName = (value: string) => {
  const cleaned = (value || "")
    .replace(/[^A-Za-z0-9\s]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned || "Tournament Registration";
};

export const submitPayment = async ({
  orderRef,
  serviceName,
  amount,
}: SubmitPaymentParams) => {
  const payload = {
    order_ref: (orderRef || "").toString().trim(),
    service_name: sanitizeServiceName((serviceName || "").toString().trim()),
    amount: String(Number.isFinite(amount) ? amount : 0),
  };

  const response = await coreApiClient.post<
    APIDataResponse<SubmitPaymentResult>
  >(APIRoutes.SUBMIT_PAYMENT, payload);

  return response.data;
};
