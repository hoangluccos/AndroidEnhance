import { View, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

const SplashScreenComponent = ({ onHideSplash }) => {
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      setTimeout(async () => {
        await SplashScreen.hideAsync(); // Ẩn splash screen của Expo
        onHideSplash(); // Chuyển sang màn hình chính
      }, 5000);
    }
    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/logo.png")}
      />
    </View>
  );
};

export default SplashScreenComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DDD",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
});
