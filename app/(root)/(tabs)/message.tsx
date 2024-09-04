import EmptyState from "@/components/app/EmptyState";
import { API, blurhash } from "@/constants";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from "react-native";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  isActive: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  // Refresh function to reload data
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Fetch or reload your data here
    setTimeout(() => {
      router.replace("/(root)/(tabs)/message");
      // Assuming you reload data here
      setRefreshing(false);
    }, 500); // Simulate a delay of 2 seconds
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API}/api/user`); // Replace with your IP
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const renderUser = ({ item }: { item: User }) => (
    <View className="mb-4 p-4 bg-white rounded-lg shadow flex-row items-center">
      {/* <Text>{JSON.stringify(users, undefined, 2)}</Text> */}
      <Image
        source={{ uri: `${API}/${item.avatar}` }} // Replace with your IP
        className="w-16 h-16 rounded-full mr-4"
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
        cachePolicy={"memory-disk"}
      />
      <View>
        <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
        <Text className="text-gray-600">{item.email}</Text>
        <Text className="text-gray-500">{item.role}</Text>
        <Text
          className={`text-xs ${
            item.isActive ? "text-green-500" : "text-red-500"
          }`}
        >
          {item.isActive ? "Active" : "Inactive"}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-lg">Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-2">
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={renderUser}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <Pressable className="pt-10 pb-4">
            <Text className="font-bold text-4xl">Users</Text>
          </Pressable>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <EmptyState
            title={"No users found"}
            subtitle="Please check your data connection"
          />
        }
      />
    </SafeAreaView>
  );
}
