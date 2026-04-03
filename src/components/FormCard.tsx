import { View, StyleSheet } from "react-native";

export const FormCard = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.form}>{children}</View>
);

const styles = StyleSheet.create({
  form: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
});
