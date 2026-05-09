import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AuthStack from "./AuthStack";
import AppTabs from "./AppTabs";
import { getUser } from "../utils/storage";
import { COLORS } from "../utils/colors";

export default function RootNavigator() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        // Timeout 4 giây: trên mobile native bridge đôi khi khởi động chậm.
        // Nếu AsyncStorage không trả lời kịp → coi như chưa login, vào màn login.
        const timeoutPromise = new Promise((resolve) =>
          setTimeout(() => resolve(null), 4000)
        );

        const user = await Promise.race([getUser(), timeoutPromise]);
        setIsLoggedIn(!!user);
      } catch (e) {
        // AsyncStorage lỗi trên native → fallback về màn login, không treo mãi
        setIsLoggedIn(false);
      } finally {
        // LUÔN tắt loading dù thành công hay lỗi hay timeout
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.background, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return isLoggedIn ? (
    <AppTabs setIsLoggedIn={setIsLoggedIn} />
  ) : (
    <AuthStack setIsLoggedIn={setIsLoggedIn} />
  );
}
