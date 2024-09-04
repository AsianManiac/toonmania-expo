import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { z } from "zod";
import { useRoute } from "@react-navigation/native";
import CreateToonForm from "@/components/app/forms/CreateToonForm";

const CreateToon = () => {
  return (
    <ScrollView style={styles.container}>
      {/* <CreateGenreForm /> */}
      <CreateToonForm />
    </ScrollView>
  );
};

export default CreateToon;

const styles = StyleSheet.create({
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
});
