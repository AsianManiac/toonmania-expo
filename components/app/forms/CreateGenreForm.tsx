import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import axios from "axios";
import { z } from "zod";

// Zod schema for validation
const genreSchema = z.object({
  name: z
    .string()
    .min(1, "Genre name is required")
    .max(100, "Name is too long"),
  slug: z.string().min(1, "Slug is required").max(100, "Slug is too long"),
});

type GenreFormData = z.infer<typeof genreSchema>;

export default function CreateGenreForm() {
  const [formData, setFormData] = useState<GenreFormData>({
    name: "",
    slug: "",
  });
  const [errors, setErrors] = useState<Partial<GenreFormData>>({});

  const handleChange = (name: keyof GenreFormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    // Validate the form data using zod
    const validation = genreSchema.safeParse(formData);

    if (!validation.success) {
      // If validation fails, set the errors
      const newErrors: Partial<GenreFormData> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as keyof GenreFormData] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    // If validation succeeds, clear any previous errors
    setErrors({});

    try {
      const response = await axios.post(
        "https://your-api-url.com/genres",
        formData
      );
      console.log("Genre created successfully:", response.data);
      // handle success (e.g., show a success message, navigate away, etc.)
    } catch (error) {
      console.error("Failed to create genre:", error);
      // handle error (e.g., show an error message)
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Genre Name"
        style={styles.input}
        value={formData.name}
        onChangeText={(value) => handleChange("name", value)}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      <TextInput
        placeholder="Slug"
        style={styles.input}
        value={formData.slug}
        onChangeText={(value) => handleChange("slug", value)}
      />
      {errors.slug && <Text style={styles.error}>{errors.slug}</Text>}

      <Button title="Create Genre" onPress={onSubmit} />
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
});
