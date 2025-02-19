import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Introscreen from "./src/Introscreen";
import HomeScreen from "./src/HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Introscreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Introscreen" component={Introscreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
