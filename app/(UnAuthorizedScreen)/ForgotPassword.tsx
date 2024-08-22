import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";

const ForgotPassword: React.FC = () => {
   const [otp, setOtp] = useState(["", "", "", "", ""]);
   const [otpFromApi, setOtpFromApi] = useState(null);
  const [currentComponent, setCurrentComponent] = useState(1);
  const inputRefs = useRef<Array<TextInput | null>>([]);
    const [errorMessage, setErrorMessage] = useState("");



  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text.replace(/[^0-9]/g, ""); // Allow only numbers
    setOtp(newOtp);

    // Automatically focus next input
    if (text.length === 1 && index < 4) {
      inputRefs.current[index + 1]?.focus(); // Focus the next input if not the last one
    } else if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Focus the previous input if cleared
    }
  };

  const handleOtpSubmit = () => {
    const submittedOtp = otp.join("");
    console.log("Submitted OTP: ", submittedOtp);
      setCurrentComponent(3);

    // if (submittedOtp === otpFromApi) {
    //   // If OTP is correct
    //   setErrorMessage(""); 
    //   setCurrentComponent(3);
    // } else {
    //   // If OTP is incorrect
    //   setErrorMessage("Incorrect OTP. Please try again.");
    // }
  };
  const handleResetPasswordSubmit = () => {
   
  };


  return (
    <View className="flex-1 p-4 bg-white">
      {/* Title */}
      <Text className="text-lg mb-20">FarmerEats</Text>
      {currentComponent === 1 && (
        <View>
          <Text className="font-bold text-3xl mb-10">Forgot Password?</Text>
          <Text className="text-sm text-gray-400 mb-14">
            Remember your password?{" "}
            <Text
              onPress={() => {
                router.push("/LoginScreen");
              }}
              className="text-[#D5715B]"
            >
              Login
            </Text>
          </Text>
          <View className="w-full space-y-4">
            {/* Phone number Input Field */}
            <View className="flex-row items-center border bg-[#EEEDEC] border-[#EEEDEC] rounded-lg p-3">
              <Image source={require("../assets/phone.png")} />
              <TextInput
                placeholder="Phone Number"
                className="flex-1 ml-2 border-0 bg-[#EEEDEC]"
                keyboardType="numeric"
                autoCapitalize="none"
              />
            </View>
          </View>

          <TouchableOpacity
            className="w-full bg-[#D5715B] rounded-full py-3 my-10"
            onPress={() => {
              setCurrentComponent(2);
            }}
          >
            <Text className="text-white text-center font-bold text-lg">
              Send code
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {currentComponent === 2 && (
        <View>
          <Text className="font-bold text-3xl mb-10">Verify OTP</Text>
          <Text className="text-sm text-gray-400 mb-14">
            Remember your password?{" "}
            <Text
              onPress={() => {
                router.push("/LoginScreen");
              }}
              className="text-[#D5715B]"
            >
              Login
            </Text>
          </Text>
          <View className="w-full space-y-4">
            {/* 5 rectengular otp input field */}
            <View className="w-full flex-row justify-between">
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)} // Store ref
                  style={styles.otpInput}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  keyboardType="numeric"
                  maxLength={1} // Restricts input to 1 character
                  className="bg-gray-100"
                />
              ))}
            </View>
          </View>
          {/* Error message */}
          {errorMessage ? (
            <Text className="text-red-500 mt-2">{errorMessage}</Text>
          ) : null}

          {/* submit Button */}
          <TouchableOpacity
            className="w-full bg-[#D5715B] rounded-full py-3 my-10"
            onPress={handleOtpSubmit}
          >
            <Text className="text-white text-center font-bold text-lg">
              Submit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          // onPress={() => {
          //   router.push("/LoginScreen");
          // }}
          >
            {/* <TouchableOpacity> */}
            <Text
              className="underline text-center"
              style={{
                fontWeight: "500",
                fontSize: 15,
              }}
            >
              Resend Code
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {currentComponent === 3 && (
        <View>
          <Text className="font-bold text-3xl mb-10">Reset Password</Text>
          <Text className="text-sm text-gray-400 mb-14">
            Remember your password?{" "}
            <Text
              onPress={() => {
                router.push("/LoginScreen");
              }}
              className="text-[#D5715B]"
            >
              Login
            </Text>
          </Text>
          <View className="w-full space-y-4">
            {/* New Password Input Field */}
            <View className="flex-row items-center border bg-[#EEEDEC] border-[#EEEDEC] rounded-lg p-3">
              <Image source={require("../assets/lock.png")} />
              <TextInput
                placeholder="New Password"
                className="flex-1 ml-2 border-0 bg-[#EEEDEC]"
                secureTextEntry
              />
            </View>
            {/* Confirm Password Input Field */}
            <View className="flex-row items-center border bg-[#EEEDEC] border-[#EEEDEC] rounded-lg p-3">
              <Image source={require("../assets/lock.png")} />
              <TextInput
                placeholder="Confirm New Password"
                className="flex-1 ml-2 border-0 bg-[#EEEDEC]"
                secureTextEntry
              />
            </View>
          </View>

          {/* submit Button */}
          <TouchableOpacity
            className="w-full bg-[#D5715B] rounded-full py-3 my-10"
            onPress={handleResetPasswordSubmit}
          >
            <Text className="text-white text-center font-bold text-lg">
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  otpInput: {
    width: "15%",
    height: 50,
    borderWidth: 1,
    borderColor: "#D5715B",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 24,
  },
});

export default ForgotPassword;
