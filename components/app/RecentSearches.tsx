import React from "react";
import { FlatList, StyleSheet } from "react-native";

import SearchItem from "./SearchItem";

const searches: string[] = [
  "marry m",
  "morgan &",
  "tower of go",
  "beau &",
  "hyacint",
  "midnight popp",
  "subz",
  "to the stars",
  "Croisen finds himself",
  "Tartarus",
  "star Braydin",
  "Swolemates",
  "Lariette decides",
];

const RecentSearches = ({
  activeSearch,
  handleSearchClick,
}: {
  activeSearch: string;
  handleSearchClick: any;
}) => {
  //   let searches: any = [];
  const handleDeleteSearch = (index: number): void => {
    searches.indexOf(index.toString());
    console.log("Delete Search", index);
  };

  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.contentContainer}
      showsHorizontalScrollIndicator={false}
      data={searches}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => (
        <SearchItem
          index={index}
          text={item}
          handleDeleteSearch={handleDeleteSearch(index)}
          isActive={activeSearch == item}
          handleSearchClick={handleSearchClick}
        />
      )}
    />
  );
};

export default RecentSearches;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 12,
    gap: 8,
  },
});
