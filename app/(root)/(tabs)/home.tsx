import Carousel from "@/components/app/Carousel";
import ToonsByDayList from "@/components/app/ToonsByDayList";
import ToonsByGenresList from "@/components/app/ToonsByGenreList";
import ToonSlider from "@/components/app/ToonSlider";
import { API } from "@/constants";
import { comcom } from "@/constants/comcom";
import {
  getAverageLikedToons,
  getLeastLikedToons,
  getToonsByAuthor,
  getToonsByDay,
  getToonsByFiveGenresWithMostLiked,
  getToonsByGenre,
} from "@/hooks/fetchToons";
import { Part } from "@/types/type";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";

export default function Home() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      router.replace("/(root)/(tabs)/home");
      setRefreshing(false);
    }, 500);
  }, []);

  useEffect(() => {
    const fetchReportsAndParts = async () => {
      try {
        const partsResponse = await fetch(`${API}/api/part`);

        if (!partsResponse.ok) {
          throw new Error("Failed to fetch data.");
        }
        const partsData = await partsResponse.json();
        setParts(partsData.parts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReportsAndParts();
  }, []);

  const ongoingToons = comcom.ONGOING;
  const toonsData = comcom;
  // Get most popular toons (highest likes)
  const mostPopularToons = ongoingToons
    .flatMap((day) => day.webtoons)
    .sort((a, b) => parseInt(b.likes || "0") - parseInt(a.likes || "0"))
    .slice(12, 25);
  const allToons = ongoingToons.flatMap((day) => day.webtoons).slice(12, 25);

  const toonByDay = getToonsByDay(toonsData, "monday", true);
  const topFiveGenresToons = getToonsByFiveGenresWithMostLiked(toonsData);
  const leastLikedToons = getLeastLikedToons(toonsData);
  const averageLikedToons = getAverageLikedToons(toonsData);
  const actionToons = getToonsByGenre(toonsData, "action");
  const authorToons = getToonsByAuthor(toonsData, "Sophism");
  const genreToon = (genre: string) => {
    return getToonsByGenre(toonsData, genre);
  };

  return (
    <View className="flex-1 pb-14">
      <FlatList
        data={[{ id: "1" }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text></Text>}
        ListHeaderComponent={<Carousel />}
        ListFooterComponent={
          <View className="py-3">
            <View>
              <ToonSlider
                href={"/(root)/(tabs)/message"}
                title="My Series"
                toons={mostPopularToons}
                showGenre
              />
              <ToonSlider
                title="Popular Today"
                href={"/(root)/(tabs)/(top-tabs)/subscribed"}
                toons={allToons}
                showGenre
              />
              <ToonSlider
                title="Daily Pass"
                href={"/(root)/(tabs)/(top-tabs)/account"}
                subtitle="Check in daily to unlock your free episode!"
                toons={mostPopularToons}
              />
              <ToonSlider title="CANVAS Super Like Rankings" toons={allToons} />
              <ToonSlider title="New Toons" toons={leastLikedToons} showGenre />
              <ToonSlider
                title="Up Coming TOONS"
                toons={averageLikedToons}
                showGenre
              />
              <ToonSlider
                title="Author - { Sophism }"
                toons={authorToons}
                showGenre
              />
            </View>

            <View>
              <ToonsByDayList toons={toonByDay} />
              <ToonsByGenresList genreToons={topFiveGenresToons} />
            </View>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
