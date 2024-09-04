import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Alert, Button, View } from "react-native";

import Recorder from "@/components/app/Recorder";
import SearchInput from "@/components/app/SearchInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import FileUploader from "@/components/app/FileUploader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputField from "@/components/app/InputField";
import CustomButton from "@/components/app/CustomButton";

export default function Profile() {
  const [apiUrl, setApiUrl] = useState<string>("");
  const [sound, setSound] = useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/Any Man of Mine.mp3")
    );
    // @ts-ignore
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          // @ts-ignore
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const saveApiUrl = async () => {
    try {
      await AsyncStorage.setItem("apiUrl", apiUrl);
      Alert.alert("API URL Saved");
    } catch (error: any) {
      console.log("Failed to save api URL", error.response.message);
    }
  };
  return (
    <SafeAreaView className="flex-1 items-center justify-center px-3">
      <View className="flex flex-col space-y-2 w-full">
        <View>
          <Button title="Play Sound" onPress={playSound} />
        </View>
        <View>
          <Recorder />
        </View>
        <View>
          <Button
            title="Create Toon"
            onPress={() => router.push("/(create-toon)/create")}
          />
        </View>
        <View>
          {/* <FileUploader /> */}
          <InputField
            label="Enter API URL"
            onChangeText={setApiUrl}
            placeholder="https://www."
            className="border-primary"
          />
          <CustomButton title="Save API URL" onPress={saveApiUrl} />
        </View>
      </View>
    </SafeAreaView>
  );
}
