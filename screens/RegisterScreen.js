import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

import { COLORS }
from "../utils/colors";

export default function RegisterScreen({
  navigation,
}) {
  const [fullname, setFullname] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleRegister = () => {
    // VALIDATE EMPTY
    if (
      !fullname.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      Alert.alert(
        "Error",
        "Please fill all fields!"
      );

      return;
    }

    // VALIDATE EMAIL
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert(
        "Error",
        "Invalid email!"
      );

      return;
    }

    // VALIDATE PASSWORD
    if (password.length < 6) {
      Alert.alert(
        "Error",
        "Password must be at least 6 characters!"
      );

      return;
    }

    try {
      setLoading(true);

      Alert.alert(
        "Success",
        "Register success!"
      );

      navigation.navigate("Login");

    } catch (e) {
      Alert.alert(
        "Error",
        "Register failed!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent:
            "center",
        }}
        showsVerticalScrollIndicator={
          false
        }
      >
        <Text style={styles.title}>
          Register Account
        </Text>

        <Text style={styles.subtitle}>
          Create your Ticket Movie account
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>
            Full Name
          </Text>

          <TextInput
            style={styles.input}
            placeholder="John Doe"
            placeholderTextColor={
              COLORS.gray
            }
            value={fullname}
            onChangeText={setFullname}
          />

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
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={styles.btnText}>
              {loading
                ? "LOADING..."
                : "REGISTER"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                "Login"
              )
            }
          >
            <Text style={styles.link}>
              Already have an account?{" "}
              <Text style={styles.linkBold}>
                Login
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      COLORS.background,
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: COLORS.gray,
    marginBottom: 35,
    marginTop: 10,
    fontSize: 14,
  },

  card: {
    backgroundColor:
      COLORS.card,

    padding: 22,
    borderRadius: 24,

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  label: {
    color: COLORS.text,
    marginBottom: 8,
    marginTop: 14,
    fontSize: 14,
    fontWeight: "600",
  },

  input: {
    backgroundColor:
      COLORS.background,
    padding: 14,
    borderRadius: 14,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 14,
  },

  btn: {
    backgroundColor:
      COLORS.primary,

    padding: 16,
    borderRadius: 16,
    marginTop: 24,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  link: {
    color: COLORS.gray,
    marginTop: 20,
    textAlign: "center",
    fontSize: 13,
  },

  linkBold: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
});