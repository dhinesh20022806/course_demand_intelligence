import { useNavProgress } from "@/hooks/useNavProgress";
import { useLinkStatus } from "next/link";
import { useEffect } from "react";

export function LinkProgressByPage() {
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

export function LinkProgressByApi({ isLoading }: { isLoading: boolean }) {
  const { start, done } = useNavProgress();

  useEffect(() => {
    if (isLoading) {
      start();
      return done;
    }
    return undefined;
  });

  return null;
}
