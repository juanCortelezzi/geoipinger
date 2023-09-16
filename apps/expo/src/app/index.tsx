import React from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { Stack } from "expo-router";
import * as TaskManager from "expo-task-manager";

const LOCATION_TASK_NAME = "background-location-task";

const startTracking = async () => {
  const { status: foregroundStatus } =
    await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus === Location.PermissionStatus.GRANTED) {
    const { status: backgroundStatus } =
      await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus === Location.PermissionStatus.GRANTED) {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 1000,
      });
    }
  }
};

const stopTracking = async () => {
  await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
};

TaskManager.defineTask<{ locations: Location.LocationObject[] }>(
  LOCATION_TASK_NAME,
  ({ data, error }) => {
    if (error) {
      // Error occurred - check `error.message` for more details.
      console.error("location task: ", error.message);
      return;
    }
    if (data) {
      const { locations } = data;
      console.log(locations);
      // do something with the locations captured in the background
    }
  },
);

const useIsTrackingLocations = () => {
  const [isTracking, setIsTracking] = React.useState(false);
  React.useEffect(() => {
    const interval = setInterval(() => {
      void Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME).then(
        setIsTracking,
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return isTracking;
};

const Index = () => {
  const isTracking = useIsTrackingLocations();

  return (
    <SafeAreaView className="bg-black">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Testing Lab" }} />
      <View className="h-full p-4">
        <Text className="mx-auto text-5xl font-bold text-white">
          Seat <Text className="text-pink-300">Control</Text>
        </Text>

        <Text className="text-white">{isTracking ? "yes" : "no"}</Text>

        <View className="my-2" />

        <Button
          title="Start tracking"
          onPress={() => {
            void startTracking();
          }}
          color={"#f9a8d4"}
        />
        <View className="my-1" />
        <Button
          title="Stop tracking"
          onPress={() => {
            void stopTracking();
          }}
          color={"#f9a8d4"}
        />

        <View className="my-2" />

        <View className="flex-row flex-wrap justify-center">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <View
              key={i}
              className="m-2 h-32 w-32 items-center justify-center rounded-lg border border-white"
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
