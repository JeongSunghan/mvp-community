import { View, ActivityIndicator, Text } from "react-native";
export default function Loading({ label="불러오는 중…" }:{label?:string}) {
  return <View style={{ flex:1, alignItems:"center", justifyContent:"center", padding:16 }}>
    <ActivityIndicator /><Text style={{ marginTop:8, opacity:0.7 }}>{label}</Text>
  </View>;
}
