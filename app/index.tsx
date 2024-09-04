import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AuthProvider, { useAuth } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [token, setToken] = useState<any>("");
  useEffect(() => {
    const token = async () => {
      await AsyncStorage.getItem("toonToken");
      setToken(token);
    };
  }, []);
  return (
    <AuthProvider>
      {token === null || "" ? (
        <Redirect href={"/(auth)/sign-in"} />
      ) : (
        <Redirect href={"/(root)/(tabs)/home"} />
      )}
    </AuthProvider>
  );
};

export default Home;
