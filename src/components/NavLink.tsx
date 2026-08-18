"use client";

import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useNavProgress } from "@/hooks/useNavProgress";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
}

function LinkProgress() {
  const { pending } = useLinkStatus();

  const { start, done } = useNavProgress();

  useEffect(() => {
    if (pending) {
      start();
      return done;
    }
    return undefined;
  }, [pending]);

  return null;
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
      <LinkProgress />
      {children}
    </Link>
  );
}
