import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Webtoon } from "@/constants/comcom";
import { blurhash } from "@/constants";
import { Image } from "expo-image";

const ToonFlexItem = ({ item }: { item: Webtoon }) => {
  return (
    <TouchableOpacity className="flex flex-row focus:bg-general-600 items-center w-full gap-2 pr-3 border-b-[1px] border-gray-300/50">
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
        <Text className="font-normal text-lg text-gray-700">#{"12"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ToonFlexItem;
