"use client";

import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useNavProgress } from "@/hooks/useNavProgress";
import { LinkProgressByPage } from "./LinkProgress";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
}

export function NavLink({
  href,
  children,
  className,
  activeClassName,
  exact = false,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

  let finialClassNames = className;
  if (isActive) {
    finialClassNames = finialClassNames + " " + activeClassName;
  }

  return (
    <Link href={href} className={finialClassNames}>
      <LinkProgressByPage />
      {children}
    </Link>
  );
}
