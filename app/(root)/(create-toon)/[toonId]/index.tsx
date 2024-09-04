import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Switch,
  ToastAndroid,
} from "react-native";
import { z } from "zod";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useMemo, useState } from "react";
import { Picker } from "@react-native-picker/picker";

import { axios } from "@/lib/axiosClient";
import InputField from "@/components/app/InputField";
import CustomButton from "@/components/app/CustomButton";
import { useRoute, useNavigation } from "@react-navigation/native";
import { uploadFile } from "@/lib/fileUpload";
import { Image } from "expo-image";
import { ToonProps } from "@/types/type";
import Loader from "@/components/app/Loader";
import { Ionicons } from "@expo/vector-icons";

// Zod schema for validation
const updateToonSchema = z.object({
  description: z.string().optional(),
  coverImage: z.string().optional(),
  isPublished: z.boolean().optional(),
  genreId: z.string().uuid().optional(),
});

const createEpisodeSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export default function UpdateToonForm() {
  const [toonData, setToonData] = useState({
    description: "",
    coverImage: "",
    isPublished: false,
    genreId: "",
  });
  const [episodeTitle, setEpisodeTitle] = useState("");
  const [toon, setToon] = useState<ToonProps>();
  const [genres, setGenres] = useState<any[]>([]);
  const [errors, setErrors] = useState<any>({});
  const [error, setError] = React.useState<Record<string, string>>({});
  const [filledFields, setFilledFields] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const route = useRoute();

  const { toonId } = route.params as {
    toonId: string;
  };

  // Fetch Toon Data for update
  const fetchToon = async () => {
    try {
      setIsLoading(true);
      await axios
        .get(`/toon/${toonId}`)
        .then(({ data }) => {
          setToon(data.results);
          setToonData({
            description: data.results.description || "",
            coverImage: data.results.coverImage || "",
            isPublished: data.results.isPublished || false,
            genreId: data.results.genreId || "",
          });
          setIsLoading(false);
        })
        .catch((response) => {
          console.error(response.data.message);
        });
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  // Fetch genres to populate the picker
  const fetchGenres = async () => {
    try {
      await axios
        .get(`/genre`)
        .then(({ data }) => {
          setGenres(data.results);
        })
        .catch((response) => {
          console.log("ELS", response.data.message);
        });
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchToon();
    fetchGenres();
  }, [toonId]);

  // const requiredFields = [
  //   toon.title,
  //   toon.authorId,
  //   toon.description,
  //   toon.coverImage,
  //   toon.genreId,
  //   // toon.episodes.some((episode) => episode.isPublished),
  // ];

  useEffect(() => {
    const filled = Object.values(toonData).filter(
      (value) => value !== undefined && value !== ""
    ).length;
    setFilledFields(filled);
  }, [toonData]);

  const handleChange = (name: string, value: string | boolean) => {
    setToonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEpisodeTitleChange = (value: string) => {
    setEpisodeTitle(value);
  };

  const onCreateEpisode = () => {
    const validation = createEpisodeSchema.safeParse({ title: episodeTitle });

    if (!validation.success) {
      setErrors({ episodeTitle: validation.error.errors[0]?.message });
      return;
    }

    setErrors({});
    setIsLoading(true);
    setTimeout(() => {
      // Simulate episode creation
      const newEpisodeId = "new-episode-id"; // Replace with real episode ID if needed
      router.push(`/(root)/(create-toon)/ywcwicbwwbikac/${newEpisodeId}`);
      setIsLoading(false);
    }, 1000);
  };

  const onSubmit = async () => {
    console.log(JSON.stringify(toonData));
    const validation = updateToonSchema.safeParse(toonData);

    if (!validation.success) {
      const newErrors: Partial<typeof toonData> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          // @ts-ignore
          newErrors[err.path[0] as keyof typeof toonData] = err.message;
        }
      });
      setErrors(newErrors);
    }

    setErrors({});
    try {
      setIsLoading(true);
      await axios
        .patch(`/toon/update-toon/${toonId}`, toonData)
        .then(({ data }) => {
          ToastAndroid.show(data.message, ToastAndroid.TOP);
          console.log(data.message, data.results);
        })
        .catch(({ response }) => {
          ToastAndroid.show(response.data.message, ToastAndroid.TOP);
          console.log("ERROR", response.data.message);
        });
    } catch (error: any) {
      console.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!toon) {
    return <Loader message="Loading toon information..." />;
  }

  return (
    <View style={styles.container}>
      {!toon.isPublished && (
        <View className="bg-yellow-300/80 border-yellow-30 text-primary mt-2 h-8 boder text-center flex flex-row items-center justify-center">
          <Ionicons name="warning" size={16} color="black" />
          <Text className=" ml-1" style={{ color: "hsl(142.1 76.2% 36.3%)" }}>
            This toon has not been published yet!
          </Text>
        </View>
      )}
      <ScrollView
        style={styles.container}
        className="pb-6"
        showsVerticalScrollIndicator={false}
      >
        <Text className="font-bold capitalize text-3xl text-[#2a9d8f] mb-7 pt-5">
          Update Toon - {toon.title}
        </Text>

        {/* Description Field */}
        <InputField
          label="Description"
          placeholder="Description"
          value={toonData.description}
          errors={errors.description}
          editable={true}
          onChangeText={(value) => handleChange("description", value)}
        />

        {/* Is Published Field */}
        <View style={styles.switchContainer}>
          <Text>Is Published</Text>
          <Switch
            value={toonData.isPublished}
            onValueChange={(value) => handleChange("isPublished", value)}
          />
        </View>

        {/* Genre ID Field */}
        <View className="bg-neutral-100 h-[50px] rounded-md border border-neutral-100 focus:border-primary-500">
          <Picker
            selectedValue={toonData.genreId}
            style={styles.input}
            onValueChange={(value: string) => handleChange("genreId", value)}
          >
            <Picker.Item
              label="Select Genre"
              value=""
              style={{ color: "gray" }}
            />
            {genres.map((genre) => (
              <Picker.Item key={genre.id} label={genre.name} value={genre.id} />
            ))}
          </Picker>
        </View>
        {errors.genreId && <Text style={styles.error}>{errors.genreId}</Text>}

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Fields filled: {filledFields}/{Object.keys(toonData).length}
          </Text>
          <View
            style={[
              styles.progressBar,
              {
                width: `${
                  (filledFields / Object.keys(toonData).length) * 100
                }%`,
              },
            ]}
          />
        </View>

        <CustomButton
          title="Update Toon"
          onPress={onSubmit}
          IconLeft={() =>
            isLoading && <ActivityIndicator color={"gray"} className="mr-2" />
          }
          className={`${isLoading && "bg-gray-300 text-black"}`}
          disabled={isLoading}
        />

        {/* Episode Creation Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Create New Episode</Text>
          <InputField
            label="Episode Title"
            placeholder="Episode Title"
            value={episodeTitle}
            errors={errors.episodeTitle}
            onChangeText={handleEpisodeTitleChange}
          />
          <CustomButton
            title="Create Episode"
            onPress={onCreateEpisode}
            IconLeft={() =>
              isLoading && <ActivityIndicator color={"gray"} className="mr-2" />
            }
            className={`${isLoading && "bg-gray-300 text-black"}`}
            disabled={isLoading}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    backgroundColor: "#e0f7e9",
  },
  input: {
    borderWidth: 1,
    borderColor: "#9ae5d4",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f1fcf8",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  error: {
    color: "red",
  },
  progressContainer: {
    marginVertical: 20,
  },
  progressText: {
    fontSize: 16,
    color: "#264653",
  },
  progressBar: {
    height: 10,
    backgroundColor: "#2a9d8f",
    borderRadius: 5,
  },
  sectionContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "#d8f3dc",
    borderRadius: 8,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2a9d8f",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Fallback color for empty container
    marginVertical: 10,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Ensures the image covers the container while maintaining aspect ratio
  },
});
