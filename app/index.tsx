import { View, Text, Button } from "react-native";
import { useAuthState } from "../src/hooks/useAuthState";
import { useRouter, Link } from "expo-router";

export default function Home() {
  const { user, initializing } = useAuthState();
  const router = useRouter();
  return (
    <View style={{ padding:16, gap:12 }}>
      <Text style={{ fontSize:18, fontWeight:"700" }}>MVP Community</Text>
      {initializing ? (
        <Text>로딩중…</Text>
      ) : user ? (
        <>
          <Text>안녕하세요, {user.displayName || user.email}</Text>
          <Link href="/auth/profile" asChild><Button title="내 프로필" /></Link>
        </>
      ) : (
        <>
          <Link href="/auth/login" asChild><Button title="로그인" /></Link>
          <Link href="/auth/signup" asChild><Button title="회원가입" /></Link>
        </>
      )}
    </View>
  );
}
