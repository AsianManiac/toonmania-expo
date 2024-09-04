import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Webtoon } from "@/constants/comcom";
import { blurhash } from "@/constants";

const ToonsByGenresList = ({
  genreToons,
}: {
  genreToons: Record<string, Webtoon[]>;
}) => {
  return (
    <View>
      {Object.entries(genreToons).map(([genre, toons]) => (
        <View key={genre}>
          <Text style={styles.genreTitle} numberOfLines={1}>
            {genre}
          </Text>
          <FlatList
            data={toons}
            style={{ paddingLeft: 15 }}
            renderItem={({ item }) => (
              <View style={styles.toonItem}>
                <Image
                  source={item.image}
                  style={styles.toonImage}
                  placeholder={{ blurhash }}
                  contentFit="cover"
                  transition={1000}
                  cachePolicy={"memory-disk"}
                />
                <Text style={styles.toonName} numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => `${item.title}-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ))}
    </View>
  );
};

export default ToonsByGenresList;

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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 14,
    marginTop: 20,
  },
});
