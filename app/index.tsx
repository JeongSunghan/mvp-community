import { View, Text, ActivityIndicator, Button } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useAuthState } from "../src/hooks/useAuthState";

import PostList from "../src/components/Post/PostList";

export default function Index() {
  const router = useRouter();
  const { user, initializing } = useAuthState();

  // 1) 세션 초기화
  if (initializing) {
    return (
      <>
        <Stack.Screen options={{ title: "커뮤니티"}} />
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 16 }}>
          <ActivityIndicator />
          <Text style={{ marginTop: 8, opacity: 0.7 }}>세션 확인 중…</Text>
        </View>
      </>
    );
  }

  // 2) 비로그인
  if (!user) {
    return (
      <>
        <Stack.Screen options={{ title: "커뮤니티", }} />
        <View style={{ flex: 1, justifyContent: "center", gap: 12, padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "700" }}>MVP Community</Text>
          <Button title="로그인" onPress={() => router.push("/auth/login")} />
          <Button title="회원가입" onPress={() => router.push("/auth/signup")} />
        </View>
      </>
    );
  }

  // 3) 로그인
  return (
    <>
    <Button title="홈" onPress={() => router.push("/main")} />
      <Stack.Screen options={{ title: "커뮤니티",  }} />
      <View style={{ flex: 1, padding: 12 }}>
        <PostList onPress={(id: string) => router.push(`/post/${id}`)} />
          <Button title="게시글 작성" onPress={() => router.push("/new")} />
      </View>
    </>
  );
}
