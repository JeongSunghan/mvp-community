import { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { useRouter, Stack } from "expo-router";
import { signUp } from "../../src/services/user";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const router = useRouter();

  const onSubmit = async () => {
    if (!email || !pw) return Alert.alert("입력 확인", "이메일/비밀번호를 입력하세요.");
    try {
      await signUp(email.trim(), pw, name.trim());
      Alert.alert("가입 완료", "환영합니다!");
      router.replace("/main"); 
      
    } catch (e: any) {
      Alert.alert("가입 실패", mapAuthError(e.code, e.message));
    }
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <TextInput placeholder="이름" value={name} onChangeText={setName}
        style={{ borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="이메일" autoCapitalize="none" keyboardType="email-address"
        value={email} onChangeText={setEmail} style={{ borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="비밀번호" secureTextEntry value={pw}
        onChangeText={setPw} style={{ borderWidth: 1, padding: 8 }} />
      <Button title="회원가입" onPress={onSubmit} />
    </View>
  );
}

function mapAuthError(code?: string, fallback = "알 수 없는 오류") {
  const t: Record<string, string> = {
    "auth/email-already-in-use": "이미 가입된 이메일입니다.",
    "auth/invalid-email": "이메일 형식이 잘못됐습니다.",
    "auth/weak-password": "비밀번호가 너무 약합니다(6자 이상 권장).",
    "auth/network-request-failed": "네트워크 오류입니다. 연결을 확인하세요.",
  };
  return (code && t[code]) || `${fallback} (${code || "no-code"})`;
}
