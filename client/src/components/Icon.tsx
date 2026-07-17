import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react-native";

const ICON_SETS = {
  shield: {
    safe: ShieldCheck,
    suspicious: ShieldAlert,
    malicious: ShieldX,
  },
  circle: {
    safe: CheckCircle2,
    suspicious: AlertCircle,
    malicious: XCircle,
  },
};

type IconStatus = "safe" | "suspicious" | "malicious";
type IconVariant = "shield" | "circle";

export const Icon = ({
  variant,
  status,
  size,
  color,
  strokeWidth,
}: {
  variant: IconVariant;
  status: IconStatus;
  size: number;
  color: string;
  strokeWidth?: number;
}) => {
  const IconComponent = ICON_SETS[variant][status];
  return <IconComponent size={size} color={color} strokeWidth={strokeWidth} />;
};
