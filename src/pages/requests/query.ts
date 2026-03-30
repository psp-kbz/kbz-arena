import { submitPayment } from "@/services/payment";

export const submitPaymentAsync = async (
  orderRef: string,
  serviceName: string,
  amount: number,
) => {
  return submitPayment({
    orderRef,
    serviceName,
    amount,
  });
};
