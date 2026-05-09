import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  Image,
} from "react-native";

import { useAuth } from "../context/AuthContext";

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
            {user?.email ||
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
                true: "#ff6b35",
              }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
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
            activeOpacity={0.7}
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
            activeOpacity={0.7}
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
          activeOpacity={0.8}
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
    backgroundColor: "#121212",
  },

  scroll: {
    padding: 20,
    paddingBottom: 40,
  },

  ////////////////// HEADER //////////////////

  header: {
    marginBottom: 10,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  headerSub: {
    color: "#888",
    marginTop: 5,
  },

  ////////////////// PROFILE //////////////////

  profileCard: {
    backgroundColor: "#1c1c1e",
    padding: 25,
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
  },

  avatar: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: "#ff6b35",
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
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  email: {
    color: "#aaa",
    marginTop: 6,
    fontSize: 14,
  },

  badge: {
    marginTop: 15,
    backgroundColor: "#2a1a14",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  badgeText: {
    color: "#ff8a65",
    fontWeight: "600",
  },

  ////////////////// MENU //////////////////

  menu: {
    backgroundColor: "#1c1c1e",
    borderRadius: 22,
    marginTop: 25,
    overflow: "hidden",
  },

  menuItem: {
    padding: 18,
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  menuTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  menuSub: {
    color: "#888",
    fontSize: 12,
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: "#2c2c2e",
    marginLeft: 18,
  },

  arrow: {
    color: "#666",
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
    backgroundColor: "#1c1c1e",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },

  statNumber: {
    color: "#ff6b35",
    fontSize: 24,
    fontWeight: "bold",
  },

  statLabel: {
    color: "#888",
    marginTop: 6,
    fontSize: 12,
  },

  ////////////////// SIGN OUT //////////////////

  signout: {
    backgroundColor: "#2a1515",
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#4d1f1f",
  },

  signoutText: {
    color: "#ff5252",
    fontWeight: "bold",
    fontSize: 16,
  },

  ////////////////// FOOTER //////////////////

  footer: {
    textAlign: "center",
    color: "#555",
    marginTop: 25,
    fontSize: 12,
  },
});