import { useCallback, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";

import { blurhash } from "@/constants";
import { homeDateToon } from "@/constants/home-webtoon";
import { Image } from "expo-image";
import { router } from "expo-router";
import ToonFlexItem from "@/components/app/ToonFlexItem";
import { getAverageLikedToons } from "@/hooks/fetchToons";
import { comcom } from "@/constants/comcom";

function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    // @ts-ignore
    const j: any = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return array;
}

export default function Detail() {
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);
  // Refresh function to reload data
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Fetch or reload your data here
    setTimeout(() => {
      router.replace("/(root)/(tabs)/(top-tabs)/detail");
      // Assuming you reload data here
      setRefreshing(false);
    }, 200); // Simulate a delay of 2 seconds
  }, []);

  const shuffledArray = shuffle(
    getAverageLikedToons(comcom).sort(() => Math.random() - 0.5)
  );

  return (
    <View className="flex-1">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={shuffledArray.slice(5, 15)}
        keyExtractor={(item) => item.title}
        renderItem={({ item, index }) => (
          // <View className="flex flex-row items-center w-full gap-2 pr-3 border-b-[1px] border-slate-300/50">
          //   {/* Toon Image */}
          //   <Image
          //     source={item.image}
          //     className="h-[80px] w-[80px]"
          //     placeholder={{ blurhash }}
          //     contentFit="cover"
          //     transition={1000}
          //     cachePolicy={"memory-disk"}
          //   />
          //   {/* Toon Info */}
          //   <View className="flex-1 justify-start space-x-2">
          //     <View className="flex flex-col items-left">
          //       <Text className="font-semibold text-lg">{item.title}</Text>
          //       <Text className="font-normal text-gray-700 text-sm">
          //         {item.author}
          //       </Text>
          //       <Text className="font-normal text-gray-700 text-sm capitalize">
          //         {item.genre}
          //       </Text>
          //     </View>
          //   </View>

          //   {/* Last Viewd Chapter */}
          //   <View className="flex items-center">
          //     <Text className="font-normal text-lg text-gray-700">
          //       #{item.id.slice(0, 3)}
          //     </Text>
          //   </View>
          // </View>
          <ToonFlexItem key={index} item={item} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
