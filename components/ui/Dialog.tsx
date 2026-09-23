"use client";

import { useEffect, useImperativeHandle, useRef, forwardRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type DialogHandle = { show: () => void; close: () => void };

export const Dialog = forwardRef<
  DialogHandle,
  { title: string; description?: string; children: ReactNode; className?: string; onClose?: () => void }
>(({ title, description, children, className, onClose }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    show: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const handleClose = () => onClose?.();
    el.addEventListener("close", handleClose);
    return () => el.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-sand-200 bg-white p-0 shadow-popover backdrop:bg-ink-900/40 backdrop:backdrop-blur-[2px]",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4 border-b border-sand-200 p-5">
        <div>
          <h2 className="text-lg font-semibold text-ink-900">{title}</h2>
          {description && <p className="mt-1 text-sm text-ink-500">{description}</p>}
        </div>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-500 hover:bg-sand-100 cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>
      </div>
      <div className="max-h-[70vh] overflow-y-auto p-5 scrollbar-thin">{children}</div>
    </dialog>
  );
});
Dialog.displayName = "Dialog";
