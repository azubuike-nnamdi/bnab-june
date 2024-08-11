import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

export function Modal({ isOpen, onClose, children, className }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      <div className="absolute inset-0 " onClick={onClose} />
      <div
        className={cn(
          "relative z-10 bg-white rounded-lg shadow-lg p-6",
          className
        )}
      >
        <div className="flex justify-end mb-4">
          <X size={20} onClick={onClose} className="cursor-pointer" />
        </div>
        <div className="space-y-4 flex flex-col">{children}</div>
      </div>
    </div>
  );
}
