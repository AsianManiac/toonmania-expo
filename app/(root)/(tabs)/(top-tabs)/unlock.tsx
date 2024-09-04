import { useCallback, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";

import { blurhash } from "@/constants";
import { homeDateToon } from "@/constants/home-webtoon";
import { Image } from "expo-image";
import { router } from "expo-router";

export default function Unlock() {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      router.replace("/(root)/(tabs)/(top-tabs)/unlock");
      setRefreshing(false);
    }, 500);
  }, []);
  return (
    <View className="flex-1">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={homeDateToon.slice(7, 14)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex flex-row items-center w-full gap-2 pr-3 border-b-[1px] border-gray-300/50">
            {/* Toon Image */}
            <Image
              source={item.image}
              className="h-[80px] w-[80px]"
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
              cachePolicy={"memory-disk"}
            />
            {/* Toon Info */}
            <View className="flex-1 justify-start space-x-2">
              <View className="flex flex-col items-left">
                <Text className="font-semibold text-lg">{item.title}</Text>
                <Text className="font-normal text-gray-700 text-sm">
                  {item.author}
                </Text>
                <Text className="font-normal text-gray-700 text-sm capitalize">
                  {item.genre}
                </Text>
              </View>
            </View>

            {/* Last Viewd Chapter */}
            <View className="flex items-center">
              <Text className="font-normal text-lg text-gray-700">
                #{item.id.slice(0, 3)}
              </Text>
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
