import EmptyState from "@/components/app/EmptyState";
import { blurhash } from "@/constants";
import { comcom, ToonData, Webtoon } from "@/constants/comcom";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MachinePart {
  _id: string;
  name: string;
  reference: string;
  stockQuantity: number;
  unitPrice: number;
}

const getImageSource = (imagePath: string) => {
  if (!imagePath) {
    return require("@/assets/images/woocommerce-placeholder.webp"); // Fallback to a placeholder image
  }

  try {
    // return require(`@/assets${imagePath}`);
  } catch (error) {
    console.error("IMAGE_DISPLAY_ERROR", error);
    return require("@/assets/images/woocommerce-placeholder.webp"); // Fallback to placeholder if the image is not found
  }
};

export default function Download() {
  const [parts, setParts] = useState<MachinePart[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      router.replace("/(root)/(tabs)/download");
      setRefreshing(false);
    }, 500);
  }, []);

  // useEffect(() => {
  //   const fetchParts = async () => {
  //     try {
  //       const response = await fetch(`${API}/api/part`);
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setParts(data.parts);
  //     } catch (error: any) {
  //       console.error("Failed to fetch parts:", error);
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchParts();
  // }, []);

  const renderPart = ({ item }: { item: MachinePart }) => (
    <View className={"mb-4 p-4 bg-white rounded-lg shadow"}>
      <Text className={"text-xl font-bold text-gray-800"}>{item.name}</Text>
      <Text className={"text-gray-600"}>Reference: {item.reference}</Text>
      <Text className={"text-gray-600"}>
        Stock Quantity: {item.stockQuantity}
      </Text>
      <Text className={"text-gray-600"}>
        Unit Price: ${item.unitPrice.toLocaleString()}
      </Text>
    </View>
  );

  // TOONS SECTION
  const ongoingToons = comcom.ONGOING;

  // Function to render each toon item
  const renderToonItem = ({ item }: { item: Webtoon }) => (
    <View style={styles.toonItem}>
      <Image
        source={item.image}
        style={styles.toonImage}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
        cachePolicy={"memory-disk"}
      />
      <Text numberOfLines={2} style={styles.toonName}>
        {item.title}
      </Text>
    </View>
  );

  // Function to render each day's toons
  const renderDaySection = (dayData: ToonData) => (
    <View key={dayData.day}>
      <Text style={styles.dayTitle}>{dayData.day}</Text>
      <FlatList
        data={dayData.webtoons.slice(0, 20)} // Show first 10 toons
        renderItem={renderToonItem}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  // Get most popular toons (highest likes)
  const mostPopularToons = ongoingToons
    .flatMap((day) => day.webtoons)
    .sort((a, b) => parseInt(b.likes || "0") - parseInt(a.likes || "0"));

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
        <Text className="text-red-500">Error: {error}</Text>
      </SafeAreaView>
    );
  }

  const renderPopularToonsRow = (rowToons: Webtoon[]) => (
    <FlatList
      data={rowToons}
      renderItem={renderToonItem}
      keyExtractor={(item, index) => `${item.title}-${index}`}
      horizontal
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={() => (
        <EmptyState
          title="No Videos Found"
          subtitle="No videos found for this profile"
        />
      )}
    />
  );

  return (
    <ScrollView className={"flex-1 bg-gray-100 p-1"}>
      {ongoingToons.map(renderDaySection)}
      {/* <FlatList
        data={parts}
        renderItem={renderPart}
        keyExtractor={(item) => item._id}
      /> */}

      <Text style={styles.popularTitle}>Most Popular Toons</Text>

      {/* Render the most popular toons in three rows */}
      {mostPopularToons
        .slice(0, 30)
        .reduce((rows, item, index) => {
          const rowIndex = Math.floor(index / 10); // 10 items per row
          if (!rows[rowIndex]) rows[rowIndex] = []; // Create a new row if it doesn't exist
          rows[rowIndex].push(item);
          return rows;
        }, [] as Webtoon[][])
        .map((rowToons, index) => (
          <View key={`row-${index}`} style={styles.rowContainer}>
            {renderPopularToonsRow(rowToons)}
          </View>
        ))}
    </ScrollView>
  );
}

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
  toonItem: {
    margin: 5,
    alignItems: "center",
  },
  toonImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  toonName: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "700",
    width: 90,
    textAlign: "center",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  rowContainer: {
    marginBottom: 5,
  },
});
