import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface InfoItemProps {
  title: string;
  desc: string;
  iconColor?: string;
}
export const InfoItem = ({ title, desc, iconColor }: InfoItemProps) => (
  <View style={styles.infoItem}>
    <View
      style={[styles.dot, iconColor ? { backgroundColor: iconColor } : {}]}
    />
    <View>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoDesc}>{desc}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  infoItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 15 },
  infoTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#334155",
  },
  infoDesc: {
    fontSize: 13,
    color: "#64748B",
  },
});
