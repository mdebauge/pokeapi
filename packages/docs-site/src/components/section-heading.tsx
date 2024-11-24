import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionHeading({
  children,
  className,
}: SectionHeadingProps) {
  return <h2 className={cn("text-3xl font-bold", className)}>{children}</h2>;
}
