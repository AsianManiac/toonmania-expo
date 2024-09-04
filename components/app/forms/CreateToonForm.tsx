import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { z } from "zod";
import { router } from "expo-router";
import { API } from "@/constants";
import CustomButton from "../CustomButton";
import { axios } from "@/lib/axiosClient";
import Loader from "../Loader";
import InputField from "../InputField";
import { Image } from "expo-image";
import { Entypo } from "@expo/vector-icons";

// Zod schema for validation
const toonSchema = z.object({
  title: z
    .string()
    .min(1, "Toon title is required")
    .max(50, "Title is too long"),
  authorId: z.string().min(1, "Author is required"),
});

type ToonFormData = z.infer<typeof toonSchema>;

export interface Author {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
}

export default function CreateToonForm() {
  const [formData, setFormData] = useState<ToonFormData>({
    title: "",
    authorId: "",
  });
  const [authors, setAuthors] = useState<Author[]>([]);
  const [toons, setToons] = useState<any[]>([]);
  const [errors, setErrors] = useState<Partial<ToonFormData>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch authors to populate the picker
    const fetchAuthors = async () => {
      try {
        await axios
          .get(`/author`)
          .then(({ data }) => {
            setAuthors(data.results);
          })
          .catch(({ response }) => {
            console.log(response.data.message);
          });
        await axios
          .get(`/toon`)
          .then(({ data }) => {
            console.log(data);
            setToons(data.results);
          })
          .catch(({ response }) => {
            console.log(response.data.message);
          });
      } catch (error: any) {
        console.error(error.response.data.message);
      }
    };

    fetchAuthors();
  }, []);

  const handleChange = (name: keyof ToonFormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    const validation = toonSchema.safeParse(formData);
    if (!validation.success) {
      // If validation fails, set the errors
      const newErrors: Partial<ToonFormData> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as keyof ToonFormData] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      setIsLoading(true);
      await axios
        .post("/toon/create-toon", formData)
        .then(({ data }) => {
          setIsLoading(false);
          router.push(`/(root)/(create-toon)/${data.results.id}`);
        })
        .catch(({ response }) => {
          setIsLoading(false);
          console.log(response.data.message);
        });
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View
      className={"p-4 flex-row items-center bg-white mb-4 rounded-lg shadow"}
    >
      <Image
        source={{ uri: item.coverImage }}
        className={"w-16 h-16 rounded-lg"}
      />
      <View className={"flex-1 ml-4"}>
        <Text className={"text-lg font-bold"}>{item.title}</Text>
        <Text className={"text-gray-600"}>{item.description}</Text>
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
    </View>
  );

  return (
    <View style={styles.container}>
      <View className="flex flex-col space-y-3">
        <InputField
          label="API URL"
          placeholder="Toon Title"
          value={formData.title}
          errors={errors.title}
          onChangeText={(value) => handleChange("title", value)}
        />
        <Text className="text-base font-JakartaSemiBold -mb-1.5">Author</Text>
        <View className="bg-neutral-100 h-[50px] rounded-md border border-neutral-100 focus:border-primary-500">
          <Picker
            selectedValue={formData.authorId}
            style={[styles.picker, { borderColor: "gray", borderWidth: 1 }]} // add border styles to the picker
            onValueChange={(value: string) => handleChange("authorId", value)}
          >
            <Picker.Item
              label="Select Author"
              value=""
              enabled={false}
              style={{ fontSize: 18, fontWeight: "300", color: "gray" }} // style the label item
            />
            {authors.map((author, index) => (
              <Picker.Item
                key={author.id}
                style={styles.item}
                label={`${index + 1})${" "} ${author.name}`}
                value={author.id}
              />
            ))}
          </Picker>
        </View>
        {errors.authorId && <Text style={styles.error}>{errors.authorId}</Text>}
        <View>
          <CustomButton
            title="Create Toon"
            IconLeft={() =>
              isLoading && <ActivityIndicator color={"gray"} className="mr-2" />
            }
            className={`${isLoading && "bg-gray-300 text-black"}`}
            disabled={isLoading}
            onPress={onSubmit}
          />
        </View>

        <View className="flex-1">
          <Text className="text-2xl font-bold p-4">My Toons</Text>
          <FlatList
            data={toons}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 4 }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  picker: {
    width: "100%",
    height: 50,
    fontSize: 18,
    fontWeight: "bold",
  },
  item: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
