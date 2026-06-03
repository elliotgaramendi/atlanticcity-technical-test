import { toast } from "sonner";

export const showAppToast = {
  error(message: string, description?: string) {
    toast.error(message, { description });
  },
  info(message: string, description?: string) {
    toast(message, { description });
  },
  success(message: string, description?: string) {
    toast.success(message, { description });
  }
};
