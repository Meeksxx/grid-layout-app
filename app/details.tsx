// app/details.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

export default function DetailScreen() {
  const { title, message, color } = useLocalSearchParams<{
    title?: string;
    message?: string;
    color?: string;
  }>();

  return (
    <View style={styles.container}>
      {/* Sets the header title & gives you a back button automatically */}
      <Stack.Screen options={{ title: title ?? "Detail" }} />
      <View style={[styles.panel, { borderColor: color ?? "#ddd" }]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eef0f4", padding: 24 },
  panel: {
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 2,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2
  },
  title: { fontSize: 22, fontWeight: "800" },
  message: { fontSize: 16, opacity: 0.8 }
});
