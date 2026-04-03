import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "./Icon";
import { UI_THEMES } from "../constants/uiTheme";
import { ScanResult } from "../constants/types";
interface Props {
  scanResult: ScanResult;
  theme: (typeof UI_THEMES)[keyof typeof UI_THEMES];
  status: "safe" | "suspicious" | "malicious";
  threatsCount: number;
}
export const AnalysisCard = ({
  scanResult,
  theme,
  status,
  threatsCount,
}: Props) => {
  return (
    <View style={styles.analysisCard}>
      <Text style={styles.label}>URL Analizada</Text>
      <Text style={styles.urlDisplay}>{scanResult?.data.url}</Text>

      <View style={styles.riskHeader}>
        <Text style={styles.label}>Nivel de Riesgo</Text>
        <Text
          style={[
            styles.riskValue,
            theme.barColor ? { color: theme.barColor } : {},
          ]}
        >
          {scanResult?.data.malicious_percentage}
        </Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${scanResult?.data.malicious_percentage ?? 0}%`,
              backgroundColor: theme.barColor,
            },
          ]}
        />
      </View>

      {/* Status Badge */}
      <View
        style={[
          styles.statusBadge,
          theme.statusBadge ? { backgroundColor: theme.statusBadge } : {},
        ]}
      >
        <Icon variant="circle" status={status} size={18} color={theme.color} />
        <Text
          style={[styles.statusText, theme.color ? { color: theme.color } : {}]}
        >
          {status === "safe"
            ? theme.badgeText
            : `${threatsCount} ${theme.badgeText}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  analysisCard: {
    backgroundColor: "#ffffff",
    width: "100%",
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  urlDisplay: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginTop: 6,
    marginBottom: 20,
  },
  riskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  riskValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#10b981",
  },
  progressTrack: {
    height: 10,
    backgroundColor: "#f1f5f9",
    borderRadius: 5,
    marginBottom: 20,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#10b981",
    borderRadius: 5,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ecfdf5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statusText: {
    marginLeft: 8,
    color: "#059669",
    fontWeight: "500",
    fontSize: 13,
  },
});
