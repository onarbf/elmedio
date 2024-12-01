import _ from "@/constants";
import { TextProps } from "@/types";
import { cn } from "@/utils/cn";

export default function Text({
  as = "p",
  styledAs,
  children,
  className,
}: TextProps) {
  const Component = as;
  if (!styledAs) styledAs = as;
  const appliedStyle = _.styles.textStyles[styledAs] || "";
  return (
    <Component className={cn(appliedStyle, className)}>{children}</Component>
  );
}
