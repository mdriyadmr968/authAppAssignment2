import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useDispatch } from "react-redux";
import { appActions } from "../store/app-slice";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useWarmUpBrowser();

  // Initialize OAuth strategies for each provider
  const googleOAuth = useOAuth({ strategy: "oauth_google" });
  const facebookOAuth = useOAuth({ strategy: "oauth_facebook" });
  const appleOAuth = useOAuth({ strategy: "oauth_apple" });

  const handleOAuth = async (strategy) => {
    // const redirectUrl = Linking.createURL("/(UnAuthorizedScreen)/Welcome", {
    //   scheme: "authapp",
    // });
    try {
      // const { createdSessionId, setActive } = await strategy.startOAuthFlow({
      //   redirectUrl,
      // });
      const { createdSessionId, setActive } = await strategy.startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
         router.push("/Welcome");
      } else {
        console.log("OAuth failed to create session");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Email and Password are required.");
      return;
    }

    const body = {
      email,
      password,
    };

    setLoading(true);

    try {
      const response = await axios.post(
        "https://sowlab.com/assignment/user/login",
        body
      );
      if (response.status === 200) {
        dispatch(appActions.updateUsersDetails(response.data));
        dispatch(appActions.updateLoginUsingEmailPass(true));
        router.push("/Welcome");
        Alert.alert("Login Successful", "Welcome back!");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          error.response.data.message || "Login failed. Please try again."
        );
      } else {
        setErrorMessage("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-lg mb-20">FarmerEats</Text>
      <Text className="font-bold text-3xl mb-10">Welcome back!</Text>
      <Text className="text-sm text-gray-400 mb-14">
        New here?{" "}
        <Text
          onPress={() => router.push("/SignupScreen")}
          className="text-[#e9663b]"
        >
          Create account
        </Text>
      </Text>

      <View className="w-full space-y-4">
        <View className="flex-row items-center border bg-[#EEEDEC] border-[#EEEDEC] rounded-lg p-3">
          <Image source={require("../assets/attheratesmall.png")} />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            className="flex-1 ml-2 border-0 bg-[#EEEDEC]"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="flex-row items-center border bg-[#EEEDEC] border-[#EEEDEC] rounded-lg p-3">
          <Image source={require("../assets/lock.png")} />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            className="flex-1 ml-2 border-0 bg-[#EEEDEC]"
            secureTextEntry
          />
          <TouchableOpacity onPress={() => router.push("/ForgotPassword")}>
            <Text className="text-[#e9663b] ml-2">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {errorMessage ? (
          <Text className="text-red-500 text-center mb-4">{errorMessage}</Text>
        ) : null}
      </View>

      <TouchableOpacity
        className="w-full bg-[#e9663b] rounded-full py-3 my-10 flex-row justify-center items-center"
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" className="mr-2" />
        ) : (
          <Text className="text-white text-center font-bold text-lg">
            Login
          </Text>
        )}
      </TouchableOpacity>
      {/* <TouchableOpacity
        className="w-full bg-[#e9663b] rounded-full py-3 my-10 flex-row justify-center items-center"
        onPress={() => router.push("/Welcome")}
        disabled={loading}
      >
        <Text>Go to welcome screen</Text>
      </TouchableOpacity> */}

      <Text className="text-gray-400 mb-10 text-center text-sm">
        Or login with
      </Text>

      <View className="w-full flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => handleOAuth(googleOAuth)}
          className="px-8 py-3 border border-gray-400 rounded-full"
        >
          <Image
            source={require("../assets/google.png")}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleOAuth(
              appleOAuth
            )
          }
          className="px-8 py-3 border border-gray-400 rounded-full"
        >
          <Image
            source={require("../assets/apple.png")}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleOAuth(
              facebookOAuth
            )
          }
          className="px-8 py-3 border border-gray-400 rounded-full"
        >
          <Image
            source={require("../assets/facebook.png")}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
