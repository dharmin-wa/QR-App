import { toast } from "react-toastify";

export const showToast = (
  message: string = "Something went wrong",
  messageType: "info" | "success" | "warning" | "error" = "error",
) => {
  const toastMethod = toast[messageType] || toast.error;

  toastMethod(message, {
    className: "toasterMessage",
    style: {
      maxWidth: "600px",
      backgroundColor: "rgba(255, 255, 255)",
    },
  });
};
