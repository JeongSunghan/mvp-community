import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useAuthState } from "../../src/hooks/useAuthState";
import { updateDisplayName, removeAccount, reauthenticate, } from "../../src/services/user";
import { useRouter } from "expo-router";
import BackBtn from "../../src/components/backBtn";

export default function Profile() {
  const { user } = useAuthState();
  const [name, setName] = useState(user?.displayName || "");
  // const [emailForReauth, setEmailForReauth] = useState(user?.email || "");
  // const [pwForReauth, setPwForReauth] = useState("");
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
            router.replace("/main");
          } catch (e: any) {
            Alert.alert("오류", e.message);
          }
        }}
      />

    </View>
  );
}
