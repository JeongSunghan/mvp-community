import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useAuthState } from "../../src/hooks/useAuthState";
import { updateDisplayName, removeAccount, reauthenticate, } from "../../src/services/user";
import { useRouter } from "expo-router";
import BackBtn from "../../src/components/backBtn";

export default function Profile() {
  const { user } = useAuthState();
  const [name, setName] = useState(user?.displayName || "");
  const [emailForReauth, setEmailForReauth] = useState(user?.email || "");
  const [pwForReauth, setPwForReauth] = useState("");
  const router = useRouter();

  if (!user)
    return (
      <View style={{ padding: 16 }}>
        <Text>로그인이 필요합니다.</Text>
      </View>
    );

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <BackBtn />
      <Text style={{ fontWeight: "700", fontSize: 18 }}>내 프로필</Text>
      <Text>UID: {user.uid}</Text>
      <Text>이메일: {user.email}</Text>
      <TextInput placeholder="표시 이름" value={name} onChangeText={setName} style={{ borderWidth: 1, padding: 8 }} />
      <Button title="이름 변경" onPress={async () => {
          try {
            await updateDisplayName(name.trim());
            Alert.alert("완료", "표시 이름이 변경되었습니다.");
            router.replace("/");
          } catch (e: any) {
            Alert.alert("오류", e.message);
          }
        }}
      />

      <View style={{ height: 1, backgroundColor: "#ddd", marginVertical: 12 }} />

      <Text style={{ fontWeight: "700" }}>계정 삭제</Text>
      <TextInput placeholder="이메일" autoCapitalize="none" value={emailForReauth} onChangeText={setEmailForReauth} style={{ borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="비밀번호" secureTextEntry value={pwForReauth} onChangeText={setPwForReauth} style={{ borderWidth: 1, padding: 8 }} />
      <Button title="계정 삭제" color="#d11" onPress={async () => {
          try {
            await reauthenticate(emailForReauth.trim(), pwForReauth);
            await removeAccount();
            Alert.alert("삭제됨", "계정이 삭제되었습니다.");
            router.replace("/");
          } catch (e: any) {
            Alert.alert("실패", e.message);
          }
        }}
      />
    </View>
  );
}
