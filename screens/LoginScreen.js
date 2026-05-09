import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";

import { COLORS } from "../utils/colors";

import { useAuth }
from "../context/AuthContext";

export default function LoginScreen({
  navigation,
}) {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    // FIX SPACE BUG
    if (
      !email.trim() ||
      !password.trim()
    ) {
      Alert.alert(
        "Lỗi",
        "Vui lòng nhập Email và Password!"
      );

      return;
    }

    // VALIDATE EMAIL
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert(
        "Lỗi",
        "Email không hợp lệ!"
      );

      return;
    }

    try {
      setLoading(true);

      const userData = {
        email: email.trim(),
      };

      await login(userData);

    } catch (e) {
      Alert.alert(
        "Lỗi",
        "Đăng nhập thất bại!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/img/avengers.jpg")}
        style={styles.bgImage}
        blurRadius={5}
      />

      <View style={styles.overlay}>
        <Text style={styles.logo}>
          🎬 Ticket Movie
        </Text>

        <Text style={styles.subtitle}>
          Login to continue booking tickets
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>
            Email
          </Text>

          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            placeholderTextColor={
              COLORS.gray
            }
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>
            Password
          </Text>

          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor={
              COLORS.gray
            }
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={[
              styles.btn,
              loading && {
                opacity: 0.6,
              },
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.btnText}>
              {loading
                ? "LOADING..."
                : "LOGIN"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                "Register"
              )
            }
          >
            <Text style={styles.link}>
              Don't have an account?{" "}
              <Text style={styles.linkBold}>
                Register
              </Text>
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          Cinema Booking App
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      COLORS.background,
  },

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
    backgroundColor:
      "rgba(26,26,26,0.95)",

    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  label: {
    color: COLORS.text,
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 12,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  btn: {
    backgroundColor:
      COLORS.primary,

    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },

  link: {
    color: COLORS.gray,
    marginTop: 15,
    textAlign: "center",
  },

  linkBold: {
    color: COLORS.primary,
    fontWeight: "bold",
  },

  footer: {
    textAlign: "center",
    color: COLORS.gray,
    marginTop: 25,
  },
});