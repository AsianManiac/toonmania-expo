import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { z } from "zod";

import CustomButton from "@/components/app/CustomButton";
import InputField from "@/components/app/InputField";
import { API, icons, images } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { logInSchema } from "@/lib/schema";
import { UserAccount } from "@/types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const SignIn = () => {
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserAccount, string>>
  >({});
  const { token, setToken } = useAuth();
  const [message, setMessage] = useState("");
  const [data, setData] = useState<Partial<UserAccount>>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      router.replace("/(root)/(tabs)/profile");
    }
  }, [token, router]);

  const signIn = async () => {
    setErrors({});
    try {
      logInSchema.parse(data);
      console.log(data);
      await axios
        .post(`${API}/api/user/login`, data)
        .then(async (response) => {
          console.log(response.data);
          const token = response.data.token;
          console.log("Received Token:", token); // Log the received token
          await AsyncStorage.setItem("toonToken", token); // Save token to AsyncStorage
          const storedToken = await AsyncStorage.getItem("toonToken");
          console.log("Stored Token:", storedToken); // Log the stored token to verify
          setToken(storedToken!); // Update the token in the context
          const iteSher = setToken(storedToken!); // Update the token in the context
          console.log("Token has been set in state", iteSher!);
          setMessage(response.data.message);
          // Here you can directly access the token from the context if needed
        })
        .catch((error) => {
          console.log("LOGIN_ERROR", error);
        });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof UserAccount, any>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof UserAccount] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-bold absolute bottom-5 left-5">
            Log in to your account
          </Text>
        </View>
        <View className="p-5">
          {message && (
            <Text className="text-green-500 font-semibold text-lg">
              {message}
            </Text>
          )}
          <InputField
            label="Email"
            icon={icons.email}
            placeholder="Email address"
            errors={errors.email}
            onChangeText={(value) => setData({ ...data, email: value })}
          />
          <InputField
            label="Password"
            icon={icons.lock}
            placeholder="••••••••"
            errors={errors.password}
            secureTextEntry={true}
            onChangeText={(value) => setData({ ...data, password: value })}
          />
          <CustomButton title="Sign in" className="mt-10" onPress={signIn} />

          <Link
            href={"/sign-up"}
            className="text-lg text-center text-gray-700 mt-6"
          >
            <Text>Don't yet have an acoount? </Text>
            <Text className="text-blue-500">Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
