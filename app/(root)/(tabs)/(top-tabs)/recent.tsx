import { blurhash } from "@/constants";
import { homeDateToon } from "@/constants/home-webtoon";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { BlurView } from "expo-blur";
import { getAverageLikedToons } from "@/hooks/fetchToons";
import { comcom } from "@/constants/comcom";
import ToonFlexItem from "@/components/app/ToonFlexItem";

const Recent = () => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      router.replace("/(root)/(tabs)/(top-tabs)/recent");
      setRefreshing(false);
    }, 500);
  }, []);
  {
    refreshing && (
      <View className="flex-1 h-full w-full items-center justify-center">
        <BlurView tint="dark" />
      </View>
    );
  }

  const recentWatch = getAverageLikedToons(comcom);
  return (
    <View>
      <StatusBar style="light" />
      <View className="flex flex-col">
        {/* Content */}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={recentWatch}
          keyExtractor={(item) => item.title}
          renderItem={({ item, index }) => (
            <ToonFlexItem key={index} item={item} />
          )}
          ListHeaderComponent={
            <>
              {/* Header */}
              <View className="flex flex-row items-center space-x-5 p-4">
                <TouchableOpacity className="flex flex-row gap-1 items-center">
                  <FontAwesome name="refresh" size={12} color={"green"} />
                  <Text className="uppercase font-bold text-[14px]">
                    {homeDateToon.length} series total
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text className="uppercase font-bold text-[14px]">
                    Unread series
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text className="uppercase font-bold text-[14px]">
                    Daily pass
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Adds */}
              <View className="p-3 flex-row items-center justify-center gap-1 bg-purple-300/30">
                <MaterialCommunityIcons
                  name="cloud-sync"
                  color={"green"}
                  size={40}
                />
                <View className="flex flex-col text-center w-[65%]">
                  <Text className="font-extrabold text-2xl text-center">
                    <Text className="text-green-500">Sync </Text>
                    <Text className="">your reading across </Text>
                    <Text className="text-green-500">all your devices!</Text>
                  </Text>
                </View>
              </View>
            </>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

export default Recent;
