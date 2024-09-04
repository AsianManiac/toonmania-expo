import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

const setUrl = async () => {
  try {
    const apiUrl = await AsyncStorage.getItem("apiUrl");
    if (apiUrl) {
      axios.defaults.baseURL = apiUrl + "/api";
    }
  } catch (error: any) {
    console.log(error);
  }
};
setUrl();

const axios = Axios.create({
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

// Set the Bearer auth token.
// const user = JSON.parse(localStorage.getItem("persist:root")!);
const setBearerToken = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
setBearerToken(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFjOWQzMWRkLTEyOGItNDQ0ZC1hNzZkLWViZjMxMGZhYTBlNSIsImlhdCI6MTcyNTQ2ODM5NywiZXhwIjoxNzI1NTU0Nzk3fQ.iiGGL862IegIjnyIOaOMRKrE2bYTG_Nzf8cf2vN-2A4"
);

export { axios, setBearerToken };
