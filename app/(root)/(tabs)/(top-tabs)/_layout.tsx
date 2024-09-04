import TopTab from "@/components/app/TopTab";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import { Dimensions, ScrollView } from "react-native";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function Layout() {
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "blue" },
        tabBarLabelStyle: { fontWeight: "bold", fontSize: 12 },
      }}
      tabBarPosition="top"
      initialLayout={{ width: Dimensions.get("screen").width }}
      tabBar={(props) => (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex flex-row border-y-[1px] border-slate-300"
          style={{ maxHeight: 45 }}
          contentContainerStyle={{
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <TopTab {...props} />
          {/* <TouchableOpacity
            onPress={() => router.navigate("/(root)/(tabs)/(top-tabs)/recent")}
          >
            <Text
              className={`font-bold text-xl uppercase px-2 ${
                focused ? "border-b-2 border-green-500" : ""
              }`}
            >
              Recent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              router.navigate("/(root)/(tabs)/(top-tabs)/subscribed")
            }
          >
            <Text
              className={`font-bold text-xl uppercase px-2 ${
                focused ? "border-b-2 border-green-500" : ""
              }`}
            >
              Subscribed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.navigate("/(root)/(tabs)/(top-tabs)/detail")}
          >
            <Text
              className={`font-bold text-xl uppercase px-2 ${
                focused ? "border-b-2 border-green-500" : ""
              }`}
            >
              Details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.navigate("/(root)/(tabs)/(top-tabs)/account")}
          >
            <Text
              className={`font-bold text-xl uppercase px-2 ${
                focused ? "border-b-2 border-green-500" : "border-none"
              }`}
            >
              Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.navigate("/(root)/(tabs)/(top-tabs)/account")}
          >
            <Text
              className={`font-bold text-xl uppercase px-2 ${
                focused ? "border-b-2 border-green-500" : "border-none"
              }`}
            >
              Account
            </Text>
          </TouchableOpacity> */}
        </ScrollView>
      )}
    >
      <MaterialTopTabs.Screen
        name="recent"
        options={{
          title: "RECENTS",
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => {
          //       /* handle action */
          //     }}
          //   >
          //     <FontAwesome
          //       name="book"
          //       size={24}
          //       color="black"
          //       style={{ marginRight: 10 }}
          //     />
          //   </TouchableOpacity>
          // ),
        }}
      />
      <MaterialTopTabs.Screen
        name="subscribed"
        options={{
          title: "SUBSCRIBED",
        }}
      />
      <MaterialTopTabs.Screen
        name="detail"
        options={{
          title: "DOWNLOADS",
        }}
      />
      <MaterialTopTabs.Screen
        name="unlock"
        options={{
          title: "UNLOCK",
        }}
      />
      <MaterialTopTabs.Screen
        name="creator"
        options={{
          title: "CREATOR",
        }}
      />
      <MaterialTopTabs.Screen
        name="account"
        // options={{
        //   title: "ACCOUNT",
        // }}
      />
    </MaterialTopTabs>
  );
}
