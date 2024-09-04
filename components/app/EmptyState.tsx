import { router } from "expo-router";
import { View, Text } from "react-native";

import CustomButton from "./CustomButton";
import { blurhash, images } from "@/constants";
import { Image } from "expo-image";

const EmptyState = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={images.empty}
        placeholder={{ blurhash }}
        className="w-[270px] h-[216px]"
      />

      <Text className="text-sm font-pmedium text-gray-100">{title}</Text>
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {subtitle}
      </Text>

      <CustomButton
        title="Back to Explore"
        onPress={() => router.push("/(root)/(tabs)/download")}
        className="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
