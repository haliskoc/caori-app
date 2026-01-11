export type IntegrationProviderId =
  | "health_connect"
  | "apple_health"
  | "garmin"
  | "fitbit"
  | "oura";

export type IntegrationAvailability = "available" | "coming_soon";

export type IntegrationProvider = {
  id: IntegrationProviderId;
  labelKey: string;
  descriptionKey: string;
  tag?: string;
  availability: IntegrationAvailability;
};

export const integrationProviders: IntegrationProvider[] = [
  {
    id: "health_connect",
    labelKey: "Health Connect",
    descriptionKey: "Android Health Connect ile temel aktivite ve kalori senkronu.",
    tag: "Android",
    availability: "coming_soon",
  },
  {
    id: "apple_health",
    labelKey: "Apple Health",
    descriptionKey: "iOS cihazlarindan saglik verisi senkronu.",
    tag: "iOS",
    availability: "coming_soon",
  },
  {
    id: "garmin",
    labelKey: "Garmin",
    descriptionKey: "Cihaz kaynakli antrenman verilerini ice aktar.",
    availability: "coming_soon",
  },
  {
    id: "fitbit",
    labelKey: "Fitbit",
    descriptionKey: "Gunluk hareket, kalori ve nabiz ozetlerini ekleyin.",
    availability: "coming_soon",
  },
  {
    id: "oura",
    labelKey: "Oura",
    descriptionKey: "Uyku ve toparlanma verilerini ekleyin.",
    availability: "coming_soon",
  },
];
