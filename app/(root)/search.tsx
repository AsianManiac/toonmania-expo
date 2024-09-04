import CustomImage from "@/components/app/CustomImage";
import RecentSearches from "@/components/app/RecentSearches";
import { blurhash, images } from "@/constants";
import { homeDateToon, HomeToonsProps } from "@/constants/home-webtoon";
import useDebounce from "@/hooks/useDebounce";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type IconNames =
  | Exclude<React.ComponentProps<typeof AntDesign>["name"], undefined>
  | Exclude<React.ComponentProps<typeof FontAwesome>["name"], undefined>
  | Exclude<React.ComponentProps<typeof FontAwesome5>["name"], undefined>
  | Exclude<React.ComponentProps<typeof Ionicons>["name"], undefined>
  | Exclude<React.ComponentProps<typeof SimpleLineIcons>["name"], undefined>
  | Exclude<React.ComponentProps<typeof MaterialIcons>["name"], undefined>
  | Exclude<
      React.ComponentProps<typeof MaterialCommunityIcons>["name"],
      undefined
    >;

interface Genre {
  name: string;
  icon: IconNames;
  iconPack?:
    | "AntDesign"
    | "FontAwesome"
    | "FontAwesome5"
    | "Ionicons"
    | "SimpleLineIcons"
    | "MaterialIcons"
    | "MaterialCommunityIcons"; // Optional property to specify the icon pack
}

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [searchResults, setSearchResults] = useState<HomeToonsProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSearch = (search: string) => {
    setSearchTerm(search);
    console.log("Searching for:", searchTerm);
  };

  const handleRecentSearch = (search: string) => {
    setActiveSearch(search);
    setSearchTerm(search);
  };
  const handleCancel = () => {
    setSearchTerm(""); // Clear the search input
  };
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const fetchSearchResults = async () => {
        setIsLoading(true);
        try {
          // Replace with your actual API endpoint
          // const response = await fetch(
          //   `${API}/api/user/query-user?query=${debouncedSearchTerm}`
          // );
          // console.log(JSON.stringify(response));
          // const data = await response.json();
          const data = homeDateToon.filter(
            (item) =>
              item.title
                .toLocaleLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              item.shortSummary
                ?.toLocaleLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              item.longSummary
                ?.toLocaleLowerCase()
                .includes(searchTerm.toLowerCase())
          );
          setSearchResults(data); // Adjust according to your API response structure
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchSearchResults();
    } else {
      setSearchResults([]); // Clear results when the search term is empty
    }
  }, [debouncedSearchTerm]);

  const genres: Genre[] = [
    { name: "Romance", icon: "hearto" },
    { name: "Fantasy", icon: "star" },
    { name: "Drama", icon: "drama-masks", iconPack: "MaterialCommunityIcons" }, // Ensure this icon exists in FontAwesome
    {
      name: "Supernatural",
      icon: "ghost-outline",
      iconPack: "MaterialCommunityIcons",
    },
    { name: "Action", icon: "crosshairs", iconPack: "FontAwesome" },
    { name: "Comedy", icon: "smileo" },
    { name: "Slice of life", icon: "sun-o", iconPack: "FontAwesome" },
    { name: "Thriller", icon: "knife", iconPack: "MaterialCommunityIcons" },
    { name: "Historical", icon: "university", iconPack: "FontAwesome" },
    { name: "Mystery", icon: "user-secret", iconPack: "FontAwesome" },
    { name: "Superhero", icon: "superpowers", iconPack: "FontAwesome" },
    { name: "Sci-fi", icon: "rocket1" },
    { name: "Sports", icon: "sports-soccer", iconPack: "MaterialIcons" },
    {
      name: "Heart-warming",
      icon: "heart-multiple-outline",
      iconPack: "MaterialCommunityIcons",
    },
    { name: "Horror", icon: "skull-outline", iconPack: "Ionicons" },
    { name: "Information", icon: "book-open", iconPack: "SimpleLineIcons" },
  ];
  const trending = [
    {
      name: "Emerald Midnight's Lover",
      image: "https://source.unsplash.com/random/50x50?sig=1",
      genre: "Drama",
    },
    {
      name: "Señorita Cometa",
      image: "https://source.unsplash.com/random/50x50?sig=2",
      genre: "Mystery",
    },
    {
      name: "Love Me Knot",
      image: "https://source.unsplash.com/random/50x50?sig=3",
      genre: "Romance",
    },
  ];

  return (
    <View className="flex-1 bg-white pt-12 gap-2">
      {/* Header with Search Input */}
      <View className="flex-row items-center px-4">
        <TextInput
          placeholder="Search Title or Creator"
          placeholderTextColor="#888"
          className="flex-1 bg-gray-200/80 rounded-md py-2 px-4 text-white placeholder:text-gray-700"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity onPress={handleCancel} className="ml-2">
          <Text className="text-blue-500 text-base capitalize">Cancel</Text>
        </TouchableOpacity>
        {/* <AntDesign
          name="search1"
          size={24}
          color="black"
          className=""
          style={{ marginLeft: 8 }}
        /> */}
      </View>

      <ScrollView>
        {searchResults.length > 0 && (
          <Text className="font-medium text-black/50 text-sm px-5 pt-1 text-right">
            {searchResults.length} results
          </Text>
        )}
        {isLoading && searchResults.length === 0 && (
          <Text className="text-black text-center">No results found</Text>
        )}
        {isLoading ? (
          <Text className="text-black text-center">Loading...</Text>
        ) : (
          searchResults.length > 0 &&
          searchResults.map((result, index) => (
            <View key={index}>
              <View className="flex-row items-center my-2 mx-4">
                <Image
                  source={result.image}
                  contentFit="cover"
                  transition={1000}
                  className="w-12 h-12 rounded-full"
                  cachePolicy={"memory-disk"}
                  placeholder={{ blurhash }}
                />
                <View>
                  <Text className="text-black ml-3 font-bold text-base">
                    {result.title}
                  </Text>
                  <Text className="text-black ml-3 font-light">
                    {result.author}
                  </Text>
                  <Text className="text-black ml-3 font-semibold">
                    {result.genre}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {searchResults.length === 0 && (
        <>
          {/* Recent searches */}
          <View className="flex flex-col space-y-2">
            <View className="pb-2 flex flex-row justify-between">
              <Text className="text-black capitalize font-bold px-4 text-xl">
                Recent Searches
              </Text>
              <Text className="text-black/50 capitalize font-light px-4 text-base">
                Delete All
              </Text>
            </View>
            <RecentSearches
              activeSearch={activeSearch}
              handleSearchClick={handleRecentSearch}
            />
          </View>

          {/* Trending Section */}
          <Text className="text-black font-bold px-4 pt-4 text-xl">
            Trending Now
          </Text>
          <ScrollView className="">
            {homeDateToon.slice(0, 5).map((item, index) => (
              <View key={index} className="flex-row items-center my-2 mx-4">
                <CustomImage
                  placeholder={"No Image"}
                  defaultImage={images.placeholderImage}
                  source={item.image}
                  className="w-12 h-12 rounded-full"
                />
                <View>
                  <Text className="text-black ml-3 font-bold text-base">
                    {item.title}
                  </Text>
                  <Text className="text-black ml-3 font-light">
                    {item.author}
                  </Text>
                  <Text className="text-black ml-3 font-semibold">
                    {item.genre}
                  </Text>
                </View>
              </View>
            ))}

            {/* Favorite Genres Section */}
            <Text className="text-black font-bold px-4 pt-4 text-2xl">
              Favorite Genres
            </Text>
            <View className="flex-row flex-wrap justify-around py-5 px-2 gap-1">
              {genres.map((genre, index) => (
                <TouchableOpacity key={index} className="items-center mb-4">
                  {genre.iconPack === "FontAwesome" ? (
                    <Pressable
                      onPress={() => handleSearch(genre.name)}
                      className="bg-slate-300/30 rounded-full p-6"
                    >
                      <FontAwesome
                        name={genre.icon as IconNames}
                        size={35}
                        color="black"
                      />
                    </Pressable>
                  ) : genre.iconPack === "MaterialCommunityIcons" ? (
                    <Pressable
                      onPress={() => handleSearch(genre.name)}
                      className="bg-slate-300/30 rounded-full p-6"
                    >
                      <MaterialCommunityIcons
                        name={genre.icon as IconNames}
                        size={35}
                        color="black"
                      />
                    </Pressable>
                  ) : genre.iconPack === "MaterialIcons" ? (
                    <Pressable
                      onPress={() => handleSearch(genre.name)}
                      className="bg-slate-300/30 rounded-full p-6"
                    >
                      <MaterialIcons
                        name={genre.icon as IconNames}
                        size={35}
                        color="black"
                      />
                    </Pressable>
                  ) : genre.iconPack === "FontAwesome5" ? (
                    <Pressable
                      onPress={() => handleSearch(genre.name)}
                      className="bg-slate-300/30 rounded-full p-6"
                    >
                      <FontAwesome5
                        name={genre.icon as IconNames}
                        size={35}
                        color="black"
                      />
                    </Pressable>
                  ) : genre.iconPack === "Ionicons" ? (
                    <Pressable
                      onPress={() => handleSearch(genre.name)}
                      className="bg-slate-300/30 rounded-full p-6"
                    >
                      <Ionicons
                        name={genre.icon as IconNames}
                        size={35}
                        color="black"
                      />
                    </Pressable>
                  ) : genre.iconPack === "SimpleLineIcons" ? (
                    <Pressable
                      onPress={() => handleSearch(genre.name)}
                      className="bg-slate-300/30 rounded-full p-6"
                    >
                      <SimpleLineIcons
                        name={genre.icon as IconNames}
                        size={35}
                        color="black"
                      />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => handleSearch(genre.name)}
                      className="bg-slate-300/30 rounded-full p-6"
                    >
                      <AntDesign
                        name={genre.icon as IconNames}
                        size={35}
                        color="black"
                      />
                    </Pressable>
                  )}
                  <Text className="text-black mt-2">{genre.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}
