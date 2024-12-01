import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.flowly.app",
  appName: "Flowly",
  webDir: "out",
  android: {
    allowMixedContent: true,
  },
};

export default config;
