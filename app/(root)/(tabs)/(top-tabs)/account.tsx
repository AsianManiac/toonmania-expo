import { Image } from "expo-image";
import React, { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import { API, icons } from "@/constants";
import InputField from "@/components/app/InputField";
import CustomButton from "@/components/app/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Account = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [fileType, setFileType] = useState<"image" | "video">("image");
  const [form, setForm] = useState({
    name: "Tay JunJo",
    email: "junjotay@gmail.com",
    phone: "+237672419419",
  });
  const [api, setApi] = useState({
    url: "",
  });

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    if (!(await result.canceled)) {
      setFileType(result?.assets![0].type!);
      setSelectedFile(result?.assets![0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const updateProfile = async () => {
    const data = form;
    console.log("FORM_UPDATE", data);
  };

  const setAPIURL = async () => {
    try {
      // await AsyncStorage.removeItem("apiURL");
      await AsyncStorage.setItem("apiURL", api.url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 22,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false} className="py-5">
        <View style={{ alignItems: "center", marginVertical: 5 }}>
          <TouchableOpacity onPress={pickImageAsync}>
            <Image
              source={{ uri: selectedFile }}
              style={{
                height: 170,
                width: 170,
                borderRadius: 85,
                borderWidth: 2,
                borderColor: "green",
              }}
            />

            <View
              style={{ position: "absolute", bottom: 0, right: 10, zIndex: 20 }}
            >
              <MaterialIcons name="photo-camera" size={32} color={"green"} />
            </View>
          </TouchableOpacity>
        </View>
        {fileType === "video" && (
          <Video
            source={{ uri: selectedFile }}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            isLooping={false}
            className="w-full h-[250px] rounded-md"
          />
        )}
        <View>
          <InputField
            label="API URL"
            icon={icons.profile}
            placeholder="https://"
            value={api.url}
            onChangeText={(value) => setApi({ ...api, url: value })}
          />
          <InputField
            label="Name"
            icon={icons.profile}
            placeholder="User name"
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />

          <InputField
            label="Email"
            icon={icons.email}
            value={form.email}
            placeholder="Email address"
            onChangeText={(value) => setForm({ ...form, email: value })}
          />

          <InputField
            label="Password"
            icon={icons.lock}
            value={form.phone}
            placeholder="+237 670 000 000"
            onChangeText={(value) => setForm({ ...form, phone: value })}
          />

          {/* <DatePicker mode="datetime" minimumDate={} /> */}
          <CustomButton
            onPress={updateProfile}
            title="Update"
            className="bg-green-700 mt-5"
          />
        </View>

        <CustomButton
          onPress={setAPIURL}
          title="SET API"
          className="bg-green-700 mt-5"
        />
      </ScrollView>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  formInput: {
    height: 44,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 6,
    justifyContent: "center",
    paddingLeft: 8,
  },
});
