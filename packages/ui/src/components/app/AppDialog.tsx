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
  title: string;
  trigger?: ReactNode;
}

export function AppDialog({
  children,
  description,
  open,
  onOpenChange,
  title,
  trigger
}: AppDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent
        className={cn(
          "max-h-[90vh] overflow-y-auto rounded-3xl border-sky-300/50 bg-sky-50/95 p-6 text-slate-950 shadow-2xl shadow-sky-950/20 backdrop-blur-xl duration-300 dark:border-sky-400/20 dark:bg-slate-950/95 dark:text-sky-50 sm:max-w-3xl"
        )}
      >
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
        {children}
      </DialogContent>
    </Dialog>
  );
}
