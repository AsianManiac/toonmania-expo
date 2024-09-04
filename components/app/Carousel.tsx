import { Image } from "expo-image";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";

import { API, blurhash } from "@/constants";

const slider = [
  "https://storage.googleapis.com/manta-file-storage/2024-08-23/rR/rRG62gES0lsTVDI7.jpg",
  "https://static.manta.net/2024-07-01/OD/ODzgVPwGj8evpWcI.jpg",
  "https://static.manta.net/2024-08-14/ev/evzUVs6QP31gSLdz.jpg",
  "https://static.manta.net/2024-07-02/i2/i2Lmxu7kb2f62Mf8.jpg",
  "https://static.manta.net/2024-07-29/V2/V2Lrrhw1lHgb6jBp.jpg",
  "https://static.manta.net/2024-01-05/Gi/GiN8pMnzFGIXqpmR.jpg",
  "https://static.manta.net/2024-07-02/cW/cWsZjgfgphJmOny5.jpg",
  "https://static.manta.net/2024-07-24/62/62A4KqVHRMENvUPD.jpg",
  "https://static.manta.net/2024-08-09/uQ/uQU1AdnMoDcfxcWB.jpg",
  "https://static.manta.net/2024-01-12/EQ/EQ84wjwUITm7JYit.jpg",
  "https://static.manta.net/2024-06-14/kN/kNEE3Wec11nmX9ce.jpg",
];

const Carousel = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [textColor, setTextColor] = useState("#FFFFFF");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API}/api/user`); // Replace with your IP
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  const isLastSlide = activeIndex === users.length - 1;

  return (
    <View>
      <Swiper
        ref={swiperRef}
        autoplay
        className=""
        style={{ height: Dimensions.get("screen").height / 2.3 }}
        autoplayTimeout={5}
        showsPagination={false}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {slider.map((item, index) => (
          <View
            className="flex h-full items-end justify-center relative"
            key={index}
          >
            <Image
              source={{ uri: item }}
              className="w-full h-full"
              placeholder={{ blurhash }}
              contentFit="cover"
              cachePolicy={"memory-disk"}
            />
            {activeIndex === index && (
              <>
                <Text
                  className="absolute bottom-2 right-2"
                  style={{ color: textColor }}
                >
                  {activeIndex + 1}/{slider.length}
                </Text>
              </>
            )}
          </View>
        ))}
      </Swiper>

      <View className="absolute top-10 right-5 z-10 rounded-full bg-gray-400/50 p-2">
        <TouchableOpacity onPress={() => router.push("/(root)/search")}>
          <AntDesign name="search1" size={25} color="#FFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Carousel;
