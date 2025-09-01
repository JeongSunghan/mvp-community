import { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { addComment } from "../../services/comments";
export default function CommentInput({ postId }: { postId: string }) {
  const [text, setText] = useState("");
  return (
    <View style={{ flexDirection: "row", gap: 8, paddingVertical: 8 }}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="댓글 입력…"
        style={{ borderWidth: 1, flex: 1, padding: 8 }}
      />
      <Button
        title="등록"
        onPress={async () => {
          if (!text.trim()) return;
          await addComment(postId, text);
          setText("");
        }}
      />
    </View>
  );
}
