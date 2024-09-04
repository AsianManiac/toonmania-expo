import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const { query } = useLocalSearchParams();

  return (
    <SafeAreaView className="bg-primary h-full">
      {/* <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (

        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {query}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput initialQuery={query} />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      /> */}
    </SafeAreaView>
  );
};

export default Search;
