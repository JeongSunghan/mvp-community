import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import { login, logout } from "../../src/services/user";
import { useAuthState } from "../../src/hooks/useAuthState";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const { user } = useAuthState();
  const router = useRouter();

  const onLogin = async () => {
    try {
      await login(email.trim(), pw);
      router.replace("/main");
    } catch (e: any) {
      Alert.alert("로그인 실패", mapAuthError(e.code, e.message));
    }
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      {user ? (
        <>
          <Text>로그인됨: {user.email}</Text>
          <Button title="로그아웃" onPress={logout} />
          <Button title="홈으로" onPress={() => router.replace("/")} />
        </>
      ) : (
        <>
          <TextInput
            placeholder="이메일"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            style={{ borderWidth: 1, padding: 8 }}
          />
          <TextInput
            placeholder="비밀번호"
            secureTextEntry
            value={pw}
            onChangeText={setPw}
            style={{ borderWidth: 1, padding: 8 }}
          />
          <Button title="로그인" onPress={onLogin} />
        </>
      )}
    </View>
  );
}

function mapAuthError(code?: string, fallback = "알 수 없는 오류") {
  const t: Record<string, string> = {
    "auth/invalid-email": "이메일 형식이 잘못됐습니다.",
    "auth/user-not-found": "가입되지 않은 이메일입니다.",
    "auth/wrong-password": "비밀번호가 올바르지 않습니다.",
    "auth/invalid-credential": "이메일 또는 비밀번호가 올바르지 않습니다.",
    "auth/user-disabled": "비활성화된 계정입니다.",
    "auth/network-request-failed": "네트워크 오류입니다. 연결을 확인하세요.",
  };
  return (code && t[code]) || `${fallback} (${code || "no-code"})`;
}
