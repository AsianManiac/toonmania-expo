import CreateToonForm from "@/components/app/forms/CreateToonForm";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Loader from "@/components/app/Loader";
import { blurhash } from "@/constants";
import { axios } from "@/lib/axiosClient";
import { Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";

const CreateToon = () => {
  const [toons, setToons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch toons
  const fetchToons = async () => {
    try {
      setIsLoading(true);
      await axios
        .get(`/toon`)
        .then(({ data }) => {
          setToons(data.results);
        })
        .catch(({ response }) => {
          console.log(response.data.message);
        });
    } catch (error: any) {
      console.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchToons();
  }, []);

  const onRefresh = useCallback(() => {
    try {
      setRefreshing(true);
      setTimeout(() => {
        router.replace("/(create-toon)/create");
        fetchToons();
        setRefreshing(false);
      }, 500);
    } catch (error: any) {
      console.log(error.response);
    }
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <Pressable
      onPress={() => router.push(`/(root)/(create-toon)/${item.id}`)}
      className={"flex-row items-center bg-white mb-2 rounded-lg shadow"}
    >
      <Image
        source={{ uri: item.coverImage }}
        className={"w-20 h-20 rounded-l-lg"}
        placeholder={{ blurhash }}
      />
      <View className={"flex-1 ml-2"}>
        <Text className={"text-lg text-primary font-bold"} numberOfLines={1}>
          {item.title}
        </Text>
        <Text className={"text-gray-600"} numberOfLines={1}>
          {item.description}
        </Text>
        <Text className={"text-gray-400"}>Title No: {item.titleNo}</Text>
      </View>
      <TouchableOpacity
        className={"p-2"}
        onPress={() => {
          // Implement dropdown actions or use a dropdown library here
        }}
      >
        <Entypo name="dots-three-vertical" size={24} color="black" />
      </TouchableOpacity>
    </Pressable>
  );

  return (
    <>
      <FlatList
        data={toons}
        renderItem={renderItem}
        style={styles.container}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
        ListHeaderComponent={<CreateToonForm />}
        ListFooterComponent={<Text></Text>}
        ListFooterComponentStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          isLoading ? (
            <Loader message="Loading toons and authors..." classname="pt-4" />
          ) : (
            <View className="">
              <Text className="text-xl text-center text-rose-500 font-semibold">
                No toons available
              </Text>
            </View>
          )
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </>
  );
};

export default CreateToon;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "#e0f7e9",
  },
});
