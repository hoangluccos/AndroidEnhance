import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = ({ navigation }) => {
  const slides = [
    {
      key: "1",
      title: "Explore Upcoming and Nearby Events",
      image: require("../assets/images/onboarding-1.png"),
    },
    {
      key: "2",
      title: "We Have Modern Events Calendar Features",
      image: require("../assets/images/onboarding-2.png"),
    },
    {
      key: "3",
      title: "Stay Tuned with the Latest Updates",
      image: require("../assets/images/onboarding-3.png"),
    },
  ];
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      swiperRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate("LoginScreen");
    }
  };
  return (
    <SwiperFlatList
      ref={swiperRef}
      index={currentIndex}
      onChangeIndex={({ index }) => setCurrentIndex(index)}
      showPagination
      paginationStyle={styles.pagination}
      data={slides}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <ImageBackground
          source={item.image}
          style={styles.slide}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.skipButton}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextText}>
                {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Lớp nền mờ
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
    color: "rgba(255,255,255, 0)",
    fontWeight: "bold",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
  },
  skipButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 20,
  },
  skipText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  nextButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 20,
  },
  nextText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  pagination: {
    bottom: 20,
  },
});

export default OnboardingScreen;
