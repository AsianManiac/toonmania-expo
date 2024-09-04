import React from "react";
import { FlatList, Text, View } from "react-native";

const HoriParts = ({ parts }: { parts: any }) => {
  const renderPart = ({ item }: { item: any }) => (
    <View className="mr-4 p-4 bg-white rounded-lg shadow w-40">
      <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
      <Text className="text-gray-600">Ref: {item.reference}</Text>
      <Text className="text-gray-600">Stock: {item.stockQuantity}</Text>
      <Text className="text-gray-600">Price: ${item.unitPrice}</Text>
    </View>
  );
  return (
    <View>
      <FlatList
        data={parts}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderPart}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default HoriParts;
