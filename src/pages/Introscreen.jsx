import {
  View,
  Text,
  Button,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";

const Introscreen = ({ navigation }) => {
  const handleClick = () => {
    setTimeout(() => {
      navigation.replace("HomeScreen"); // Sửa lỗi điều hướng
    }, 3000);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Introscreen</Text>
      <TouchableOpacity onPress={handleClick}>
        <Text>Go to HomePage</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Introscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
