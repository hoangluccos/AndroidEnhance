import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Image,
  Alert,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import instance from "../api/instance";

const UploadImageScreen = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    if (route.params?.avatar) {
      setImage(route.params.avatar);
    }
  }, [route.params?.avatar]);

  console.log("Avatar received:", route.params?.avatar);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // ✅ Chọn ảnh từ thư viện
  const pickImage = async () => {
    if (hasPermission === false) {
      Alert.alert("Bạn chưa cấp quyền truy cập thư viện ảnh!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // ✅ Upload ảnh lên API
  const uploadImage = async () => {
    if (!image) {
      Alert.alert("Vui lòng chọn ảnh trước!");
      return;
    }

    setLoading(true);
    let formData = new FormData();
    formData.append("file", {
      uri: image,
      name: "upload.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await instance.put("/users/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      Alert.alert("Upload thành công!", `URL: ${response.data.url}`);
    } catch (error) {
      console.log("error", error);
      Alert.alert("Upload success");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "blue",
          borderRadius: 5,
          position: "absolute",
          top: 50,
          left: 20,
        }}
        onPress={() => navigation.navigate("ProfileScreen")}
      >
        <Text style={{ color: "white" }}>Back</Text>
      </TouchableOpacity>

      {image ? (
        <Image
          source={{ uri: image }}
          style={{
            width: 200,
            height: 200,
            marginBottom: 20,
            borderRadius: 100,
          }}
        />
      ) : (
        <Text>Chưa có ảnh</Text>
      )}

      <Button title="Chọn ảnh" onPress={pickImage} />
      <Button title="Upload ảnh" onPress={uploadImage} disabled={loading} />
      {loading && <ActivityIndicator size="large" color="blue" />}
    </View>
  );
};

export default UploadImageScreen;
