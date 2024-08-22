import { sliderData } from "../../config"; 
import React, { FC, useRef, useState } from "react";
import { Animated, FlatList, View } from "react-native";
import OnboardingItem from "./OnboardingItem";


const SliderComponent: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null); 

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ index: number }> }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View className="bg-white flex-1">
      <FlatList
        data={sliderData}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false} 
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id.toString()} 
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef} 
      />
    </View>
  );
};

export default SliderComponent;
