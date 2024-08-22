import React from "react";
import { View, StyleSheet } from "react-native";

interface FluidIndicatorProps {
  currentIndex: number;
  totalItems: number;
}

const FluidIndicator: React.FC<FluidIndicatorProps> = ({
  currentIndex,
  totalItems,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalItems }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.indicator,
            currentIndex === index
              ? styles.activeIndicator
              : styles.inactiveIndicator,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  indicator: {
    marginHorizontal: 5, // Spacing between indicators
    transition: "background-color 0.3s ease", // Smooth transition (only for web)
  },
  activeIndicator: {
    width: 20,
    height: 10,
    borderRadius: 50, // Circle shape
    backgroundColor: "black", // Active color
  },
  inactiveIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5, // Circle shape
    backgroundColor: "black", // Inactive color
  },
});

export default FluidIndicator;
