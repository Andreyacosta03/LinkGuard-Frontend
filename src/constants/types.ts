interface ScanResult {
  error: boolean;
  status: number;
  message?: string;
  data: {
    id: string;
    url: string;
    totalEngines: number;
    malicious_percentage: number;
    threatTypes: string[];
    analysis: {
      isMalicious: boolean;
      isSuspicious: boolean;
      isSafe: boolean;
    };
  };
}

export type { ScanResult };
