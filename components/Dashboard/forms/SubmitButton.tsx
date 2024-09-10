"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface iAppProps {
  text: string;
  className?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
    icon?: React.ReactNode;
    isSubmitting: boolean;
}

export function SubmitButton({ text, className, variant, icon, isSubmitting }: iAppProps) {
  
  return (
    <>
      {isSubmitting ? (
        <Button disabled className={cn("w-fit", className)} variant={variant}>
          <Loader2 className="mr-2 size-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button
          className={cn("w-fit", className)}
          variant={variant}
          type="submit"
        >
          {icon && icon}
          {text}
        </Button>
      )}
    </>
  );
}