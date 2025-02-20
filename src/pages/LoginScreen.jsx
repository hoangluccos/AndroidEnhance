import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import InputComponent from "../components/InputComponent";
import BtnLog from "../components/BtnLog";

const LoginScreen = () => {
  const LOGO_MAIL = require("../assets/images/mail.png");
  const LOGO_PW = require("../assets/images/padlock.png");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log({
      username,
      password,
    });
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
