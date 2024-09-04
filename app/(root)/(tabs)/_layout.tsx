import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { API, blurhash } from "@/constants";
import { UserAccount } from "@/types/type";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import "react-native-reanimated";

export default function Layout() {
  const [user, setUser] = useState<UserAccount>();
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "green",
        // tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "rgb(243 244 246)",
          paddingBottom: 0, // ios only
          overflow: "hidden",
          height: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "stretch",
          flexDirection: "row",
          position: "absolute",
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "500",
          paddingBottom: 6,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={focused ? color : "black"}
            />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="download"
        options={{
          headerShown: true,
          headerTitle: "Daily Toons",
          headerTitleStyle: { fontSize: 30 },
          headerRight: () => {
            const getUser = async () => {
              const response = await axios
                .get(`${API}/api/user/66af9f932f0c9c88cf3cdc94`)
                .then(({ data }) => {
                  setUser(data.user);
                  console.log(data.user);
                });
            };
            return (
              <View className="flex flex-row space-x-2 items-center justify-center pr-2">
                <Image
                  source={{ uri: `${API}/${user?.avatar}` }}
                  placeholder={{ blurhash }}
                  className="w-10 h-10 rounded-full"
                  contentFit="cover"
                  transition={1000}
                  cachePolicy={"memory-disk"}
                />
              </View>
            );
          },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "download" : "download-outline"}
              color={focused ? color : "black"}
            />
          ),
          tabBarLabel: "Toons",
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          headerShown: false,
          title: "Message",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "document-text" : "document-text-outline"}
              color={focused ? color : "black"}
            />
          ),
          tabBarLabel: "Messages",
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          headerShown: true,
          headerTitle: "Diagnostic Reports",
          headerTitleStyle: { fontSize: 30 },
          headerRight: () => {
            const getUser = async () => {
              const response = await axios
                .get(`${API}/api/user/66af9f932f0c9c88cf3cdc94`)
                .then(({ data }) => {
                  setUser(data.user);
                  console.log(data.user);
                });
            };
            return (
              <View className="flex flex-row space-x-2 items-center justify-center pr-2">
                <Image
                  source={{ uri: `${API}/${user?.avatar}` }}
                  placeholder={{ blurhash }}
                  className="w-10 h-10 rounded-full"
                  contentFit="cover"
                  transition={1000}
                  cachePolicy={"memory-disk"}
                />
              </View>
            );
          },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "browsers" : "browsers-outline"}
              color={focused ? color : "black"}
            />
          ),
          tabBarLabel: "More",
        }}
      />
      <Tabs.Screen
        name="(top-tabs)"
        options={{
          headerShown: true,
          title: "",
          headerLeft: () => (
            <Text className="font-bold text-3xl py-3 px-4">My series</Text>
          ),
          headerRight: () => {
            const getUser = async () => {
              const response = await axios
                .get(`${API}/api/user/66af9f932f0c9c88cf3cdc94`)
                .then(({ data }) => {
                  setUser(data.user);
                  console.log(data.user);
                });
            };
            return (
              <View className="flex flex-row space-x-2 items-center justify-center pr-2">
                <FontAwesome onPress={getUser} name="trash-o" size={25} />
                <MaterialIcons name="bookmark-remove" size={25} />
                <Image
                  source={{ uri: `${API}/${user?.avatar}` }}
                  placeholder={{ blurhash }}
                  className="w-8 h-8 rounded-full"
                  contentFit="cover"
                  transition={1000}
                  cachePolicy={"memory-disk"}
                />
              </View>
            );
          },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "options" : "options-sharp"}
              color={focused ? color : "black"}
            />
          ),
          tabBarLabel: "Series",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          headerTitle: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={focused ? color : "black"}
            />
          ),
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}
