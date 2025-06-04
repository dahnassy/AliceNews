export default {
  expo: {
    name: "AliceNews",
    slug: "alice-news",
    version: "1.0.0",
    orientation: "portrait",
    androidStatusBar: {
    backgroundColor: "#ffffff",
    barStyle: "dark-content",
    },
    userInterfaceStyle: "automatic",
    icon: "./src/assets/icon.png",
    splash: {
      image: "./src/assets/splash.png",
      resizeMode: "contain", // ou "cover"
      backgroundColor: "#ffffff", // ou escuro, se preferir
    },
    extra: {
      GNEWS_API_KEY: "fc1da50cb35965e634e4f8bd893e3796"
    }
  }
}
