import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image
} from "react-native";
import { COLORS } from "../utils/colors";
import { saveUser } from "../utils/storage";

export default function LoginScreen({ navigation, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập Email và Password!");
      return;
    }

    const fakeUser = {
      email,
      name: "Movie Lover",
    };

    await saveUser(fakeUser);
    setIsLoggedIn(true);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/img/avengers.jpg")}
        style={styles.bgImage}
        blurRadius={5}
      />

      <View style={styles.overlay}>
        <Text style={styles.logo}>🎬 Ticket Movie</Text>
        <Text style={styles.subtitle}>Login to continue booking tickets</Text>

        <View style={styles.card}>
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

          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btnText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>
              Don't have an account?{" "}
              <Text style={styles.linkBold}>Register</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Cinema Booking App</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  bgImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.3,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    color: COLORS.gray,
    marginBottom: 30,
  },
  card: {
    backgroundColor: "rgba(26,26,26,0.95)",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  label: { color: COLORS.text, marginBottom: 6, marginTop: 10 },
  input: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 12,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  btn: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  link: { color: COLORS.gray, marginTop: 15, textAlign: "center" },
  linkBold: { color: COLORS.primary, fontWeight: "bold" },
  footer: { textAlign: "center", color: COLORS.gray, marginTop: 25 },
});