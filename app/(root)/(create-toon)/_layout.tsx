import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="create"
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: "Create Toon",
        }}
      />
      <Stack.Screen name="[toonId]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
