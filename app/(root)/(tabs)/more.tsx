import HoriParts from "@/components/app/horiParts";
import { API } from "@/constants";
import { DiagnosticReport, Part } from "@/types/type";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DiagnosticReportsScreen = () => {
  const [reports, setReports] = useState<DiagnosticReport[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReportsAndParts = async () => {
      try {
        const [reportsResponse, partsResponse] = await Promise.all([
          fetch(`${API}/api/diagnostic`),
          fetch(`${API}/api/part`),
        ]);

        if (!reportsResponse.ok || !partsResponse.ok) {
          throw new Error("Failed to fetch data.");
        }

        const reportsData = await reportsResponse.json();
        const partsData = await partsResponse.json();

        setReports(reportsData.diagnostics);
        setParts(partsData.parts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReportsAndParts();
  }, []);

  const renderReport = ({ item }: { item: DiagnosticReport }) => (
    <View className="mb-4 p-4 bg-white rounded-lg shadow">
      <Text className="text-xl font-bold text-gray-800">
        Report #{item.reportNumber}
      </Text>
      <Text className="text-gray-600">
        Date: {new Date(item.date).toLocaleDateString()}
      </Text>
      <Text className="text-gray-600">
        Machine: {item.machine.brand} - {item.machine.model}
      </Text>
      <Text className="text-gray-600">Technician ID: {item.technician}</Text>
      <View className="mt-2">
        <Text className="font-semibold text-gray-700">Issues:</Text>
        {item.issues.map((issue, index) => (
          <Text key={index} className="text-gray-600 ml-2">
            - {issue}
          </Text>
        ))}
      </View>
      <Text
        className={`text-xs mt-2 ${
          item.isApproved ? "text-green-500" : "text-red-500"
        }`}
      >
        {item.isApproved ? "Approved" : "Not Approved"}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-red-500">Error: {error}</Text>
      </SafeAreaView>
    );
  }

  const renderPart = ({ item }: { item: Part }) => (
    <View className="mr-4 p-4 bg-white rounded-lg shadow w-40">
      <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
      <Text className="text-gray-600">Ref: {item.reference}</Text>
      <Text className="text-gray-600">Stock: {item.stockQuantity}</Text>
      <Text className="text-gray-600">Price: ${item.unitPrice}</Text>
    </View>
  );

  const filterPartsByDate = (date: string) => {
    const now = new Date();
    return parts.filter((part) => {
      const partDate = new Date(part.date);
      const diffTime = Math.abs(now.getTime() - partDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (date === "today") return diffDays <= 1;
      if (date === "lastWeek") return diffDays <= 7;
      if (date === "lastMonth") return diffDays <= 30;
    });
  };

  return (
    <View className="flex-1 bg-gray-200 px-2">
      <FlatList
        data={reports}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: DiagnosticReport }) => (
          <View className="mb-4 p-4 bg-white rounded-lg shadow">
            <Text className="text-xl font-bold text-gray-800">
              Report #{item.reportNumber}
            </Text>
            <Text className="text-gray-600">
              Date: {new Date(item.date).toLocaleDateString()}
            </Text>
            <Text className="text-gray-600">
              Machine: {item.machine.brand} - {item.machine.model}
            </Text>
            <Text className="text-gray-600">
              Technician ID: {item.technician}
            </Text>
            <View className="mt-2">
              <Text className="font-semibold text-gray-700">Issues:</Text>
              {item.issues.map((issue, index) => (
                <Text key={index} className="text-gray-600 ml-2">
                  - {issue}
                </Text>
              ))}
            </View>
            <Text
              className={`text-xs mt-2 ${
                item.isApproved ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.isApproved ? "Approved" : "Not Approved"}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={<View className="mb-2" />}
        ListFooterComponent={
          <View className="pb-5">
            <Text className="text-2xl font-bold my-4">Parts</Text>

            <Text className="text-lg font-bold mb-2">Added Today</Text>
            <View>
              {/* {filterPartsByDate("today").map((part) => renderPart({ item: part }))} */}

              <HoriParts parts={parts} />
            </View>

            <Text className="text-lg font-bold mb-2 mt-4">Added Last Week</Text>
            <View>
              {filterPartsByDate("lastWeek").map((part) =>
                renderPart({ item: part })
              )}
              <HoriParts parts={parts} />
            </View>

            <Text className="text-lg font-bold mb-2 mt-4">
              Added Last Month
            </Text>
            <View>
              {filterPartsByDate("lastMonth").map((part) =>
                renderPart({ item: part })
              )}
              <HoriParts parts={parts} />
            </View>
          </View>
        }
      />
      {/* <ScrollView showsVerticalScrollIndicator={false}></ScrollView> */}
    </View>
  );
};
export default DiagnosticReportsScreen;
