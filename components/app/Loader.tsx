import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";

const { height: screenHeight } = Dimensions.get("window");
const osName = Platform.OS;

const Loader = ({
  message = "Loading...",
  size = osName === "ios" ? "large" : 50,
  color = "#4F46E5",
  customStyles = {},
  classname = "",
}) => {
  return (
    <View style={[styles.container, { ...customStyles }]} className={classname}>
      <Text style={styles.text}>{message}</Text>
      <ActivityIndicator
        color="hsl(262.1, 83.3%, 57.8%)"
        size={osName === "ios" ? "large" : 50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    zIndex: 10,
  },
  text: {
    color: "hsl(262.1, 83.3%, 57.8%)",
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Loader;
