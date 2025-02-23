import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect } from "react";
import SplashScreenComponent from "./src/pages/SplashScreenComponent";
import OnboardingScreen from "./src/pages/OnBoardingScreen";
import LoginScreen from "./src/pages/LoginScreen";
import ProfileScreen from "./src/pages/ProfileScreen";
import "./global.css";
const Stack = createStackNavigator();

export default function App() {
  const [isSplashScreen, setIsSplashScreen] = useState(true);

  return isSplashScreen ? (
    <SplashScreenComponent onHideSplash={() => setIsSplashScreen(false)} />
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="OnboardingScreen"
      >
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
