
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.d0a084e736e24500ac52ee8441e17be1',
  appName: 'genz-health-ai-doc',
  webDir: 'dist',
  server: {
    url: "https://d0a084e7-36e2-4500-ac52-ee8441e17be1.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  ios: {
    scheme: 'genz-health-ai-doc'
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystorePassword: undefined,
      keystoreAliasPassword: undefined,
    }
  }
};

export default config;
