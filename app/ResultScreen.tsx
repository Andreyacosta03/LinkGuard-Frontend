import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { ScanAnimation } from "../src/animations/ScanAnimation";
import { Icon } from "../src/components/Icon";
import { UI_THEMES } from "../src/constants/uiTheme";
import { useRouter } from "expo-router";
import { ScanResult } from "../src/constants/types";
import { ErrorDisplay } from "../src/components/Error";
import { useFilteredThreats } from "../src/hooks/useFilteredThreats";
import { useSecurityTips } from "../src/hooks/useSecurityTips";
import { AnalysisCard } from "../src/components/AnalysisCard";
import { ThreatCard } from "../src/components/ThreatCard";
import { TipsCard } from "../src/components/TipsCard";
import { Button } from "../src/components/Button";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const ResultScreen = () => {
  const { url } = useLocalSearchParams<{ url: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string>("");

  const controller = new AbortController();
  const { signal } = controller;
  const router = useRouter();
  // 1. Calculate status based on scanResult
  const status = scanResult?.data.analysis.isMalicious
    ? "malicious"
    : scanResult?.data.analysis.isSuspicious
      ? "suspicious"
      : "safe";

  // 2. Get the corresponding theme
  const theme = UI_THEMES[status];

  const randomTips = useSecurityTips(status);
  const filteredThreats = useFilteredThreats(scanResult as ScanResult);

  // 3. Determinate the number of threats to show
  const threatsCount = filteredThreats.length;

  useEffect(() => {
    const getSecurityData = async () => {
      setIsLoading(true);
      setError("");

      try {
        const fetchPromise = fetch(API_URL!, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          signal,
          body: JSON.stringify({ url }),
        }).then((res) => {
          if (!res.ok) throw new Error(`Error servidor: ${res.status}`);
          return res.json();
        });

        // Promise to ensure the animation runs for at least 2 seconds
        const timerPromise = new Promise((resolve) =>
          setTimeout(resolve, 2000),
        );
        const [data] = await Promise.all([fetchPromise, timerPromise]);
        setScanResult(data);
        console.log("✅ Scan result:", data);
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("Solicitud cancelada por el usuario.");
        } else {
          console.error("❌ Error:", err.message);
          setError("No se pudo conectar con el servidor de seguridad.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (url) {
      getSecurityData();
    }

    return () => {
      controller.abort();
    };
  }, [url]);

  if (isLoading)
    return (
      <SafeAreaView style={styles.container}>
        <ScanAnimation />
      </SafeAreaView>
    );

  if (error) return <ErrorDisplay error={error} />;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.bgColor }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Upper shield container */}
        <View style={styles.headerSection}>
          <View
            style={[
              styles.shieldWrapper,
              { backgroundColor: theme.iconBgColor },
            ]}
          >
            <Icon
              variant="shield"
              status={status}
              size={70}
              color={theme.iconColor}
              strokeWidth={1.5}
            />
          </View>
          <Text style={styles.mainTitle}>{theme.title}</Text>
          <Text style={styles.mainSubtitle}>{theme.subtitle}</Text>
        </View>

        {/* URL Analysis Card */}
        {scanResult && (
          <AnalysisCard
            scanResult={scanResult}
            theme={theme}
            status={status}
            threatsCount={threatsCount}
          />
        )}

        {/* Threat Card */}
        {status !== "safe" &&
          scanResult?.data.threatTypes &&
          scanResult.data.threatTypes.length > 0 && (
            <ThreatCard
              threatsCount={threatsCount}
              filteredThreats={filteredThreats}
            />
          )}

        {/* Tips Card */}
        <TipsCard randomTips={randomTips} />

        {/* Main Action Button */}
        <Button
          title="Escanear Otro Enlace"
          onPress={() => router.navigate("/")}
          activeOpacity={0.8}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1fcf6",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    width: "90%",
    maxWidth: 600,
    paddingHorizontal: 24,
    paddingVertical: 40,
    alignItems: "center",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  shieldWrapper: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#10b981",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    elevation: 8,
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0f172a",
    textAlign: "center",
  },
  mainSubtitle: {
    fontSize: 16,
    color: "#64748b",
    marginTop: 8,
    textAlign: "center",
  },
});

export default ResultScreen;
