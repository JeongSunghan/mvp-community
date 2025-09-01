import { View, Text } from "react-native";
export default function CommentItem({
  name,
  text,
}: {
  name: string;
  text: string;
}) {
  return (
    <View style={{ paddingVertical: 6 }}>
      <Text style={{ fontWeight: "600" }}>{name}</Text>
      <Text>{text}</Text>
    </View>
  );
}
