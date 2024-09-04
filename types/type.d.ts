import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface FieldError {
  code: string;
  message: string;
  path: string[];
  validation: string;
}

declare interface VerificationError {
  code: string;
  error: string;
  state: "default" | "success" | "pending" | "failed";
}

declare interface UserAccount {
  name: string;
  email: string;
  phoneNumber: string;
  avatar?: string;
  password: string;
  confirmPassword?: string;
}
declare interface DiagnosticReport {
  _id: string;
  reportNumber: string;
  date: string;
  machine: Machine;
  issues: string[];
  isApproved: boolean;
  technician: string;
}
declare interface Machine {
  _id: string;
  serialNumber: string;
  brand: string;
  model: string;
}
declare interface Part {
  _id: string;
  name: string;
  reference: string;
  stockQuantity: number;
  unitPrice: number;
  date: string;
}
declare interface Driver {
  id: number;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
}

declare interface MarkerData {
  latitude: number;
  longitude: number;
  id: number;
  title: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
  first_name: string;
  last_name: string;
  time?: number;
  price?: string;
}

declare interface MapProps {
  destinationLatitude?: number;
  destinationLongitude?: number;
  onDriverTimesCalculated?: (driversWithTimes: MarkerData[]) => void;
  selectedDriver?: number | null;
  onMapReady?: () => void;
}

declare interface Ride {
  origin_address: string;
  destination_address: string;
  origin_latitude: number;
  origin_longitude: number;
  destination_latitude: number;
  destination_longitude: number;
  ride_time: number;
  fare_price: number;
  payment_status: string;
  driver_id: number;
  user_id: string;
  created_at: string;
  driver: {
    first_name: string;
    last_name: string;
    car_seats: number;
  };
}

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface GoogleInputProps {
  icon?: string;
  initialLocation?: string;
  containerStyle?: string;
  textInputBackgroundColor?: string;
  handlePress: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  errors?: any;
  className?: string;
}

declare interface PaymentProps {
  fullName: string;
  email: string;
  amount: string;
  driverId: number;
  rideTime: number;
}

declare interface LocationStore {
  userLatitude: number | null;
  userLongitude: number | null;
  userAddress: string | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
  destinationAddress: string | null;
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface EpisodeProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  episodeNumber: string;
  position: string;
  episodeUrl: string;
  datePublished: string;
  isPublished: string;
  isFree: string;
  imageUrl: string;
  orderIndex: string;
  webtoonId: string;
  attachments: AttachmentProps[];
  comments: CommentProps[];
  likes: LikeProps[];
}

declare interface AttachmentProps {
  id: string;
  name: string;
  url: string;
  toonId: string;
  episodeId: string;
}

declare interface LikeProps {
  id: string;
  userId: string;
  entityType: string;
  entityId: string;
  createdAt: Date;
  updatedAt: Date;
}

declare interface CommentProps {
  id: string;
  text: string;
  timestamp: Date;
  userId: string;
  episodeId: string;
  createdAt: Date;
  updatedAt: Date;
}

declare interface ToonProps {
  id: string;
  authorId: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  isPublished: boolean;
  datePublished: Date;
  updateDay: Date;
  genreId: string;
  userId: string;
  editedBy: string;
  attachments: AttachmentProps[];
  Like: LikeProps[];
  episodes: EpisodeProps[];
  titleNo: number;
}
