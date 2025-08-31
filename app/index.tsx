import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={{ flex:1, padding:16, gap:12 }}>
      <Text style={{ fontSize:18, fontWeight:"700" }}>MVP Community</Text>
      <Link href="/auth/login" asChild><Button title="로그인" /></Link>
      <Link href="/auth/signup" asChild><Button title="회원가입" /></Link>
    </View>
  );
}
