import { Pressable, View, Text, Image, StyleSheet } from "react-native";

export default function Avatar({
  name,
  photoURL,
  onPress,
}: {
  name?: string | null;
  photoURL?: string | null;
  onPress?: () => void;
}) {
  const initial = (name || "?").trim().charAt(0).toUpperCase();
  const body = photoURL ? (
    <Image source={{ uri: photoURL }} style={s.img} />
  ) : (
    <View style={s.fallback}>
      <Text style={s.fallbackText}>{initial}</Text>
    </View>
  );
  return onPress ? <Pressable onPress={onPress}>{body}</Pressable> : body;
}
const s = StyleSheet.create({
  img: { width: 28, height: 28, borderRadius: 14 },
  fallback: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF22",
  },
  fallbackText: { fontWeight: "700", color: "#007AFF" },
});
