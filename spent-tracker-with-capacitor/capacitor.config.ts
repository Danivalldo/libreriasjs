import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.libreriasjs.spendtracker",
  appName: "spend-tracker",
  webDir: "build",
  bundledWebRuntime: false,
  server:
    process.env.NODE_ENV === "dev"
      ? {
          url: "http://192.168.1.135:3000",
          cleartext: true,
        }
      : undefined,
};

export default config;
