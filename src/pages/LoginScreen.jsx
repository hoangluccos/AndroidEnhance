import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import InputComponent from "../components/InputComponent";
import BtnLog from "../components/BtnLog";
import instance from "../api/instance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const LOGO_MAIL = require("../assets/images/mail.png");
  const LOGO_PW = require("../assets/images/padlock.png");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Day la navigate", navigation);
    console.log({
      username,
      password,
    });
    const data = {
      username,
      password,
    };
    const login = async (data) => {
      try {
        const res = await instance.post("/auth/login", data);
        console.log(res.data);
        if (res.data.code === 200) {
          console.log("navigate");
          await AsyncStorage.setItem(
            "token",
            JSON.stringify(res.data.result.token)
          );
          navigation.replace("ProfileScreen");
        }
      } catch (error) {
        console.log(error.response.data);
      }
    };
    login(data);
    console.log("Finish fetch api");
  };
  return (
    <View className="bg-gray-200 flex-1">
      <View className="flex justify-center items-center mt-20">
        <Image source={require("../assets/images/text-logo.png")}></Image>
      </View>
      <View className="flex w-100% h-20 justify-center items-center">
        <Text className="text-black text-2xl font-bold ">LOG IN</Text>
      </View>
      <InputComponent
        label={"Username"}
        onChangeText={setUsername}
        logo={LOGO_MAIL}
      />
      <InputComponent
        label={"Password"}
        onChangeText={setPassword}
        logo={LOGO_PW}
      />
      <BtnLog text={"LOGIN"} onSubmit={handleLogin} />
    </View>
  );
};

export default LoginScreen;
