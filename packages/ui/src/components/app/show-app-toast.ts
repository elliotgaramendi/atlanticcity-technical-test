import { createElement } from "react";
import { toast } from "sonner";

export const showAppToast = {
  error(message: string, description?: string) {
    toast.error(message, { description });
  },
  info(message: string, description?: string) {
    toast(message, { description });
  },
  lastVisited(message: string, description: string, imageUrl?: string) {
    toast.success(message, {
      description,
      duration: 6500,
      icon: imageUrl
        ? createElement("img", {
            alt: "",
            className:
              "h-9 w-9 rounded-xl bg-sky-100 object-contain p-1 dark:bg-sky-950",
            src: imageUrl
          })
        : undefined
    });
  },
  success(message: string, description?: string) {
    toast.success(message, { description });
  }
};
