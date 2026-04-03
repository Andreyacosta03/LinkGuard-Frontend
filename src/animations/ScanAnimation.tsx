import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
import { ShieldCheck } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export function ScanAnimation() {
  // 1. State for dynamic status message
  const [statusMessage, setStatusMessage] = useState(
    "Analizando con más de 70 motores de búsqueda...",
  );

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStatusMessage("Verificando reputación...");
    }, 10000); // 10 seconds

    const timer2 = setTimeout(() => {
      setStatusMessage("Casi listo, finalizando el reporte de seguridad");
    }, 20000); // 30 seconds (15 after the previous one)

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#f8fafc", "#e2e8f0"]}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.centerContent}>
        <View style={styles.scanArea}>
          {/* Animation 1 */}
          {[0, 400, 800].map((delay, index) => (
            <Animatable.View
              key={index}
              animation={{
                0: { transform: [{ scale: 0.6 }], opacity: 0.4 },
                0.7: { transform: [{ scale: 2.2 }], opacity: 0.1 },
                1: { transform: [{ scale: 2.6 }], opacity: 0 },
              }}
              iterationCount="infinite"
              duration={3000}
              delay={delay}
              easing="ease-out"
              style={styles.pulse}
            />
          ))}

          {/* Animation 2 */}
          <Animatable.View
            animation={{
              0: { opacity: 0.15, transform: [{ scale: 1 }] },
              1: { opacity: 0.05, transform: [{ scale: 1.3 }] },
            }}
            iterationCount="infinite"
            duration={2000}
            easing="ease-in-out"
            direction="alternate"
            style={styles.halo}
          />

          {/* Main circle */}
          <Animatable.View
            animation={{
              0: { transform: [{ scale: 0.85 }], opacity: 0 },
              1: { transform: [{ scale: 1 }], opacity: 1 },
            }}
            duration={700}
            easing="ease-out"
            style={styles.mainCircle}
          >
            <LinearGradient
              colors={["#2563eb", "#1d4ed8"]}
              style={styles.gradient}
            >
              <Animatable.View
                animation={{
                  0: { transform: [{ scale: 1 }] },
                  0.5: { transform: [{ scale: 1.08 }] },
                  1: { transform: [{ scale: 1 }] },
                }}
                iterationCount="infinite"
                duration={1800}
                easing="ease-in-out"
              >
                <ShieldCheck size={54} color="white" strokeWidth={2.5} />
              </Animatable.View>
            </LinearGradient>

            <Animatable.View
              animation={{
                0: { transform: [{ rotate: "0deg" }] },
                1: { transform: [{ rotate: "360deg" }] },
              }}
              iterationCount="infinite"
              duration={3500}
              easing="linear"
              style={styles.scannerContainer}
            >
              <LinearGradient
                colors={["transparent", "rgba(255,255,255,0.8)"]}
                style={styles.scannerLine}
              />
            </Animatable.View>
          </Animatable.View>
        </View>

        {/* Dinamic text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Analizando enlace</Text>

          {/* Status badge */}
          <Animatable.View
            key={statusMessage}
            animation="fadeInUp"
            duration={800}
            style={styles.statusBadge}
          >
            <Animatable.Text
              animation={{
                0: { opacity: 0.4 },
                0.5: { opacity: 1 },
                1: { opacity: 0.4 },
              }}
              iterationCount="infinite"
              duration={1200}
              style={styles.subtitle}
            >
              {statusMessage}
            </Animatable.Text>
          </Animatable.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
    width: width,
  },
  scanArea: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  pulse: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 999,
    backgroundColor: "#3b82f6",
  },
  halo: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: "#3b82f6",
  },
  mainCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ffffff",
    elevation: 20,
    shadowColor: "#1d4ed8",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  scannerContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  scannerLine: {
    width: 6,
    height: "55%",
    borderRadius: 999,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 70,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -0.5,
  },
  statusBadge: {
    marginTop: 10,
    backgroundColor: "#dbeafe",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    minWidth: 200,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 11,
    color: "#1e40af",
    fontWeight: "700",
    textTransform: "uppercase",
    textAlign: "center",
    letterSpacing: 0.8,
  },
});
