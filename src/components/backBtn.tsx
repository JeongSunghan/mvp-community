import { Pressable, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

//스와이프 오류로 인한 임시 백버튼 추가
export default function BackBtn() {
  const router = useRouter();
  return (
    <Pressable style={s.btn} onPress={() => router.back()}>
      <Text style={s.txt}>←</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  btn: { paddingHorizontal: 12, paddingVertical: 6 },
  txt: { fontSize: 18, fontWeight: "600" },
});
