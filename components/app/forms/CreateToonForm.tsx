import { blurhash } from "@/constants";
import { axios } from "@/lib/axiosClient";
import { Entypo } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";
import CustomButton from "../CustomButton";
import InputField from "../InputField";
import Loader from "../Loader";

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
  const [errors, setErrors] = useState<Partial<ToonFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
      setIsSubmitting(true);
      await axios
        .post("/toon/create-toon", formData)
        .then(({ data }) => {
          setIsSubmitting(false);
          router.push(`/(root)/(create-toon)/${data.results.id}`);
        })
        .catch(({ response }) => {
          setIsSubmitting(false);
          console.log(response.data.message);
        });
    } catch (error: any) {
      console.error(error.response);
    }
  };

  return (
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
            isSubmitting && (
              <ActivityIndicator color={"gray"} className="mr-2" />
            )
          }
          className={`${isSubmitting && "bg-gray-300 text-black"}`}
          disabled={isSubmitting}
          onPress={onSubmit}
        />
      </View>

      <Text className="text-2xl font-bold py-4">My Toons</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
