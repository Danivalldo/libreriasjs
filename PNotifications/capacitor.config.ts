import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.libreriasjs.pnotifications",
  appName: "PNotifications",
  webDir: "dist",
  bundledWebRuntime: false,
  server:
    process.env.NODE_ENV === "dev"
      ? {
          url: "http://192.168.1.135:5173",
          cleartext: true,
        }
      : undefined,
};

export default config;
