import { View, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const InputComponent = ({ label, onChangeText, logo }) => {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <View className="p-2 border mx-3 my-2 rounded-[15] h-30 flex-row items-center gap-3">
      <Image source={logo} className="h-6 w-6" />
      <TextInput
        className="text-[16px]"
        placeholder={label}
        onChangeText={onChangeText}
      ></TextInput>
      <View className="flex justify-center items-center absolute right-5 bottom-5">
        <TouchableOpacity onPress={() => setIsHidden(!isHidden)}>
          <Image
            source={
              isHidden
                ? require("../assets/images/hide.png")
                : require("../assets/images/eye.png")
            }
            className="w-6 h-6 absolute bottom-0 right-0"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputComponent;
