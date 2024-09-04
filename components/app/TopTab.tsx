import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { AntDesign, Feather } from "@expo/vector-icons";

const TopTab = ({ state, descriptors, navigation }: any) => {
  const icons = {
    home: (props: any) => (
      <AntDesign name="home" size={26} color={greyColor} {...props} />
    ),
    download: (props: any) => (
      <Feather name="download" size={26} color={greyColor} {...props} />
    ),
    message: (props: any) => (
      <AntDesign name="message1" size={26} color={greyColor} {...props} />
    ),
    more: (props: any) => (
      <AntDesign name="dotchart" size={26} color={greyColor} {...props} />
    ),
    profile: (props: any) => (
      <AntDesign name="user" size={26} color={greyColor} {...props} />
    ),
  };

  const primaryColor = "rgb(34 197 94)";
  const greyColor = "#737373";
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <View
              className={`py-2 border-green-500 w-[100%] ${
                isFocused ? "border-b-2 transition-all border-spacing-2" : ""
              }`}
            >
              <Text
                style={{
                  color: isFocused ? primaryColor : greyColor,
                  borderBottomColor: "red",
                  fontSize: 16,
                }}
                className={`font-bold text-2xl uppercase px-2 tracking-widest`}
              >
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TopTab;
