"use client";

import { createContext, useState, type ReactNode } from "react";

export interface NavProgressValue {
  active: boolean;
  start: () => void;
  done: () => void;
}

export const NavProgressContext = createContext<NavProgressValue | null>(null);

export function NavProgressProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);

  const value = {
    active: count > 0,
    start: () => setCount((count) => count + 1),
    done: () => setCount((count) => Math.max(0, count - 1)),
  };

  return <NavProgressContext value={value}>{children}</NavProgressContext>;
}
