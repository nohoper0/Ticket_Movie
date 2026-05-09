import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { COLORS } from "../utils/colors";

export default function RegisterScreen({ navigation }) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!fullname || !email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    Alert.alert("Thành công", "Đăng ký thành công, hãy đăng nhập!");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Account</Text>
      <Text style={styles.subtitle}>Create your Ticket Movie account</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="John Doe"
          placeholderTextColor={COLORS.gray}
          value={fullname}
          onChangeText={setFullname}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          placeholderTextColor={COLORS.gray}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor={COLORS.gray}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.btn} onPress={handleRegister}>
          <Text style={styles.btnText}>REGISTER</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>
            Already have an account?{" "}
            <Text style={styles.linkBold}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: COLORS.text, textAlign: "center" },
  subtitle: { textAlign: "center", color: COLORS.gray, marginBottom: 30 },
  card: { backgroundColor: COLORS.card, padding: 20, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border },
  label: { color: COLORS.text, marginBottom: 6, marginTop: 10 },
  input: { backgroundColor: "#111", padding: 12, borderRadius: 12, color: COLORS.text, borderWidth: 1, borderColor: COLORS.border },
  btn: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 15, marginTop: 20, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "bold" },
  link: { color: COLORS.gray, marginTop: 15, textAlign: "center" },
  linkBold: { color: COLORS.primary, fontWeight: "bold" },
});