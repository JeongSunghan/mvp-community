import { useEffect, useState } from "react";
import { View, Text, Image, TextInput, Button, FlatList, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getPost, type Post } from "../../src/services/posts";
import { subscribeComments, addComment, type Comment } from "../../src/services/comments";
import { useAuthState } from "../../src/hooks/useAuthState";
import BackBtn from "../../src/components/backBtn";

export default function PostDetail() {
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id || ""; // ✅ 안정 가드

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const { user } = useAuthState();

  useEffect(() => {
    if (!id) return;
    (async () => {
      const p = await getPost(id);
      setPost(p);
    })();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const unsub = subscribeComments(id, setComments);
    return unsub;
  }, [id]);

  if (!id) {
    return (
      <View style={{ padding: 16 }}>
        <Text>잘못된 접근입니다. (id 없음)</Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View style={{ padding: 16 }}>
        <BackBtn />
        <Text>불러오는 중…</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 12, gap: 12 }}>
      <BackBtn />
      <Text style={{ fontSize: 18, fontWeight: "700" }}>{post.title}</Text>
      {!!post.authorName && <Text style={{ opacity: 0.7 }}>{post.authorName}</Text>}
      {!!post.content && <Text style={{ marginVertical: 8 }}>{post.content}</Text>}

      {/* ✅ 이미지 표시: Base64 배열 */}
      {Array.isArray(post.imagesBase64) &&
        post.imagesBase64.map((b64, i) => (
          <Image
            key={`${i}`}
            source={{ uri: b64 }}
            style={{ width: "100%", height: 200, marginBottom: 8 }}
            resizeMode="cover"
          />
        ))}

      <FlatList
        data={comments}
        keyExtractor={(it) => it.id}
        ListHeaderComponent={<Text style={{ fontWeight: "700", fontSize: 16 }}>댓글</Text>}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 6 }}>
            {!!item.authorName && <Text style={{ fontWeight: "600" }}>{item.authorName}</Text>}
            <Text>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ opacity: 0.6, marginTop: 8 }}>아직 댓글이 없습니다.</Text>}
        contentContainerStyle={{ paddingBottom: 12 }}
      />

      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <TextInput
          placeholder="댓글 입력…"
          value={text}
          onChangeText={setText}
          style={{ borderWidth: 1, flex: 1, padding: 8, borderRadius: 6 }}
        />
        <Button
          title="등록"
          onPress={async () => {
            try {
              if (!user) return Alert.alert("로그인 필요");
              const v = text.trim();
              if (!v) return;
              await addComment(id, v);
              setText("");
            } catch (e: any) {
              Alert.alert("오류", e?.message || "알 수 없는 오류");
            }
          }}
        />
      </View>
    </View>
  );
}
