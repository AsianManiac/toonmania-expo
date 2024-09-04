import { UserAccount } from "@/types/type";
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

type Props = {
  children: React.ReactNode;
};
export const INITIAL_USER = {
  name: "",
  email: "",
  phoneNumber: "",
  avatar: "",
  password: "",
  confirmPassword: "",
};

const INITIAL_STATE = {
  userId: "",
  isLoading: false,
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  token: "",
  setToken: () => {},
  // login: () => {},
  // logout: () => {},
  // checkAuthUser: async () => false as boolean,
};

type ContextType = {
  userId: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  // login: React.Dispatch<React.SetStateAction<boolean>>;
  // logout: React.Dispatch<React.SetStateAction<boolean>>;
  // checkAuthUser: () => Promise<boolean>;
};

declare interface RequestUser {
  id: string;
  iat: number;
  exp: number;
}

export const AuthContext = createContext<ContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: Props) => {
  const [userId, setUserId] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const storedToken = await AsyncStorage.getItem("toonToken");
      if (storedToken) {
        console.log("Token retrieved from storage::", storedToken);
        const decodedToken: RequestUser = jwtDecode(storedToken);
        const userId = decodedToken.id;
        setUserId(userId);
        setToken(storedToken);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        setIsAuthenticated,
        isLoading,
        isAuthenticated,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
