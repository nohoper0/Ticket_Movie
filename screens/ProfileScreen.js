import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";

import { useAuth } from "../context/AuthContext";

import { COLORS } from "../utils/colors";

export default function ProfileScreen() {
  const [notification, setNotification] =
    useState(true);

  const { user, logout } = useAuth();

  // ✅ HANDLE LOGOUT
  const handleLogout = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },

        {
          text: "Logout",
          style: "destructive",
          onPress: logout,
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={
          styles.scroll
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Profile
          </Text>

          <Text style={styles.headerSub}>
            Manage your account
          </Text>
        </View>

        {/* PROFILE CARD */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name
                ?.charAt(0)
                ?.toUpperCase() || "U"}
            </Text>
          </View>

          <Text style={styles.name}>
            {user?.name || "Guest User"}
          </Text>

          <Text style={styles.email}>
            {typeof user?.email ===
            "object"
              ? user?.email?.email ||
                "guest@email.com"
              : user?.email ||
                "guest@email.com"}
          </Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              🎬 Movie Lover
            </Text>
          </View>
        </View>

        {/* ACCOUNT MENU */}
        <View style={styles.menu}>
          <View style={styles.menuItem}>
            <View>
              <Text
                style={styles.menuTitle}
              >
                Notifications
              </Text>

              <Text
                style={styles.menuSub}
              >
                Receive booking updates
              </Text>
            </View>

            <Switch
              value={notification}
              onValueChange={
                setNotification
              }
              trackColor={{
                false: "#444",
                true: COLORS.primary,
              }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.8}
          >
            <View>
              <Text
                style={styles.menuTitle}
              >
                Payment Methods
              </Text>

              <Text
                style={styles.menuSub}
              >
                Manage your wallet
              </Text>
            </View>

            <Text style={styles.arrow}>
              ›
            </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.8}
          >
            <View>
              <Text
                style={styles.menuTitle}
              >
                Booking History
              </Text>

              <Text
                style={styles.menuSub}
              >
                View all movie tickets
              </Text>
            </View>

            <Text style={styles.arrow}>
              ›
            </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.8}
          >
            <View>
              <Text
                style={styles.menuTitle}
              >
                App Version
              </Text>

              <Text
                style={styles.menuSub}
              >
                Ticket Movie v1.0.0
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* STATS */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              12
            </Text>

            <Text style={styles.statLabel}>
              Movies Watched
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              4
            </Text>

            <Text style={styles.statLabel}>
              Upcoming
            </Text>
          </View>
        </View>

        {/* SIGN OUT */}
        <TouchableOpacity
          style={styles.signout}
          onPress={handleLogout}
          activeOpacity={0.85}
        >
          <Text style={styles.signoutText}>
            Sign Out
          </Text>
        </TouchableOpacity>

        {/* FOOTER */}
        <Text style={styles.footer}>
          Ticket Movie App
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      COLORS.background,
  },

  scroll: {
    padding: 20,
    paddingBottom: 120,
  },

  ////////////////// HEADER //////////////////

  header: {
    marginBottom: 10,
  },

  headerTitle: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "bold",
  },

  headerSub: {
    color: COLORS.gray,
    marginTop: 5,
  },

  ////////////////// PROFILE //////////////////

  profileCard: {
    backgroundColor: COLORS.card,
    padding: 25,
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  avatar: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor:
      COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  avatarText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },

  name: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "bold",
  },

  email: {
    color: COLORS.gray,
    marginTop: 6,
    fontSize: 14,
  },

  badge: {
    marginTop: 15,
    backgroundColor:
      "rgba(251,110,59,0.15)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  badgeText: {
    color: COLORS.primary,
    fontWeight: "600",
  },

  ////////////////// MENU //////////////////

  menu: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    marginTop: 25,
    overflow: "hidden",

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  menuItem: {
    padding: 18,
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  menuTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "600",
  },

  menuSub: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor:
      COLORS.border,
    marginLeft: 18,
  },

  arrow: {
    color: COLORS.gray,
    fontSize: 22,
  },

  ////////////////// STATS //////////////////

  statsContainer: {
    flexDirection: "row",
    gap: 15,
    marginTop: 25,
  },

  statCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  statNumber: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: "bold",
  },

  statLabel: {
    color: COLORS.gray,
    marginTop: 6,
    fontSize: 12,
  },

  ////////////////// SIGN OUT //////////////////

  signout: {
    backgroundColor:
      "rgba(255,82,82,0.12)",
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 30,

    borderWidth: 1,
    borderColor:
      "rgba(255,82,82,0.2)",
  },

  signoutText: {
    color: "#ff5252",
    fontWeight: "bold",
    fontSize: 16,
  },

  ////////////////// FOOTER //////////////////

  footer: {
    textAlign: "center",
    color: COLORS.gray,
    marginTop: 25,
    fontSize: 12,
  },
});