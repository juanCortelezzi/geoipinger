import { SafeAreaView, Text, View } from "react-native";
import { Stack, useGlobalSearchParams } from "expo-router";


export default function Post() {
  const { id } = useGlobalSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");
  console.log(id)
  const data = {id: id, title: "title", content: "content"}

  if (!data) return null;

  return (
    <SafeAreaView className="bg-[#1F104A]">
      <Stack.Screen options={{ title: data.title }} />
      <View className="h-full w-full p-4">
        <Text className="py-2 text-3xl font-bold text-white">{data.title}</Text>
        <Text className="py-4 text-white">{data.content}</Text>
      </View>
    </SafeAreaView>
  );
}
