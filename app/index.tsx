import React from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Platform,
  Image,
  type ColorValue,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

// ===== Local Assets =====
// app/index.tsx
import photosIcon from "../assets/images/photos_icon_apple.png";


// ===== Data Model =====
type Item = {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  gradient: readonly [ColorValue, ColorValue];
  message: string;
};

// ===== App Items =====
const ITEMS: Item[] = [
  { id: "calls", title: "Calls", icon: "call", gradient: ["#38ef7d", "#11998e"] as const, message: "Make calls from here" },
  { id: "camera", title: "Camera", icon: "camera", gradient: ["#747d8c", "#a4b0be"] as const, message: "Welcome to the camera app" },
  { id: "messages", title: "Messages", icon: "chatbubbles", gradient: ["#34d058", "#28a745"] as const, message: "Welcome to your Messages" },
  { id: "music", title: "Music", icon: "musical-notes", gradient: ["#FF616D", "#FF9966"] as const, message: "Welcome to the Music Selection Screen" },
  { id: "photos", title: "Photos", icon: "flower", gradient: ["#fdfbfb", "#ebedee"] as const, message: "Welcome to the Photos Screen" },
];

// ===== Main Component =====
export default function HomeGrid() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // --- Renders each grid item ---
  const renderItem = ({ item }: { item: Item }) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/details",
          params: {
            title: item.title,
            message: item.message,
            color: item.gradient[0] as string,
          },
        })
      }
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      android_ripple={{ color: "rgba(0,0,0,0.08)" }}
    >
      <View style={styles.cardBody}>
        {item.id === "photos" ? (
          <View style={styles.photoWrap}>
            <Image source={photosIcon} style={styles.photoImage} resizeMode="contain" />
          </View>
        ) : (
          <LinearGradient
            colors={item.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconWrap}
          >
            <Ionicons name={item.icon} size={100} color="#fff" />
          </LinearGradient>
        )}
        <Text style={styles.label} numberOfLines={1}>{item.title}</Text>
      </View>
    </Pressable>
  );

  // --- Screen Layout ---
  return (
    <SafeAreaView style={[styles.safe, { paddingTop: insets.top / 2 }]}>
      <StatusBar style="dark" backgroundColor="#f4f6fb" />
      <FlatList
        data={ITEMS}
        keyExtractor={(i) => i.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// ===== Styles =====
const CARD_RADIUS = 22;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f4f6fb",
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: CARD_RADIUS,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardPressed: {
    transform: [{ scale: Platform.OS === "ios" ? 0.98 : 1 }],
  },
  cardBody: {
    height: 50,
    width: 200,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  iconWrap: {
    width: "82%",
    aspectRatio: 1,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  photoWrap: {
    width: "78%",
    aspectRatio: 1,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: "#00000001",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    backgroundColor: "#fff",
  },
  photoImage: {
    width: "88%",
    aspectRatio: .26,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#111",
  },
});
