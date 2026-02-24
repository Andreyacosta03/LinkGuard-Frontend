import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { Link2 } from "lucide-react-native";

interface InputProps extends TextInputProps {
  label: string;
}

const Input = ({ label, ...textInputProps }: InputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Link2 color="#94a3b8" size={20} style={styles.icon} />
        <TextInput
          placeholderTextColor="#94a3b8"
          style={styles.input}
          {...textInputProps}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
    height: 56,
  },
  icon: { marginRight: 12 },
  input: { flex: 1, color: "#1e293b", fontSize: 16 },
});

export default Input;
