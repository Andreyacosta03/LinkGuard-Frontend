import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  color?: string;
}

export const Button = ({ title, color, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, color ? { backgroundColor: color } : {}]}
      {...props}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4338ca",
    width: "100%",
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
