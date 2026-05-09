import React from "react";
import { ActivityIndicator, View } from "react-native";

import AuthStack from "./AuthStack";
import AppTabs from "./AppTabs";

import { useAuth } from "../context/AuthContext";
import { COLORS } from "../utils/colors";

export default function RootNavigator() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return isLoggedIn ? <AppTabs /> : <AuthStack />;
}