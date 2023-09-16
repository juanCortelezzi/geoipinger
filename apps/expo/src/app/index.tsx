import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const Index = () => {
  return (
    <SafeAreaView className="bg-black">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Testing Lab" }} />
      <View className="h-full p-4">
        <Text className="mx-auto text-5xl font-bold text-white">
          Seat <Text className="text-pink-300">Control</Text>
        </Text>

        <View className="my-2" />
        {/* <Button title="Start tracking" color={"#f472b6"} /> */}
        {/* <Button title="Stop tracking" color={"#f472b6"} /> */}

        <View className="flex-row justify-center flex-wrap">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <View
              key={i}
              className="h-32 w-32 items-center m-2 justify-center rounded-lg border border-white"
            >
              <Text className="text-white">Hello</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
