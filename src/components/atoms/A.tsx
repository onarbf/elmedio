"use client";
import _ from "@/constants";
import { LinkProps } from "@/types";
import { cn } from "@/utils/cn";
import { Link } from "@/utils/i18n/routing";
import { usePathname } from "next/navigation";

export default function A({
  children,
  href,
  className,

  locale,
  highlightIfActive,
  styledAs = "default",
  ...rest
}: LinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const classes = cn(
    `${highlightIfActive && isActive ? "font-bold" : ""}`,
    _.styles.linkStyles[styledAs] || "",
    className
  );

  return (
    <Link href={href} className={classes} locale={locale} {...rest}>
      {children}
    </Link>
  );
}
