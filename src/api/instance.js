import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
  baseURL: "http://172.16.146.197:8080/api",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Sử dụng interceptor đúng cách
instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const parsedToken = JSON.parse(token);
      config.headers.Authorization = `Bearer ${parsedToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
