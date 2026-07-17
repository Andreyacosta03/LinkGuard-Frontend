import { useMemo } from "react";
import { ScanResult } from "../constants/types";

export const useFilteredThreats = (scanResult: ScanResult) => {
  return useMemo(() => {
    if (!scanResult?.data.threatTypes) return [];
    const blacklist = ["malicious", "suspicious", "undetected", "harmless"];

    return scanResult.data.threatTypes
      .filter((t) => !blacklist.includes(t.toLowerCase()))
      .map((t) => t.charAt(0).toUpperCase() + t.slice(1));
  }, [scanResult]);
};
