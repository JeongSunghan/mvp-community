import { View, Text, StyleSheet } from "react-native";
export default function PostCard({
  title,
  content,
  imageCount = 0,
  commentCount = 0,
}: {
  title: string;
  content?: string;
  imageCount?: number;
  commentCount?: number;
}) {
  return (
    <View style={s.card}>
      <Text style={s.title}>{title}</Text>
      {content ? (
        <Text numberOfLines={2} style={{ marginTop: 4 }}>
          {content}
        </Text>
      ) : null}
      <View style={{ flexDirection: "row", gap: 12, marginTop: 6 }}>
        {imageCount > 0 && <Text>📷 {imageCount}</Text>}
        <Text style={{ opacity: 0.6 }}>댓글 {commentCount}</Text>
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  card: { padding: 12, borderWidth: 1, borderRadius: 10, marginBottom: 10 },
  title: { fontWeight: "700", fontSize: 16 },
});
