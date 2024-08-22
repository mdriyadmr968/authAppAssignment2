import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { useUser, useAuth } from "@clerk/clerk-expo";

const Welcome: React.FC = () => {
  const appCtx = useSelector((state) => state.app);
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      Alert.alert("Logout Successful", "You have been logged out.");
      // Optionally navigate to the login screen
      router.push("/LoginScreen");
    } catch (error) {
      console.error("Logout error", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <View className="flex-1 p-4 bg-white">
      {/* Title */}
      <Text className="text-lg mb-20">FarmerEats</Text>
      {isLoaded ? (
        user ? (
          <View>
            <Text>
              Hello {user?.emailAddresses[0].emailAddress} Welcome Home!
            </Text>
            <TouchableOpacity
              className="w-full bg-[#e9663b] rounded-full py-3 my-10 flex-row justify-center items-center"
              onPress={() => handleLogout()}
            >
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : appCtx?.isLoggedinUsingEmailPass ? (
          <View>
            <Text className="font-bold text-3xl mb-10">
              Hello {appCtx?.userDetails?.full_name} Welcome Home!
            </Text>
            <TouchableOpacity
              className="w-full bg-[#e9663b] rounded-full py-3 my-10 flex-row justify-center items-center"
              onPress={() => {
                router.push("/LoginScreen");
              }}
            >
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : null
      ) : (
        // Loader shown while user data is loading
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#6fc276" />
          <Text className="mt-4">Loading user info...</Text>
        </View>
      )}
    </View>
  );
};

export default Welcome;
