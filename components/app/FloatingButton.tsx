import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Share,
} from "react-native";

const FloatingButton = () => {
  const [icons] = useState([
    new Animated.Value(40),
    new Animated.Value(40),
    new Animated.Value(40),
  ]);

  const [pop, setPop] = useState(false);

  const animateIcons = (toValue: number) => {
    setPop(toValue !== 40);
    const animations = icons.map((icon) =>
      Animated.timing(icon, {
        toValue,
        duration: 200,
        useNativeDriver: false,
      })
    );
    Animated.parallel(animations).start();
  };

  const popIn = () => animateIcons(130);
  const popOut = () => animateIcons(40);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Check out this content!",
        url: "https://example.com", // Replace with the actual URL you want to share
        title: "Amazing Content",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Handle sharing with a specific activity (like a specific app)
        } else {
          // Handle successful sharing
        }
      } else if (result.action === Share.dismissedAction) {
        // Handle case where the share was dismissed
      }
    } catch (error: any) {
      console.log("Error sharing content: ", error.message);
    }
  };

  return (
    <View className="absolute bottom-1 right-1">
      <Animated.View style={[styles.circle, { bottom: icons[0] }]}>
        <TouchableOpacity>
          <FontAwesome name="cloud-upload" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[styles.circle, { bottom: icons[1], right: icons[1] }]}
      >
        <TouchableOpacity>
          <FontAwesome name="print" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, { right: icons[2] }]}>
        <TouchableOpacity onPress={onShare}>
          <FontAwesome name="share-alt" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => {
          pop ? popOut() : popIn();
        }}
      >
        <FontAwesome name="plus" size={25} color="#FFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  circle: {
    backgroundColor: "rgb(253 164 175)",
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 40,
    right: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
