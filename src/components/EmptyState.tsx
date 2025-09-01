import { View, Text, Pressable } from "react-native";
export default function EmptyState({
  text,
  cta,
  onPress,
}: {
  text: string;
  cta: string;
  onPress: () => void;
}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: 16,
      }}
    >
      <Text style={{ fontSize: 16, opacity: 0.7 }}>{text}</Text>
      <Pressable
        onPress={onPress}
        style={{
          backgroundColor: "#007AFF",
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>{cta}</Text>
      </Pressable>
    </View>
  );
}
