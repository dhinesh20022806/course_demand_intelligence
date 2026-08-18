import { useContext } from "react";
import {
  type NavProgressValue,
  NavProgressContext,
} from "@/context/ProgressContext";

export function useNavProgress(): NavProgressValue {
  const ctx = useContext(NavProgressContext);
  if (!ctx)
    throw new Error("useNavProgress must be used within <NavProgressProvider>");
  return ctx;
}
