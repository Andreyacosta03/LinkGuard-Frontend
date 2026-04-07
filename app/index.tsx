import { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Scan } from "lucide-react-native";
import { Input } from "../src/components/Input";
import { Button } from "../src/components/Button";
import { InfoItem } from "../src/components/InfoItem";
import { FormCard } from "../src/components/FormCard";
import { useInputField } from "../src/hooks/useInputField";

const ScanScreen = () => {
  const [isValid, setIsValid] = useState<boolean>(true);

  const router = useRouter();
  const { value, handleInputChange } = useInputField("");

  let isDisable = value.trim() === "";

  const colorButton = isDisable ? "#A2A7FF" : "#6366F1";

  const handleButton = () => {
    try {
      const validateUrl = new URL(value);

      // 1. Validate protocol
      const hasValidProtocol =
        validateUrl.protocol === "http:" || validateUrl.protocol === "https:";

      // 2. Validate hostname with a regex  //
      const hostRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;
      const hasValidDomain = hostRegex.test(validateUrl.hostname);

      if (hasValidProtocol && hasValidDomain) {
        setIsValid(true);
        router.push({
          pathname: "/ResultScreen",
          params: { url: value },
        });
      } else {
        setIsValid(false);
      }
    } catch (error) {
      setIsValid(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Scan color="#FFFFFF" size={32} />
          </View>
          <Text style={styles.title}>Link Guard</Text>
          <Text style={styles.subtitle}>Protege tu navegación en línea</Text>
        </View>

        {/* Form Card */}
        <FormCard>
          <Input
            label="Ingresa el enlace a escanear"
            placeholder="https://ejemplo.com"
            onChangeText={handleInputChange}
            keyboardType="url"
            value={value}
            autoCapitalize="none"
          />
          <Text
            style={[
              styles.invalidText,
              { opacity: !isValid ? 1 : 0 }, //If it's valid, it's invisible.
            ]}
          >
            URL inválida
          </Text>
          <Button
            title="Escanear Enlace"
            disabled={isDisable}
            color={colorButton}
            onPress={handleButton}
          />
        </FormCard>

        {/* Info Items */}
        <View style={styles.infoList}>
          <InfoItem
            iconColor="#059669"
            title="Detección en tiempo real"
            desc="Análisis instantáneo de amenazas"
          />
          <InfoItem
            iconColor="#4F46E5"
            title="Base de datos actualizada"
            desc="Miles de amenazas identificadas diariamente"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "90%",
    maxWidth: 600,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#1E293B",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#1E293B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    marginTop: 4,
  },

  infoList: { width: "100%", gap: 12 },
  invalidText: {
    color: "#EF4444",
    fontSize: 13,
    fontWeight: "600",
  },
});

export default ScanScreen;
