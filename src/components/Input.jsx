import { View, Text, TextInput } from "react-native";
import React from "react";

const Input = ({ title, placeholder, value, onChange, isEdit = true }) => {
  return (
    <View className="mb-3">
      <Text className="text-gray-700 mb-1">{title}</Text>
      <View
        className={
          isEdit
            ? "border border-gray-400 rounded-md p-2"
            : "border border-gray-200 rounded-md p-2"
        }
      >
        <TextInput
          value={value}
          placeholder={placeholder}
          editable={isEdit}
          onChangeText={onChange}
        />
      </View>
    </View>
  );
};

export default Input;
