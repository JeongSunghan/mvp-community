
import { Button, Pressable, Text, View } from "react-native";
import Avatar from "./Avatar";
import { useRouter } from "expo-router";

export function HeaderLeft({ user }:{ user:any }) {
  const router = useRouter();
  return user
    ? <Avatar name={user.displayName || user.email} photoURL={user.photoURL} onPress={()=>router.push("/auth/profile")} />
    : <Pressable onPress={()=>router.push("/auth/login")} style={{ paddingHorizontal:8 }}><Text style={{ fontWeight:"600", color:"#007AFF" }}>로그인</Text></Pressable>;
}

export function HeaderRight({ user }:{ user:any }) {
  const router = useRouter();
  return user
    ? <Button title="새 글" onPress={()=>router.push("/new")} />
    : <Pressable onPress={()=>router.push("/auth/signup")} style={{ paddingHorizontal:8 }}><Text style={{ fontWeight:"600" }}>회원가입</Text></Pressable>;
}
