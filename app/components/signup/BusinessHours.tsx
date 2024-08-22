import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

const daysOfWeek = [
  {full: "Mon", short: "M" },
  {full: "Tue", short: "T" },
  {full: "Wed", short: "W" },
  {full: "Thu", short: "T" },
  {full: "Fri", short: "F" },
  {full: "Sat", short: "S" },
  {full: "Sun", short: "S" },
];

const timeRanges = [
  "8:00 AM - 10:00 AM",
  "10:00 AM - 1:00 PM",
  "1:00 PM - 4:00 PM",
  "4:00 PM - 7:00 PM",
  "7:00 PM - 10:00 PM",
];

const BusinessHours: React.FC = ({ selectedHours, setSelectedHours, error }) => {

  const [currentDay, setCurrentDay] = useState<string | null>(null);

  const toggleDaySelection = (day: string) => {
    // If the selected day is already chosen, clear the current day
    if (currentDay === day) {
      setCurrentDay(null);
    } else {
      setCurrentDay(day);
    }
  };

  const toggleTimeRangeSelection = (timeRange: string) => {
    if (!currentDay) return;

    setSelectedHours((prev) => {
      const updated = { ...prev };
      if (!updated[currentDay]) {
        updated[currentDay] = []; // Initialize if day doesn't exist
      }

      if (updated[currentDay].includes(timeRange)) {
        // If the time range is already selected, deselect it
        updated[currentDay] = updated[currentDay].filter(
          (tr) => tr !== timeRange
        );
      } else {
        // Otherwise, add the time range to the current day's selection
        updated[currentDay].push(timeRange);
      }

      return updated;
    });
  };

  useEffect(() => {
    setCurrentDay("Mon");
  }, []);

//  console.log("selectedHours", selectedHours);

  return (
    <View>
      {/* Day Selection */}
      <View className="flex-row justify-between my-8">
        {daysOfWeek.map(({ full, short }) => (
          <TouchableOpacity
            key={full}
            className={`flex-1  p-2 mx-1 border border-gray-300 rounded-lg ${
              currentDay === full
                ? "bg-[#D5715B]"
                : Object?.keys(selectedHours)?.includes(full)
                ? "bg-gray-300"
                : ""
            }`}
            onPress={() => toggleDaySelection(full)}
          >
            <Text
              className={`text-center ${
                currentDay === full
                  ? "text-white"
                  : Object?.keys(selectedHours)?.includes(full)
                  ? "text-gray-800"
                  : "text-gray-300"
              }`}
            >
              {short} {/* Use short form for display */}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Time Range Selection */}
      <View className="flex flex-row justify-between flex-wrap mb-4">
        {currentDay &&
          timeRanges.map((timeRange) => (
            <TouchableOpacity
              key={timeRange}
              className={`w-[49%] bg-gray-300 p-4 mb-2 rounded-lg ${
                selectedHours[currentDay]?.includes(timeRange)
                  ? "bg-[#f1a82a]"
                  : ""
              }`}
              onPress={() => toggleTimeRangeSelection(timeRange)}
            >
              <Text className={`text-center text-gray-800`}>{timeRange}</Text>
            </TouchableOpacity>
          ))}
      </View>
      {error.timeSelected && (
        <Text className="text-red-500">You must select Business hour</Text>
      )}
    </View>
  );
};

export default BusinessHours;
