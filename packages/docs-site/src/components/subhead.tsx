import { cn } from "@/lib/utils";

type SubheadProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Subhead({ children, className }: SubheadProps) {
  return (
    <h3
      className={cn(
        "text-xs uppercase font-bold mb-2 mt-2 text-rose-400",
        className
      )}
    >
      {children}
    </h3>
  );
}
