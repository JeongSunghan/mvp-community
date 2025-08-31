import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../src/lib/firebase";
import { useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  return (
    <View style={{ padding:16, gap:12 }}>
      {user ? (
        <>
          <Text>로그인됨: {user.email}</Text>
          <Button title="로그아웃" onPress={() => signOut(auth)} />
          <Button title="홈으로" onPress={() => router.replace("/")} />
        </>
      ) : (
        <>
          <TextInput placeholder="이메일" autoCapitalize="none" style={{ borderWidth:1, padding:8 }} value={email} onChangeText={setEmail} />
          <TextInput placeholder="비밀번호" secureTextEntry style={{ borderWidth:1, padding:8 }} value={pw} onChangeText={setPw} />
          <Button title="로그인" onPress={async () => {
            try { await signInWithEmailAndPassword(auth, email, pw); router.replace("/"); }
            catch (e:any) { Alert.alert("로그인 실패", e.message); }
          }} />
        </>
      )}
    </View>
  );
}
