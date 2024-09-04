import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const FileUploader = () => {
  const [image, setImage] = useState<string | null>(null);
  const [info, setInfo] = useState<ImagePicker.ImagePickerResult>();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      //   allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // await uploadFile(result, "avatar");

    console.log(result);
    setInfo(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View>
      <Text>FileUploader</Text>
      <Text></Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {/* {image && <Text className="font-bold">{JSON.stringify(info)}</Text>} */}
    </View>
  );
};

export default FileUploader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
