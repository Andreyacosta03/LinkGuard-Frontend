import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "../components/Icon";
import { useRouter } from "expo-router";

export const ErrorDisplay = ({ error }: { error: string }) => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.errorContent}>
        {/* Visual Error Icon */}
        <View style={styles.shieldWrapper}>
          <Icon variant="shield" status="malicious" size={60} color="#ef4444" />
        </View>

        <Text style={styles.errorTitle}>¡Ups! Algo salió mal</Text>
        <Text style={styles.errorSubtitle}>
          {error || "No pudimos completar el análisis en este momento"}
        </Text>

        {/* Help card */}
        <View style={styles.errorCard}>
          <Text style={styles.errorCardTitle}>¿Qué puede estar pasando?</Text>
          <View style={styles.errorStep}>
            <View style={styles.dot} />
            <Text style={styles.errorStepText}>
              Tu conexión a internet es inestable.
            </Text>
          </View>
          <View style={styles.errorStep}>
            <View style={styles.dot} />
            <Text style={styles.errorStepText}>El servidor está saturado.</Text>
          </View>
          <View style={styles.errorStep}>
            <View style={styles.dot} />
            <Text style={styles.errorStepText}>
              No se pudo establecer conexión con el servidor.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>Volver al Inicio</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fef2f2",
  },
  shieldWrapper: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#fee2e2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    elevation: 8,
    shadowColor: "#ef4444",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#ef4444",
    marginTop: 7,
    marginRight: 10,
  },
  errorContent: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 12,
  },
  errorSubtitle: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  errorCard: {
    backgroundColor: "white",
    width: "100%",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fee2e2",
    marginBottom: 32,
  },
  errorCardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#991b1b",
    marginBottom: 16,
    textTransform: "uppercase",
  },
  errorStep: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  errorStepText: {
    fontSize: 14,
    color: "#475569",
    marginLeft: 10,
  },
  secondaryButton: {
    marginTop: 20,
    padding: 12,
  },
  secondaryButtonText: {
    color: "#64748b",
    fontSize: 15,
    fontWeight: "600",
  },
});
