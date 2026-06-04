import { toast } from "sonner";

export const showAppToast = {
  error(message: string, description?: string) {
    toast.error(message, { description });
  },
  info(message: string, description?: string) {
    toast(message, { description });
  },
  lastVisited(message: string, description: string, onDismiss: () => void) {
    let isDismissed = false;

    const markDismissed = () => {
      if (isDismissed) return;
      isDismissed = true;
      onDismiss();
    };

    const toastId = toast.success(message, {
      action: {
        label: "Cerrar",
        onClick: () => {
          markDismissed();
          toast.dismiss(toastId);
        }
      },
      description,
      duration: Infinity,
      onDismiss: markDismissed
    });
  },
  success(message: string, description?: string) {
    toast.success(message, { description });
  }
};
