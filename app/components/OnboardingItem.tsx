import React, { FC } from "react";
import {
  Image,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SliderComponent from "../components/slidersComponent";
import { router } from "expo-router";
import FluidIndicator from "./FluidIndicator";

const OnboardingItem: FC = ({item}) => {
  
  return (
    <View style={{ flex: 1, backgroundColor: item.bgcolor }}>
      <Image source={item?.imageurl} className="h-50 w-[100vw] object-cover" />
      <View className="bg-white rounded-tl-[60px] rounded-tr-[60px] flex-1 w-full mt-5">
        <View className="flex flex-col justify-between py-10 items-center w-[70vw] h-full mx-auto flex-wrap">
          <Text className="text-2xl font-bold">{item?.name}</Text>
          <Text className="text-center w-full">{item?.description}</Text>
          <FluidIndicator currentIndex={item?.id} totalItems={3} />
          <TouchableOpacity>
            {/* <TouchableOpacity> */}
            <Text
              onPress={() => {
                router.push("/LoginScreen");
              }}
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: 15,
                backgroundColor: item.bgcolor,
              }}
              className="py-5 px-10 rounded-full"
            >
              Join the movement
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("/LoginScreen");
            }}
          >
            {/* <TouchableOpacity> */}
            <Text
              className="underline"
              style={{
                fontWeight: "500",
                fontSize: 15,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnboardingItem;
