import React, { useEffect } from "react";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";

import { SafeAreaProvider } from "react-native-safe-area-context";

import RootNavigator from "./navigation/RootNavigator";

import { AuthProvider } from "./context/AuthContext";

import { TicketProvider } from "./context/TicketContext";

// Inject global CSS cho web để fix ô trắng trong TextInput
function injectWebInputStyles() {
  if (Platform.OS !== 'web') return;
  const style = document.createElement('style');
  style.textContent = `
    input, textarea {
      background-color: transparent !important;
      outline: none !important;
      border: none !important;
      box-shadow: none !important;
      -webkit-appearance: none !important;
      color: #F0EEFF !important;
    }
  `;
  document.head.appendChild(style);
}

export default function App() {
  useEffect(() => {
    injectWebInputStyles();
  }, []);

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