import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const BtnLog = ({ text, onSubmit }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onSubmit}
        className="p-3 mx-10 my-4 bg-blue-300  rounded-[30] items-center font-bold"
      >
        <Text>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BtnLog;
