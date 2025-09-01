import { useState } from "react";
import { View, TextInput, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { createPost } from "../../services/posts";

export default function PostComposer({ onDone }:{ onDone:()=>void }) {
  const [title, setTitle] = useState(""); const [content, setContent] = useState(""); const [uris, setUris] = useState<string[]>([]);
  const pick = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return Alert.alert("권한 필요", "앨범 접근을 허용하세요.");
    const r = await ImagePicker.launchImageLibraryAsync({ allowsMultipleSelection:true, mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!r.canceled) setUris(r.assets?.map(a=>a.uri) || []);
  };
  const submit = async () => {
    if (!title.trim()) return Alert.alert("제목을 입력하세요.");
    await createPost(title, content, uris);
    setTitle(""); setContent(""); setUris([]);
    onDone();
  };
  return (
    <View style={{ padding:16, gap:12 }}>
      <TextInput placeholder="제목" value={title} onChangeText={setTitle} style={{ borderWidth:1, padding:8 }} />
      <TextInput placeholder="내용" value={content} onChangeText={setContent} multiline numberOfLines={6} style={{ borderWidth:1, padding:8, minHeight:120 }} />
      <Button title="이미지 선택" onPress={pick} />
      {uris.map(u=> <Image key={u} source={{ uri:u }} style={{ width:"100%", height:180, marginTop:8 }} />)}
      <Button title="등록" onPress={submit} />
    </View>
  );
}
