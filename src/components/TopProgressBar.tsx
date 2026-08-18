"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useNavProgress } from "@/hooks/useNavProgress";

export function TopProgressBar() {
  const { active } = useNavProgress();

  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const setBar = (opacity: number, width: number) => {
    const element = barRef.current;
    if (!element) return;
    element.style.opacity = String(opacity);
    element.style.width = `${width}%`;
  };

  const finish = () => {
    clearTimers();
    setBar(1, 100);
    timers.current.push(setTimeout(() => setBar(0, 100), 200));
    timers.current.push(setTimeout(() => setBar(0, 0), 450));
  };

  useEffect(() => {
    if (active) {
      clearTimers();
      setBar(1, 8);

      const steps: [number, number][] = [
        [120, 30],
        [300, 55],
        [600, 75],
        [1000, 88],
      ];

      steps.forEach(([delay, value]) => {
        timers.current.push(setTimeout(() => setBar(1, value), delay));
      });
    } else {
      finish();
    }
    return clearTimers;
  }, [active]);

  useEffect(() => {
    finish();
  }, [pathname]);

  console.log(pathname);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-200 h-0.5">
      <div
        ref={barRef}
        role="progressbar"
        className="h-full bg-violet-500 shadow-[0_0_8px] shadow-violet-500/60 transition-[width,opacity] duration-200 ease-out"
      ></div>
    </div>
  );
}
