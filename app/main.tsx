import { View, Text, Button, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useAuthState } from "../src/hooks/useAuthState";
import { logout } from "../src/services/user";

export default function Main() {
  const router = useRouter();
  const { user, initializing } = useAuthState();

  return (
    <>
      <Stack.Screen options={{ title: "메인" }} />

      {initializing ? (
        <View style={s.center}>
          <Text>세션 확인 중…</Text>
        </View>
      ) : user ? (
        //로그인 상태
        <View style={s.center}>
          <View style={s.card}>
            <Text style={s.title}>내 프로필</Text>
            <Text style={s.line}>이름: {user.displayName || "-"}</Text>
            <Text style={s.line}>이메일: {user.email}</Text>
            <View style={{ height: 12 }} />
            <Button title="프로필 상세" onPress={() => router.push("/auth/profile")} />
                <Button title="로그아웃" onPress={logout} color="red" />
          </View>

          <View style={{ height: 16 }} />
          <Button title="게시글 보러가기" onPress={() => router.replace("/")} />
        </View>
      ) : (
        // 비로그인 상태
        <View style={s.center}>
          <Text style={[s.title, { marginBottom: 12 }]}>MVP Community</Text>
          <Button title="로그인" onPress={() => router.push("/auth/login")} />
          <View style={{ height: 8 }} />
          <Button title="회원가입" onPress={() => router.push("/auth/signup")} />
        </View>
      )}
    </>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
  card: { width: "90%", borderWidth: 1, borderRadius: 10, padding: 16 },
  title: { fontSize: 18, fontWeight: "700" },
  line: { marginTop: 6 },
});
