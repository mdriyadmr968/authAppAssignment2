import axios from "axios";
import BusinessHours from "../components/signup/BusinessHours";
import Verification from "../components/signup/Verification";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { current } from "@reduxjs/toolkit";

const SignupScreen: React.FC = () => {
  const [currentComponent, setCurrentComponent] = useState(1);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [firstFormCheck, setFirstFormCheck] = useState(false);
  const [secondFormCheck, setSecondFormCheck] = useState(false);
  const [thirdFormCheck, setThirdFormCheck] = useState(false);
  const [fourthFormCheck, setFourthFormCheck] = useState(false);
    const [fileName, setFileName] = useState<string>(""); 
      const [fileLink, setFileLink] = useState<string | null>(null);
  const [selectedHours, setSelectedHours] = useState<{
    [key: string]: string[];
  }>({});
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    re_password: "",
    role: "farmer",
    business_name: "",
    informal_name: "",
    address: "",
    city: "",
    state: "",
    zip_code: null,
    registration_proof: "",
    business_hours: {},
    device_token: "0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx",
    type: "email",
    social_id: "0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx",
  });
 

  const [error, setError] = useState({
    full_name: false,
    email: false,
    phone: false,
    password: false,
    re_password: false,
    role: false,
    business_name: false,
    informal_name: false,
    address: false,
    city: false,
    state: false,
    zip_code: false,
  });

  const states = [
    { id: "1", name: "Alabama" },
    { id: "2", name: "Alaska" },
    { id: "3", name: "Arizona" },
    { id: "4", name: "Arkansas" },
    { id: "5", name: "California" },
    { id: "6", name: "Colorado" },
    { id: "7", name: "Connecticut" },
    { id: "8", name: "Delaware" },
  ];
  const pageHeading = [
    { title: "Welcome!", description: "" },
    { title: "Farm Info", description: "" },
    {
      title: "Verification",
      description:
        "Attached proof of Department of Agriculture registrations i.e. Florida Fresh, USDA Approved, USDA Organic",
    },
    {
      title: "Business Hours",
      description:
        "Choose the hours your farm is open for pickups. This will allow customers to order deliveries.",
    },
  ];
  const submitButtonText = [
    "Continue",
    "Continue",
    "Continue",
    "Signup",
    "Submit",
  ];

  const handleSelect = (stateName: string) => {
    handleInputChange("state", stateName);
    setShowDropdown(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSignup = async () => {
    const {  
    full_name,
    email,
    phone,
    password,
    role,
    business_name,
    informal_name,
    address,
    city,
    state,
    zip_code,
    registration_proof,
    business_hours,
    device_token,
    type,
    social_id, } = formData;

    const body = {
      full_name,
      email,
      phone,
      password,
      role,
      business_name,
      informal_name,
      address,
      city,
      state,
      zip_code,
      registration_proof: fileLink,
      business_hours: selectedHours,
      device_token,
      type,
      social_id,
    };

    setLoading(true);
    setErrorMessage("");

    console.log("body", body);
    

    try {
      const response = await axios.post(
        "https://sowlab.com/assignment/user/register",
        body
      ); 
      if (response.status === 200) {
          setCurrentComponent(currentComponent + 1);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          error.response.data.message || "Signup failed. Please try again."
        );
      } else {
        setErrorMessage("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const validateFirstForm = () => {
    let hasError = false;
    const newErrorState = {
      full_name: !formData.full_name,
      email: !formData.email,
      phone: !formData.phone,
      password: !formData.password,
      re_password: formData.password !== formData.re_password,
    };

    Object.keys(newErrorState).forEach((key) => {
      if (newErrorState[key]) {
        hasError = true;
      }
    });

    setError(newErrorState);
    return !hasError; // Return true if no error
  };

  useEffect(() => {
    if (currentComponent === 1 && firstFormCheck === true) {
      if (validateFirstForm()) {
         setCurrentComponent(currentComponent + 1);
        
      } else {
        setFirstFormCheck(false);
      }
    }
  }, [firstFormCheck]);


  const validateSecondForm = () => {
    let hasError = false;
    const newErrorState = {
      business_name: !formData.business_name,
      informal_name: !formData.informal_name,
      address: !formData.address,
      city:!formData.city,
      state:!formData.state,
      zip_code:!formData.zip_code,
     
    };

    Object.keys(newErrorState).forEach((key) => {
      if (newErrorState[key]) {
        hasError = true;
      }
    });

    setError(newErrorState);
    return !hasError; // Return true if no error
  };


  useEffect(() => {
    if (currentComponent === 2 && secondFormCheck === true) {
      if (validateSecondForm()) {
        setCurrentComponent(currentComponent + 1);
      }else{
        setSecondFormCheck(false);
      }
    }
  }, [secondFormCheck]);

  const validateThirdForm = () => {
    let hasError = false;

    const newErrorState = {
      fileSelected: !fileName,     
     
    };

    Object.keys(newErrorState).forEach((key) => {
      if (newErrorState[key]) {
        hasError = true;
      }
    });

    setError(newErrorState);
    return !hasError; // Return true if no error
  };


  useEffect(() => {
    if (currentComponent === 3 && thirdFormCheck === true) {
      if (validateThirdForm()) {
        setCurrentComponent(currentComponent + 1);
      } else {
        setThirdFormCheck(false);
      }
    }
  }, [thirdFormCheck]);

  const validateFourthForm = () => {
    let hasError = false;

    const newErrorState = {
      timeSelected: (Object?.keys(selectedHours)?.length === 0),
    };

    Object.keys(newErrorState).forEach((key) => {
      if (newErrorState[key]) {
        hasError = true;
      }
    });

    setError(newErrorState);
    return !hasError; // Return true if no error
  };


  useEffect(() => {
    if (currentComponent === 4 && fourthFormCheck === true) {
      if (validateFourthForm()) {
        handleSignup()
      } else {
        setFourthFormCheck(false);
      }
    }
  }, [fourthFormCheck]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={"height"}
      keyboardVerticalOffset={0}
    >
      <ScrollView
        // contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >
        <View className="px-4 pt-4 bg-white">
          {currentComponent < 5 && (
            <View>
              <View className="h-[85vh] overflow-scroll">
                {/* Title */}
                <Text className="text-lg mb-10">FarmerEats</Text>
                <Text className="text-gray-400 mb-4 text-sm">
                  Signup {currentComponent} of 4
                </Text>
                <Text className="font-bold text-3xl mb-5">
                  {pageHeading[currentComponent - 1]?.title}
                </Text>
                <Text className="text-gray-400  text-sm">
                  {pageHeading[currentComponent - 1]?.description}
                </Text>

                {currentComponent === 1 && (
                  <ScrollView nestedScrollEnabled={true}>
                    <View className="w-full space-y-4">
                      <View className="w-full flex-row justify-between items-center">
                        <TouchableOpacity className="px-8 py-3 border border-gray-400 rounded-full">
                          <Image
                            source={require("../assets/google.png")}
                            className="w-6 h-6"
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity className="px-8 py-3 border border-gray-400 rounded-full">
                          <Image
                            source={require("../assets/apple.png")}
                            className="w-6 h-6"
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity className="px-8 py-3 border border-gray-400 rounded-full">
                          <Image
                            source={require("../assets/facebook.png")}
                            className="w-6 h-6"
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      </View>

                      <Text className="text-gray-400 my-2 text-center text-sm">
                        Or signup with
                      </Text>

                      <View className="flex-row items-center border bg-[#EEEDEC] border-[#EEEDEC] rounded-lg p-3">
                        <Image source={require("../assets/personsmall.png")} />
                        <TextInput
                          placeholder="Full Name"
                          className="flex-1 ml-2 border-0 bg-[#EEEDEC]"
                          value={formData.full_name}
                          onChangeText={(value) =>
                            handleInputChange("full_name", value)
                          }
                        />
                      </View>
                      {error.full_name && (
                        <Text className="text-red-500">
                          Full Name is required
                        </Text>
                      )}

                      <View className="flex-row items-center border bg-[#EEEDEC] border-[#EEEDEC] rounded-lg p-3">
                        <Image
                          source={require("../assets/attheratesmall.png")}
                        />
                        <TextInput
                          placeholder="Email Address"
                          className="flex-1 ml-2 border-0 bg-[#EEEDEC]"
                          value={formData.email}
                          onChangeText={(value) =>
                            handleInputChange("email", value)
                          }
                        />
                      </View>
                      {error.email && (
                        <Text className="text-red-500">
                          Email Address is required
                        </Text>
                      )}

                      <View className="flex-row items-center border bg-[#EEEDEC] border-[#EEEDEC] rounded-lg p-3">
                        <Image source={require("../assets/phone.png")} />
                        <TextInput
                          placeholder="Phone Number"
                          className="flex-1 ml-2 border-0 bg-[#EEEDEC]"
                          value={formData.phone}
                          onChangeText={(value) =>
                            handleInputChange("phone", value)
                          }
                        />
                      </View>
                      {error.phone && (
                        <Text className="text-red-500">
                          Phone Number is required
                        </Text>
                      )}

                      <View className="flex-row items-center border bg-[#EEEDEC] border-[#EEEDEC] rounded-lg p-3">
                        <Image source={require("../assets/lock.png")} />
                        <TextInput
                          placeholder="Password"
                          className="flex-1 ml-2 border-0 bg-[#EEEDEC]"
                          secureTextEntry
                          value={formData.password}
                          onChangeText={(value) =>
                            handleInputChange("password", value)
                          }
                        />
                      </View>
                      {error.password && (
                        <Text className="text-red-500">
                          Password is required
                        </Text>
                      )}

                      <View className="flex-row items-center border bg-[#EEEDEC] border-[#EEEDEC] rounded-lg p-3">
                        <Image source={require("../assets/lock.png")} />
                        <TextInput
                          placeholder="Re-enter Password"
                          className="flex-1 ml-2 border-0 bg-[#EEEDEC]"
                          secureTextEntry
                          value={formData.re_password}
                          onChangeText={(value) =>
                            handleInputChange("re_password", value)
                          }
                        />
                      </View>
                      {error.re_password && (
                        <Text className="text-red-500">
                          Passwords do not match
                        </Text>
                      )}
                    </View>
                  </ScrollView>
                )}
                {currentComponent === 2 && (
                  <ScrollView nestedScrollEnabled={true}>
                    <View className="w-full space-y-4">
                      {/* Business Name Input */}
                      <View className="flex-row items-center border bg-[#EEEDEC] border-[#EEEDEC] rounded-lg p-3">
                        <Image source={require("../assets/name.png")} />
                        <TextInput
                          placeholder="Business Name"
                          value={formData.business_name}
                          onChangeText={(value) =>
                            handleInputChange("business_name", value)
                          }
                          className="flex-1 ml-2 border-0 bg-[#EEEDEC]"
                        />
                      </View>
                      {error.business_name && (
                        <Text className="text-red-500">
                          Business Name is required
                        </Text>
                      )}

                      {/* Informal Name Input */}
                      <View className="flex-row items-center border bg-[#EEEDEC] border-[#EEEDEC] rounded-lg p-3">
                        <Image source={require("../assets/smile.png")} />
                        <TextInput
                          placeholder="Informal Name"
                          value={formData.informal_name}
                          onChangeText={(value) =>
                            handleInputChange("informal_name", value)
                          }
                          className="flex-1 ml-2 border-0 bg-[#EEEDEC]"
                        />
                      </View>
                      {error.informal_name && (
                        <Text className="text-red-500">
                          Informal Name is required
                        </Text>
                      )}

                      {/* Street Address Input */}
                      <View className="flex-row items-center border bg-[#EEEDEC] border-[#EEEDEC] rounded-lg p-3">
                        <Image source={require("../assets/home.png")} />
                        <TextInput
                          placeholder="Street Address"
                          value={formData.address}
                          onChangeText={(value) =>
                            handleInputChange("address", value)
                          }
                          className="flex-1 ml-2 border-0 bg-[#EEEDEC]"
                        />
                      </View>
                      {error.address && (
                        <Text className="text-red-500">
                          Street Address is required
                        </Text>
                      )}

                      {/* City Input */}
                      <View className="flex-row items-center border bg-[#EEEDEC] border-[#EEEDEC] rounded-lg p-3 mb-2">
                        <Image source={require("../assets/location.png")} />
                        <TextInput
                          placeholder="City"
                          value={formData.city}
                          onChangeText={(value) =>
                            handleInputChange("city", value)
                          }
                          className="flex-1 ml-2 border-0 bg-[#EEEDEC]"
                        />
                      </View>
                      {error.city && (
                        <Text className="text-red-500">City is required</Text>
                      )}

                      {/* State Dropdown and Zipcode Input */}
                      <View className="flex flex-row justify-between items-center mb-2">
                        <View className="w-[40%] flex-row items-center border bg-[#EEEDEC] border-[#EEEDEC] rounded-lg p-3">
                          <TouchableOpacity
                            onPress={() => setShowDropdown((prev) => !prev)}
                            className="flex-1 ml-2 border-0 bg-[#EEEDEC]"
                          >
                            <TextInput
                              placeholder="State"
                              value={formData.state}
                              editable={false}
                              className="bg-[#EEEDEC] text-gray-700"
                            />
                          </TouchableOpacity>
                          <Image source={require("../assets/down.png")} />
                        </View>

                        <View className="w-[55%] flex-row items-center border bg-[#EEEDEC] border-[#EEEDEC] rounded-lg p-3">
                          <TextInput
                            placeholder="Enter Zipcode"
                            value={formData.zip_code}
                            onChangeText={(value) =>
                              handleInputChange("zip_code", value)
                            }
                            className="flex-1 ml-2 border-0 bg-[#EEEDEC]"
                            keyboardType="numeric" // Only allow numeric values
                          />
                        </View>
                      </View>
                      {error.state && (
                        <Text className="text-red-500">State is required</Text>
                      )}
                      {error.zip_code && (
                        <Text className="text-red-500">
                          Zipcode is required
                        </Text>
                      )}

                      {/* Dropdown for selecting states */}
                      {showDropdown && (
                        <View className="absolute bottom-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                          <FlatList
                            data={states}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                              <TouchableOpacity
                                onPress={() => handleSelect(item.name)} // Handle state selection
                                className="p-4 hover:bg-[#EEEDEC]" // Change background on hover
                              >
                                <Text>{item.name}</Text>
                              </TouchableOpacity>
                            )}
                          />
                        </View>
                      )}
                    </View>
                  </ScrollView>
                )}

                {currentComponent === 3 && (
                  <View>
                    <Verification
                      fileName={fileName}
                      setFileName={setFileName}
                      fileLink={fileLink}
                      setFileLink={setFileLink}
                      error={error}
                    />
                  </View>
                )}
                {currentComponent === 4 && (
                  <View>
                    <BusinessHours
                      selectedHours={selectedHours}
                      setSelectedHours={setSelectedHours}
                      error={error}
                    />
                  </View>
                )}
              </View>
              <View className="w-full   flex-1 flex-row justify-between items-center">
                {currentComponent === 1 ? (
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
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setCurrentComponent((prev) => prev - 1);
                    }}
                  >
                    <Image
                      source={require("../assets/leftarrow.png")}
                      className=""
                    />
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  disabled={loading}
                  onPress={() => {
                    if (currentComponent === 1) {
                      setFirstFormCheck(!firstFormCheck);
                    } else if (currentComponent === 2) {
                      setSecondFormCheck(!secondFormCheck);
                    } else if (currentComponent === 3) {
                      setThirdFormCheck(!thirdFormCheck);
                    } else if (currentComponent === 4) {
                      setFourthFormCheck(!fourthFormCheck);
                    } else {
                      setCurrentComponent((prev) => prev + 1);
                    }
                  }}
                  className="w-[60%] bg-[#e9663b] rounded-full py-3 my-10"
                >
                  {loading ? (
                    <ActivityIndicator
                      size="small"
                      color="#ffffff"
                      className="mr-2"
                    />
                  ) : (
                    <Text className="text-white text-center font-bold text-lg">
                      {submitButtonText[currentComponent - 1]}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}

          {currentComponent === 5 && (
            <View>
              <View className="h-[85vh] overflow-auto flex flex-col justify-center items-center gap-10">
                <Image source={require("../assets/right.png")} className="" />
                <Text className="font-bold text-3xl ">You’re all done!</Text>
                <Text className="text-gray-400  text-sm text-center">
                  Hang tight! We are currently reviewing your account and will
                  follow up with you in 2-3 business days. In the meantime, you
                  can setup your inventory.
                </Text>
              </View>
              <View className="flex flex-row justify-between items-center">
                <TouchableOpacity
                  onPress={() => {
                    router.push("/LoginScreen");
                  }}
                  className="w-full bg-[#e9663b] rounded-full py-3 my-10"
                >
                  <Text className="text-white text-center font-bold text-lg">
                    Got it!
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
