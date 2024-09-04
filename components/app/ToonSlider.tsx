import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Webtoon } from "@/constants/comcom";
import { blurhash } from "@/constants";
import { Image } from "expo-image";
import EmptyState from "./EmptyState";
import { Link, LinkProps } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

declare interface ToonSliderProps {
  toons: Webtoon[];
  title: string;
  href?: LinkProps<string>["href"];
  subtitle?: string;
  numberOfLines?: number;
  showGenre?: boolean;
}
const ToonSlider = ({
  toons,
  title,
  subtitle,
  href,
  numberOfLines = 1,
  showGenre = false,
}: ToonSliderProps) => {
  // Function to render each toon item
  const renderToonItem = ({ item }: { item: Webtoon }) => (
    <View className="mr-1.5 pb-1">
      <Image
        source={item.image}
        style={styles.toonImage}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
        cachePolicy={"memory-disk"}
      />
      <View className="px-1">
        {showGenre && (
          <Text className="text-gray-700 text-left pt-1 text-xs font-normal capitalize">
            {item.genre}
          </Text>
        )}
        <Text numberOfLines={numberOfLines} style={styles.toonName}>
          {item.title}
        </Text>
      </View>
    </View>
  );
  return (
    <View>
      <View className="flex flex-row items-center justify-between my-3 px-3.5">
        <View>
          <Text className="text-lg font-bold capitalize">{title}</Text>
          {subtitle && (
            <Text className="text-sm text-gray-700 font-normal">
              {subtitle}
            </Text>
          )}
        </View>
        {href && (
          <Link href={href}>
            <FontAwesome5 name="chevron-right" size={16} />
          </Link>
        )}
      </View>
      <FlatList
        data={toons}
        style={{ paddingLeft: 15 }}
        renderItem={renderToonItem}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Toons Listed"
            subtitle="Toons not found for this section"
          />
        )}
      />
    </View>
  );
};

export default ToonSlider;

// Function to render each toon item
export const renderToonItem = ({ item }: { item: Webtoon }) => (
  <View className="mr-1.5 pb-1">
    <Image
      source={item.image}
      style={styles.toonImage}
      placeholder={{ blurhash }}
      contentFit="cover"
      transition={1000}
      cachePolicy={"memory-disk"}
    />
    <View className="px-1">
      <Text numberOfLines={1} style={styles.toonName}>
        {item.title}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  dayTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 10,
  },
  popularTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    marginLeft: 10,
  },
  toonImage: {
    width: 100,
    height: 110,
    borderRadius: 4,
  },
  toonName: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 12,
    fontWeight: "700",
    width: 90,
    paddingTop: 2,
  },
});
