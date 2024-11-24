import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export default function SectionHeading({
  children,
  className,
  id,
}: SectionHeadingProps) {
  return (
    <h2 id={id} className={cn("text-3xl font-bold scroll-mt-36", className)}>
      {children}
    </h2>
  );
}
