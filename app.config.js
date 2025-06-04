export default {
  expo: {
    name: "AliceNews",
    slug: "alice-news",
    version: "1.0.0",
    orientation: "portrait",
    owner: "dahnassy",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true
    },
    android: {
      package: "com.dahnassy.alicenews", // 👈 adicione isso
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      GNEWS_API_KEY: "fc1da50cb35965e634e4f8bd893e3796",
      eas: {
        projectId: "368e13f9-24dc-478e-9f07-7f893a15f7b0"
      }
    }
  }
};


