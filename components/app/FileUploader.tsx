import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import { axios } from "@/lib/axiosClient";

const FileUploader = () => {
  const [image, setImage] = useState<string | null>(null);
  const [info, setInfo] = useState<ImagePicker.ImagePickerResult>();
  const [doc, setDoc] = useState<DocumentPicker.DocumentPickerAsset>();

  //   const pickDocument = async () => {
  //     let result = await DocumentPicker.getDocumentAsync({
  //       type: "*/*",
  //       copyToCacheDirectory: true,
  //     }).then((response) => {
  //       if (response.type == "success") {
  //         let { name, size, uri } = response;

  //         / ------------------------/;
  //         if (Platform.OS === "android" && uri[0] === "/") {
  //           uri = `file://${uri}`;
  //           uri = uri.replace(/%/g, "%25");
  //         }
  //         / ------------------------/;

  //         let nameParts = name.split(".");
  //         let fileType = nameParts[nameParts.length - 1];
  //         var fileToUpload = {
  //           name: name,
  //           size: size,
  //           uri: uri,
  //           type: "application/" + fileType,
  //         };
  //         console.log(fileToUpload, "...............file");
  //         setDoc(fileToUpload);
  //       }
  //     });
  //     // console.log(result);
  //     console.log("Doc: " + doc?.uri);
  //   };

  const pickSomething = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (docRes.canceled === true) return;
      const assets = docRes.assets[0];
      if (!assets) return;

      const fileUri = assets.uri;
      // Fetch the file as a blob
      const response = await fetch(fileUri);
      const blob = await response.blob();

      // Create a new FormData object
      const formData = new FormData();
      formData.append("document", blob, assets.name); // Pass the file name here

      // Perform the upload
      await axios
        .post(`/user/upload-image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Custom-Header": "document",
          },
        })
        .then(({ data }) => {
          console.log("File uploaded successfully:", data);
        })
        .catch((error) => {
          console.error("Upload error:", error);
        });
    } catch (error) {
      console.log("Error while selecting file: ", error);
    }
  };

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
      {/* <Button title="Pick a file" onPress={pickDocument} /> */}
      <Text></Text>
      <Button title="Pick a something" onPress={pickSomething} />
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
