import { useEffect, useState } from "react";
import { View, Text, Image, TextInput, Button, FlatList, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getPost, Post } from "../../src/services/posts";
import { subscribeComments, addComment, Comment } from "../../src/services/comments";
import { useAuthState } from "../../src/hooks/useAuthState";
import BackBtn from "../../src/components/backBtn";

export default function PostDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const { user } = useAuthState();

  useEffect(() => { (async () => setPost(await getPost(id)))(); }, [id]);
  useEffect(() => subscribeComments(id, setComments), [id]);

  if (!post) return <View style={{ padding:16 }}><Text>불러오는 중…</Text></View>;

  return (
    <View style={{ flex:1, padding:12, gap:12 }}>
      <BackBtn />
      <Text style={{ fontSize:18, fontWeight:"700" }}>{post.title}</Text>
      <Text style={{ opacity:0.7 }}>{post.authorName}</Text>
      <Text style={{ marginVertical:8 }}>{post.content}</Text>
      {post.imageUrls?.map(u => (
        <Image key={u} source={{ uri: u }} style={{ width:"100%", height:200, marginBottom:8 }} />
      ))}

      <FlatList
        data={comments}
        keyExtractor={(it)=>it.id}
        ListHeaderComponent={<Text style={{ fontWeight:"700", fontSize:16 }}>댓글</Text>}
        renderItem={({item})=>(
          <View style={{ paddingVertical:6 }}>
            <Text style={{ fontWeight:"600" }}>{item.authorName}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
      />

      <View style={{ flexDirection:"row", gap:8 }}>
        <TextInput placeholder="댓글 입력…" value={text} onChangeText={setText}
          style={{ borderWidth:1, flex:1, padding:8 }}/>
        <Button title="등록" onPress={async ()=>{
          try {
            if (!user) return Alert.alert("로그인 필요");
            await addComment(id, text);
            setText("");
          } catch (e:any) {
            Alert.alert("오류", e.message);
          }
        }}/>
      </View>
    </View>
  );
}
