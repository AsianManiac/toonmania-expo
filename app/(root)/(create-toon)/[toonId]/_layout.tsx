import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: "Update Toon",
        }}
      />
      <Stack.Screen name="[episodeId]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
