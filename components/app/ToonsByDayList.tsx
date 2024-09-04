import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Webtoon } from "@/constants/comcom";
import { blurhash } from "@/constants";

const ToonsByDayList = ({ toons }: { toons: Webtoon[] }) => {
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
      <Text numberOfLines={1} style={styles.toonName}>
        {item.title}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={toons}
      style={{ paddingLeft: 15 }}
      renderItem={renderToonItem}
      keyExtractor={(item, index) => `${item.title}-${index}`}
      horizontal
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={<Text>No Toons Available</Text>}
    />
  );
};

export default ToonsByDayList;

const styles = StyleSheet.create({
  toonItem: {
    marginRight: 10,
    paddingBottom: 5,
    alignItems: "center",
  },
  toonImage: {
    width: 100,
    height: 110,
    borderRadius: 4,
  },
  toonName: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 12,
    fontWeight: "700",
    width: 90,
  },
  genreTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
});
