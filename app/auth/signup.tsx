import { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, nowTs } from "../../src/lib/firebase";
import { useRouter } from "expo-router";

export default function SignUp() {
  const [email, setEmail] = useState(""); 
  const [pw, setPw] = useState(""); 
  const [name, setName] = useState("");
  const router = useRouter();

  const onSignUp = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, pw);
      await updateProfile(user, { displayName: name || email.split("@")[0] });
      await setDoc(doc(db, "users", user.uid), {
        displayName: user.displayName,
        photoURL: user.photoURL || null,
        createdAt: nowTs(),
      });
      Alert.alert("가입 완료");
      router.replace("/");
    } catch (e:any) {
      Alert.alert("오류", e.message);
    }
  };

  return (
    <View style={{ padding:16, gap:12 }}>
      <TextInput placeholder="이메일" autoCapitalize="none" style={{ borderWidth:1, padding:8 }} value={email} onChangeText={setEmail} />
      <TextInput placeholder="비밀번호" secureTextEntry style={{ borderWidth:1, padding:8 }} value={pw} onChangeText={setPw} />
      <TextInput placeholder="표시 이름" style={{ borderWidth:1, padding:8 }} value={name} onChangeText={setName} />
      <Button title="회원가입" onPress={onSignUp} />
    </View>
  );
}
