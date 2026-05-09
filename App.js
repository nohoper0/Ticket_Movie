import React from "react";

import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";

import { SafeAreaProvider } from "react-native-safe-area-context";

import RootNavigator from "./navigation/RootNavigator";

import { AuthProvider } from "./context/AuthContext";

import { TicketProvider } from "./context/TicketContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <TicketProvider>
          <NavigationContainer>
            <RootNavigator />

            <StatusBar style="light" />
          </NavigationContainer>
        </TicketProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}