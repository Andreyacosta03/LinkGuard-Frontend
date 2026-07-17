import { useMemo } from "react";
import { SECURITY_TIPS } from "../constants/securityContent";

type SecurityStatus = keyof typeof SECURITY_TIPS;

export const useSecurityTips = (status: SecurityStatus) => {
  return useMemo(() => {
    const allTips = SECURITY_TIPS[status] || [];
    return [...allTips].sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [status]);
};
