// app/details.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

export default function Details() {
  const { title = "Details", message = "", color } = useLocalSearchParams<{
    title?: string | string[];
    message?: string | string[];
    color?: string | string[];
  }>();

  const titleStr = Array.isArray(title) ? title[0] : title;

  return (
    <>
      <Stack.Screen
        options={{
          title: titleStr,
          headerBackTitle: "Home",
        }}
      />
      <View style={styles.wrap}>
        <View style={[styles.card, { borderColor: String(color ?? "#999") }]}>
          <Text style={styles.title}>{titleStr}</Text>
          <Text style={styles.message}>
            {Array.isArray(message) ? message[0] : message}
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 30, justifyContent: "flex-start", backgroundColor: "#f7f8fb" },
  card: { borderWidth: 2, borderRadius: 16, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 8 },
  message: { fontSize: 16, textAlign: "center" },
});
