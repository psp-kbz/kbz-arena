/* eslint-disable @typescript-eslint/no-explicit-any */
export const ShowLoading = () => {
  window.ma?.showLoading({
    title: "KBZPay",
  });
};

export const HideLoading = () => {
  window.ma?.hideLoading();
};

export const CloseMiniProgram = () => {
  window.ma?.miniProgram?.close();
};

export const GetAuthCode = (
  success?: (code: string) => void,
  fail?: (error: unknown) => void,
) => {
  window.ma?.getAuthCode({
    scopes: ["AUTH_BASE", "USER_NICKNAME", "PLAINTEXT_MOBILE_PHONE"],
    success: (res: any) => {
      success?.(res.authCode);
    },
    fail: (err: unknown) => {
      fail?.(err);
    },
  });
};

export const ShowToast = ({
  title,
  icon,
  duration,
}: {
  title: string;
  icon: "success" | "error" | "loading" | "none";
  duration?: number;
}) => {
  window.ma?.showToast({
    title,
    icon,
    duration: duration || 2000,
  });
};

export const ChooseImage = (success?: (result: { base64: string }) => void) => {
  window.ma?.callNativeAPI(
    "chooseImage",
    {
      selectType: "2",
    },
    (result: { base64: string }) => {
      success?.(result);
    },
  );
};
