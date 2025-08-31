import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="index" options={{ title: "홈" }} />
        <Stack.Screen name="auth/login" options={{ title: "로그인" }} />
        <Stack.Screen name="auth/signup" options={{ title: "회원가입" }} />
        <Stack.Screen name="auth/profile" options={{ title: "내 프로필" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
