import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";

const Verification: React.FC = ({ fileName, setFileName,fileLink, setFileLink, error }) => {
 


  const handleFilePicker = async () => {
    try {
      // Open the file picker
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Allow any file type
        copyToCacheDirectory: true, // Best practice for caching
      });

//      console.log("result from document picker", result);

      // Check if the file selection was successful
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0]; // Get the first file
        setFileName(file.name); // Set the filename from the Document Picker
        await uploadFile(file); // Upload the selected file
      } else {
        Alert.alert("File selection was cancelled.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error picking file.", "Please try again.");
    }
  };

  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || "application/octet-stream", // Default mime type if not provided
    });

    try {
      // Upload the file to File.io
      const response = await axios.post("https://file.io", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

//      console.log("response from upload api", response);

      // Set the file link from the API response
      setFileLink(response.data.link); // Use response.data.link for the shared link
    
    } catch (error) {
//      console.log("error from upload api", error);
    }
  };

  const handleRemoveFile = () => {
    // Reset the file link and name to deselect the file
    setFileLink(null);
    setFileName("");
  };

  return (
    <View className="w-full p-4">
      <View className="flex flex-row justify-between items-center mb-4">
        <Text>Attach proof of registration</Text>
        <TouchableOpacity onPress={handleFilePicker}>
          <View className="p-3 bg-[#e9663b] rounded-full">
            <Image
              source={require("../../assets/camera.png")}
              className="w-6 h-6"
            />
          </View>
        </TouchableOpacity>
      </View>

      {fileName && (
        <View className="flex flex-row items-center mb-4 bg-gray-200 p-2 rounded-lg shadow-sm">
          <Text className="flex-1 ml-2 underline">{fileName}</Text>
          <TouchableOpacity onPress={handleRemoveFile}>
            <Text className="text-2xl mr-2">x</Text>
          </TouchableOpacity>
        </View>
      )}
      {error.fileSelected && (
        <Text className="text-red-500">File is required</Text>
      )}
    </View>
  );
};

export default Verification;
