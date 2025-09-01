import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerTitleAlign: "center", headerShown: true, }}>
        <Stack.Screen name="main" options={{ title: "메인" }} />
        <Stack.Screen name="index" options={{ title: "게시글" }} />
        <Stack.Screen name="new" options={{ title: "새 글" }} />
        <Stack.Screen name="post/[id]" options={{ title: "상세" }} />
        <Stack.Screen name="auth/login" options={{ title: "로그인" }} />
        <Stack.Screen name="auth/signup" options={{ title: "회원가입" }} />
        <Stack.Screen name="auth/profile" options={{ title: "내 프로필" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
