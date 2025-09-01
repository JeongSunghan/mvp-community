import { View, Text, Image } from "react-native";

type Props = {
  title: string;
  content: string;
  commentCount: number;
  imageBase64?: string; 
};

export default function PostCard({ title, content, commentCount, imageBase64 }: Props) {
  return (
    <View style={{ borderWidth: 1, padding: 12, marginBottom: 8 }}>
      <Text style={{ fontWeight: "700" }}>{title}</Text>
      <Text numberOfLines={2}>{content}</Text>
      {imageBase64 ? (
        <Image
          source={{ uri: imageBase64 }}
          style={{ width: "100%", height: 150, marginTop: 8 }}
          resizeMode="cover"
        />
      ) : null}
      <Text style={{ marginTop: 4, fontSize: 12, color: "#666" }}>
        댓글 {commentCount}
      </Text>
    </View>
  );
}
