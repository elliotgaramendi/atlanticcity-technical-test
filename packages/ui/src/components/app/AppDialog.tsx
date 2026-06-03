import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui";
import { cn } from "../../lib/utils";

export interface AppDialogProps {
  children: ReactNode;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showHeader?: boolean;
  size?: "default" | "fullscreen";
  title: string;
  trigger?: ReactNode;
}

export function AppDialog({
  children,
  description,
  open,
  onOpenChange,
  showHeader = true,
  size = "default",
  title,
  trigger
}: AppDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent
        className={cn(
          "overflow-y-auto border-sky-300/50 bg-sky-50/95 p-6 text-slate-950 shadow-2xl shadow-sky-950/20 backdrop-blur-xl duration-300 dark:border-sky-400/20 dark:bg-slate-950/95 dark:text-sky-50",
          size === "fullscreen"
            ? "left-0 top-0 h-dvh max-h-dvh max-w-none translate-x-0 translate-y-0 rounded-none sm:rounded-none"
            : "max-h-[90vh] rounded-3xl sm:max-w-3xl"
        )}
      >
        {showHeader ? (
          <DialogHeader>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-500">
              Busqueda avanzada
            </p>
            <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
            {description ? (
              <DialogDescription className="text-slate-600 dark:text-sky-100/70">
                {description}
              </DialogDescription>
            ) : null}
          </DialogHeader>
        ) : (
          <DialogHeader className="sr-only">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {description ?? "Contenido del dialogo"}
            </DialogDescription>
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
}
