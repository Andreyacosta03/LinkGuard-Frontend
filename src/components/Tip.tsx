import React from "react";
import { View, Text, StyleSheet } from "react-native";
interface TipProps {
  tip: string;
}

export const Tip = ({ tip }: TipProps) => {
  return (
    <View style={styles.tipRow}>
      <View style={styles.dot} />
      <Text style={styles.tipDescription}>{tip}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tipRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#10b981",
    marginTop: 7,
    marginRight: 10,
  },
  tipDescription: {
    fontSize: 14,
    color: "#64748b",
    flex: 1,
    lineHeight: 20,
  },
});
