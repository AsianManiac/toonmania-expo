import React, { useState } from "react";
import {
  Image,
  View,
  ActivityIndicator,
  StyleSheet,
  ImageStyle,
} from "react-native";

interface CustomImageProps {
  source: { uri: string };
  placeholder: any;
  defaultImage: any;
  className?: string;
  style?: ImageStyle;
  reduceQuality?: boolean;
  qualityFactor?: number;
  alt?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({
  source,
  placeholder,
  defaultImage,
  style,
  className,
  reduceQuality = false,
  qualityFactor = 0.5,
}) => {
  const [imageSource, setImageSource] = useState(source);
  const [loading, setLoading] = useState(true);

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = () => {
    setImageSource(placeholder || defaultImage);
    setLoading(false);
  };

  const adjustedSource = reduceQuality
    ? {
        uri: `${source.uri}?quality=${Math.round(qualityFactor * 100)}`, // Assuming the server supports a `quality` query parameter
      }
    : source;

  return (
    <View style={[style, styles.container]}>
      {loading && (
        <ActivityIndicator size="small" color="#888" style={styles.loader} />
      )}
      <Image
        source={adjustedSource}
        className={className}
        style={[style, loading && { opacity: 0 }]}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    position: "absolute",
  },
});

export default CustomImage;
