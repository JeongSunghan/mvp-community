import { useState } from "react";
import { View, TextInput, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { createPost } from "../src/services/posts";
import { useRouter } from "expo-router";
import { useAuthState } from "../src/hooks/useAuthState";
import BackBtn from "../src/components/backBtn";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [uris, setUris] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false); 
  const { user } = useAuthState();
  const router = useRouter();

  const pick = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return Alert.alert("권한 필요", "앨범 접근을 허용하세요.");
    const r = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.9,
    });
    if (!r.canceled) setUris(r.assets?.map(a => a.uri) || []);
  };

  const onSubmit = async () => {
    if (!user) return Alert.alert("로그인 필요");
    if (!title.trim()) return Alert.alert("제목을 입력하세요.");
    try {
      setSubmitting(true);
      await createPost(title, content, uris);
      Alert.alert("등록 완료");
      router.replace("/");
    } catch (e: any) {
      console.log("createPost error:", e);
      console.log("uris:", uris);
      
      
      
      const msg = e?.message || "알 수 없는 오류";
      Alert.alert("등록 실패", msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={{ padding:16, gap:12 }}>
      <BackBtn />
      <TextInput placeholder="제목" style={{ borderWidth:1, padding:8 }} value={title} onChangeText={setTitle}/>
      <TextInput placeholder="내용" multiline numberOfLines={6} style={{ borderWidth:1, padding:8, minHeight:120 }}
        value={content} onChangeText={setContent}/>
      <Button title="이미지 선택" onPress={pick} disabled={submitting}/>
      {uris.map(u=> <Image key={u} source={{uri:u}} style={{ width:"100%", height:180, marginTop:8 }}/>)}
      <Button title={submitting ? "등록 중..." : "등록"} onPress={onSubmit} disabled={submitting}/>
    </View>
  );
}
