export const UI_THEMES = {
  safe: {
    bgColor: "#f1fcf6", // Fondo de la pantalla verde muy claro
    iconBgColor: "#10b981", //Fondo del círculo del escudo
    iconColor: "#ffffff",
    title: "Enlace Seguro",
    subtitle: "Este enlace es seguro para visitar",
    icon: "ShieldCheck",
    badgeText: "Sin amenazas",
    color: "#10b981", // Para textos y bordes
    showThreats: false,
    barColor: "#34d399",
    statusBadge: "#d1fae5",
  },
  suspicious: {
    bgColor: "#fff7ed",
    iconBgColor: "#f97316",
    iconColor: "#ffffff",
    title: "¡Aviso de Riesgo!",
    subtitle: "Se han detectado posibles amenazas",
    icon: "ShieldAlert",
    badgeText: "Amenazas potenciales",
    color: "#f97316",
    showThreats: true,
    barColor: "#fbbf24",
    statusBadge: "#ffedd5",
  },
  malicious: {
    bgColor: "#fef2f2",
    iconBgColor: "#ef4444",
    iconColor: "#ffffff",
    title: "¡Peligro Detectado!",
    subtitle: "Este enlace contiene amenazas detectadas",
    icon: "ShieldX",
    badgeText: "Amenazas detectadas",
    color: "#ef4444",
    showThreats: true,
    barColor: "#f87171",
    statusBadge: "#fee2e2",
  },
};
