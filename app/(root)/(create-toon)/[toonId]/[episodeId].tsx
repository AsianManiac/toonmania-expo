import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Switch,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UpdateEpisode() {
  const [episodeData, setEpisodeData] = useState({});
  const [formState, setFormState] = useState({
    description: "",
    episodeNumber: "",
    episodeUrl: "",
    datePublished: "",
    isPublished: false,
    isFree: false,
    imageUrl: "",
    orderIndex: "",
  });
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const route = useRoute();
  const { episodeId } = route.params as { episodeId: string };

  useEffect(() => {
    axios
      .get(`https://your-api-url.com/episodes/${episodeId}`)
      .then((response) => {
        const data = response.data;
        setEpisodeData(data);
        setFormState({
          description: data.description || "",
          episodeNumber: data.episodeNumber || "",
          episodeUrl: data.episodeUrl || "",
          datePublished: data.datePublished
            ? new Date(data.datePublished).toISOString().split("T")[0]
            : "",
          isPublished: data.isPublished || false,
          isFree: data.isFree || false,
          imageUrl: data.imageUrl || "",
          orderIndex: data.orderIndex ? data.orderIndex.toString() : "",
        });
      })
      .catch((error) => {
        console.error("Failed to fetch episode data:", error);
      });
  }, [episodeId]);

  // @ts-ignore
  const handleChange = (name, value) => {
    setFormState({ ...formState, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formState.episodeNumber)
      newErrors.episodeNumber = "Episode Number is required.";
    if (!formState.episodeUrl)
      newErrors.episodeUrl = "Episode URL is required.";
    if (!formState.imageUrl) newErrors.imageUrl = "Image URL is required.";
    if (!formState.datePublished)
      newErrors.datePublished = "Date Published is required.";
    if (!formState.orderIndex)
      newErrors.orderIndex = "Order Index is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const response = await axios.put(
        `https://your-api-url.com/episodes/${episodeId}`,
        formState
      );
      console.log("Episode updated successfully:", response.data);
    } catch (error) {
      console.error("Failed to update episode:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Update Episode</Text>

        <TextInput
          placeholder="Description"
          style={styles.input}
          value={formState.description}
          onChangeText={(text) => handleChange("description", text)}
        />
        {errors.description && (
          <Text style={styles.error}>{errors.description}</Text>
        )}

        <TextInput
          placeholder="Episode Number"
          style={styles.input}
          value={formState.episodeNumber}
          onChangeText={(text) => handleChange("episodeNumber", text)}
        />
        {errors.episodeNumber && (
          <Text style={styles.error}>{errors.episodeNumber}</Text>
        )}

        <TextInput
          placeholder="Episode URL"
          style={styles.input}
          value={formState.episodeUrl}
          onChangeText={(text) => handleChange("episodeUrl", text)}
        />
        {errors.episodeUrl && (
          <Text style={styles.error}>{errors.episodeUrl}</Text>
        )}

        <TextInput
          placeholder="Image URL"
          style={styles.input}
          value={formState.imageUrl}
          onChangeText={(text) => handleChange("imageUrl", text)}
        />
        {errors.imageUrl && <Text style={styles.error}>{errors.imageUrl}</Text>}

        <TextInput
          placeholder="Order Index"
          style={styles.input}
          value={formState.orderIndex}
          onChangeText={(text) => handleChange("orderIndex", text)}
          keyboardType="numeric"
        />
        {errors.orderIndex && (
          <Text style={styles.error}>{errors.orderIndex}</Text>
        )}

        <View style={styles.switchContainer}>
          <Text>Is Published</Text>
          <Switch
            value={formState.isPublished}
            onValueChange={(value) => handleChange("isPublished", value)}
          />
        </View>

        <View style={styles.switchContainer}>
          <Text>Is Free</Text>
          <Switch
            value={formState.isFree}
            onValueChange={(value) => handleChange("isFree", value)}
          />
        </View>

        <TextInput
          placeholder="Date Published"
          style={styles.input}
          value={formState.datePublished}
          onChangeText={(text) => handleChange("datePublished", text)}
        />
        {errors.datePublished && (
          <Text style={styles.error}>{errors.datePublished}</Text>
        )}

        <Button
          title={isSubmitting ? "Updating..." : "Update Episode"}
          onPress={onSubmit}
          disabled={isSubmitting}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   padding: 20,
  //   backgroundColor: "#f5f5dc", // Cream whitish color
  // },
  container: {
    padding: 20,
    backgroundColor: "#e0f7e9",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2a9d8f",
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
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});
