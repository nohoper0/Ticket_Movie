import React from "react";

import { StatusBar } from "expo-status-bar";

import { View, ActivityIndicator } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { SafeAreaProvider } from "react-native-safe-area-context";

import RootNavigator from "./navigation/RootNavigator";

import AuthStack from "./navigation/AuthStack";

import { AuthProvider, useAuth } from "./context/AuthContext";

import { TicketProvider } from "./context/TicketContext";

import { COLORS } from "./utils/colors";

// Component này nằm bên trong AuthProvider nên đọc được isLoggedIn
function Navigation() {
  const { isLoggedIn, loading } = useAuth();

  // Đang kiểm tra trạng thái đăng nhập từ AsyncStorage → hiện loading
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

  // Đã đăng nhập → vào Home, chưa đăng nhập → vào Login
  return isLoggedIn ? <RootNavigator /> : <AuthStack />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <TicketProvider>
          <NavigationContainer>
            <StatusBar style="light" />

            <Navigation />
          </NavigationContainer>
        </TicketProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}