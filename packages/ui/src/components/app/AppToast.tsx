import { Toaster } from "../ui";

export function AppToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      richColors
      visibleToasts={3}
      closeButton
    />
  );
}
