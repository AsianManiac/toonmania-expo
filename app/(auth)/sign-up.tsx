import CustomButton from "@/components/app/CustomButton";
import InputField from "@/components/app/InputField";
import OAuth from "@/components/app/OAuth";
import { icons, images } from "@/constants";
import { userSchema } from "@/lib/schema";
import { UserAccount, VerificationError } from "@/types/type";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { z } from "zod";

const SignUp = () => {
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserAccount, string>>
  >({});
  const [showSuccessModal, setshowSuccessModal] = useState<boolean>(false);
  const [verification, setVerification] = useState<VerificationError>({
    state: "default",
    error: "",
    code: "",
  });
  const [data, setData] = useState<UserAccount>({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const verifyAccount = async () => {
    if (verification.code !== "123456") {
      setVerification({
        ...verification,
        error: "Verification failed.",
        state: "failed",
      });
      return Alert.alert("Code is incorrect. Please try again!");
    }
    try {
      // setVerification({ ...verification, code: verification.code });
      // Alert.alert("Verification successful");
    } catch (error) {
      console.log(error);
      setVerification({
        ...verification,
        error: "Verification failed.",
        state: "failed",
      });
    }
  };

  const signUp = async () => {
    try {
      userSchema.parse(data); // Validate the data
      setErrors({});
      setVerification({ ...verification, state: "pending" });
      // router.push("/(root)/genre");
    } catch (error) {
      console.log(error);
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof UserAccount, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof UserAccount] = err.message;
          }
        });
        setErrors(fieldErrors); // Set client-side errors
      }
    }
  };
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-bold absolute bottom-5 left-5">
            Create Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            icon={icons.person}
            placeholder="Enter your name"
            errors={errors.name}
            onChangeText={(value) => setData({ ...data, name: value })}
          />
          <InputField
            label="Email"
            icon={icons.email}
            placeholder="Email address"
            errors={errors.email}
            onChangeText={(value) => setData({ ...data, email: value })}
          />
          <InputField
            label="Phone Number"
            icon={icons.to}
            placeholder="Enter phone number"
            errors={errors.phoneNumber}
            onChangeText={(value) => setData({ ...data, phoneNumber: value })}
          />
          <InputField
            label="Password"
            icon={icons.lock}
            placeholder="••••••••"
            errors={errors.password}
            secureTextEntry={true}
            onChangeText={(value) => setData({ ...data, password: value })}
          />
          <InputField
            label="Confirm Password"
            icon={icons.lock}
            placeholder="••••••••"
            secureTextEntry={true}
            errors={errors.confirmPassword}
            onChangeText={(value) =>
              setData({ ...data, confirmPassword: value })
            }
          />
          <CustomButton title="Sign Up" className="mt-10" onPress={signUp} />

          <OAuth />
          <Link
            href={"/sign-in"}
            className="text-lg text-center text-gray-700 mt-6"
          >
            <Text>Already have an acoount? </Text>
            <Text className="text-blue-500">Sign In</Text>
          </Link>
        </View>

        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") setshowSuccessModal(true);
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl mb-2 font-bold text-center">
              Verification
            </Text>
            <Text className="mb-5 text-center">
              Check {data.email} for verification code.
            </Text>

            <InputField
              label="Code"
              icon={icons.lock}
              placeholder="424242"
              value={verification.code}
              keyboardType="numeric"
              errors={verification.error}
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />

            <CustomButton
              title="Verify Account"
              onPress={verifyAccount}
              className="mt-5 bg-green-600"
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-bold text-center">
              Verification success!😀
            </Text>
            <Text className="text-lg font-semibold text-gray-700 text-center">
              You have successfully verified your account.
            </Text>
            <CustomButton
              title="Continue"
              onPress={() => router.replace("/(root)/(tabs)/home")}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
