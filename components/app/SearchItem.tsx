import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

const SearchItem = ({
  text,
  index,
  handleSearchClick,
  handleDeleteSearch,
  isActive,
}: {
  text: string;
  index: number;
  handleSearchClick: any;
  handleDeleteSearch: any;
  isActive: boolean;
}) => {
  return (
    <View>
      <Pressable
        onPress={() => handleSearchClick(isActive ? null : text)}
        className="flex flex-row items-center justify-center border py-1 px-2 rounded-full border-collapse border-slate-300"
      >
        <Text className="pr-1 text-sm">{text}</Text>
        <TouchableOpacity className="pl-1">
          <Text className="text-base text-slate-300">
            <Ionicons name="close" size={16} />
          </Text>
        </TouchableOpacity>
      </Pressable>
    </View>
  );
};

export default SearchItem;
