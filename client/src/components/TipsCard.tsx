import { View, Text, StyleSheet } from "react-native";
import { Tip } from "../components/Tip";

export const TipsCard = ({ randomTips }: { randomTips: string[] }) => {
  return (
    <View style={styles.tipsContainer}>
      <Text style={styles.tipsTitle}>Recomendaciones</Text>

      {randomTips.map((tip, index) => (
        <Tip key={index} tip={tip} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tipsContainer: {
    width: "100%",
    backgroundColor: "#f8fafc",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 16,
  },
});
