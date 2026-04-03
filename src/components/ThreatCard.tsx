import { View, Text, StyleSheet } from "react-native";
import { Tip } from "../components/Tip";

interface ThreatCardProps {
  threatsCount: number;
  filteredThreats: string[];
}
export const ThreatCard = ({
  threatsCount,
  filteredThreats,
}: ThreatCardProps) => {
  return (
    <View style={styles.threatSection}>
      <Text style={styles.threatTitleContainer}>Amenazas detectadas</Text>

      {/* Option A: Specific threats after filtering */}
      {threatsCount > 0 ? (
        filteredThreats.map((threat, index) => (
          <Tip key={`threat-${index}`} tip={threat} />
        ))
      ) : (
        /* Option B: The original array had data but all were generic (malicious/suspicious) */
        <Tip tip="Actividad maliciosa detectada por múltiples motores de seguridad." />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  threatSection: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  threatTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
});
