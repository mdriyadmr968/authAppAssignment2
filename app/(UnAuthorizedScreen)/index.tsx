import React, { FC } from 'react';
import { Image, ImageBackground, Text, View, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import SliderComponent from '../components/slidersComponent';

const AuthLanding: FC = () => {

  return (
    <View className="flex-1">
      <SliderComponent />
    </View>
  );
};

export default AuthLanding;
