import { View, Text, TouchableOpacity, Alert, Button } from "react-native";
import React, { useEffect, useState } from "react";
import instance from "../api/instance";
import Input from "../components/Input";

const ProfileScreen = () => {
  const [data, setData] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await instance.get("/users/bio");
        setData(res.data.result);
      } catch (error) {
        console.log(error.response?.data);
      }
    };
    getProfile();
  }, []);
  //change
  const handleSendOtp = async () => {
    try {
      if (!newEmail) {
        Alert.alert("Lỗi", "Vui lòng nhập email mới!");
        return;
      }

      const res = await instance.post("/verify/registration", {
        email: newEmail,
      });
      if (res.data.code === 200) {
        Alert.alert("Thành công", "OTP đã được gửi đến email của bạn!");
        setIsOtpSent(true);
      }
    } catch (error) {
      console.log(error.response?.data);
      Alert.alert("Lỗi", "Không thể gửi OTP!");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      if (!otp) {
        Alert.alert("Lỗi", "Vui lòng nhập mã OTP!");
        return;
      }

      const res = await instance.post("/verify/verifyOtp", {
        email: newEmail,
        otp: otp,
      });
      console.log("Sent api check OTP :", res.data);
      if (res.data.code === 200) {
        Alert.alert("Thành công", "Xác thực OTP thành công!");
        setIsOtpVerified(true);
        setData({ ...data, email: newEmail });
      }
    } catch (error) {
      console.log(error.response?.data);
      Alert.alert("Lỗi", "Mã OTP không hợp lệ!");
    }
  };

  const handleUpdateProfile = async () => {
    if (!isOtpVerified) {
      Alert.alert("Lỗi", "Vui lòng xác thực email trước khi cập nhật!");
      return;
    }
    // console.log(data);
    try {
      const res = await instance.put("/users/bio", data);
      if (res.data.code === 200) {
        Alert.alert("Thành công", "Cập nhật profile thành công!");
        setIsUpdate(false);
        setIsOtpVerified(false);
      }
    } catch (error) {
      console.log(error.response?.data);
      Alert.alert("Lỗi", "Không thể cập nhật profile!");
    }
  };

  return (
    <View className="bg-orange-100 w-full h-full items-center my-5 px-5">
      {/* Avatar */}
      <View className="items-center mb-5 mt-5">
        <View className="h-16 w-16 bg-cyan-400 p-10 rounded-[50]" />
        <Text className="mt-3 font-bold text-lg">User Profile</Text>
      </View>

      <View className="w-full max-w-lg">
        <Input
          title="Username"
          placeholder="Nhập tên"
          value={data.username}
          isEdit={false}
        />
        <Input
          title="Email"
          placeholder="Nhập email"
          value={data.email}
          isEdit={false}
        />
        <Button
          onPress={() => setIsUpdate((prev) => !prev)}
          title={isUpdate ? "Close" : "Update new Email"}
          className={isUpdate ? "bg-gray-200" : ""}
        ></Button>
        <View className={isUpdate ? "flex" : "hidden"}>
          <Input
            title="Gmail Mới"
            placeholder="Nhập email mới"
            value={newEmail}
            onChange={setNewEmail}
          />

          <TouchableOpacity
            onPress={handleSendOtp}
            className="p-3 bg-blue-400 rounded-lg mt-2 w-full"
          >
            <Text className="text-center text-white font-bold">Gửi OTP</Text>
          </TouchableOpacity>

          {isOtpSent && (
            <Input
              title="Nhập OTP"
              placeholder="Nhập mã OTP"
              value={otp}
              onChange={setOtp}
            />
          )}

          {isOtpSent && (
            <TouchableOpacity
              onPress={handleVerifyOtp}
              className="p-3 bg-green-400 rounded-lg mt-2 w-full"
            >
              <Text className="text-center text-white font-bold">
                Xác Thực OTP
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <TouchableOpacity
        onPress={handleUpdateProfile}
        className={`p-3 ${
          isOtpVerified ? "bg-green-500" : "bg-gray-400"
        } rounded-lg mt-5 w-11/12 max-w-lg`}
        disabled={!isOtpVerified}
      >
        <Text className="text-center text-white font-bold">Cập Nhật</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
