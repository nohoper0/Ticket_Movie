import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert
} from "react-native";
import { removeUser } from "../utils/storage";

export default function ProfileScreen({ setIsLoggedIn }) {
  const [notification, setNotification] = useState(true);

  const handleLogout = async () => {
    await removeUser();
    Alert.alert("Logout", "Bạn đã đăng xuất!");
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={{ color: "white" }}>✏️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <Text style={{ color: "white", fontWeight: "bold" }}>JD</Text>
            </View>

            <View>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.email}>john.doe@email.com</Text>
              <Text style={styles.gold}>⭐ Gold Member</Text>
            </View>
          </View>

          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Tickets</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>Wishlist</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: "#ff6b35" }]}>
                150K
              </Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
          </View>
        </View>

        <View style={styles.wallet}>
          <View>
            <Text style={styles.gray}>TickMov Wallet</Text>
            <Text style={styles.balance}>Rp 150.000</Text>
          </View>
          <TouchableOpacity style={styles.topup}>
            <Text style={{ color: "white" }}>Top Up</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.section}>ACCOUNT</Text>
        <View style={styles.menu}>
          <MenuItem title="My Tickets" subtitle="View all your bookings" />
          <MenuItem title="Wishlist" subtitle="Movies you want to watch" />

          <View style={styles.menuItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.menuTitle}>Notifications</Text>
              <Text style={styles.menuSub}>Manage your alerts</Text>
            </View>
            <Switch value={notification} onValueChange={setNotification} />
          </View>
        </View>

        <Text style={styles.section}>SETTINGS</Text>
        <View style={styles.menu}>
          <MenuItem title="Privacy & Security" subtitle="Account protection" />
          <MenuItem title="Help & Support" subtitle="FAQ and contact us" />
        </View>

        <TouchableOpacity style={styles.signout} onPress={handleLogout}>
          <Text style={{ color: "#ff5252", fontWeight: "bold" }}>
            Sign Out
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const MenuItem = ({ title, subtitle }) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={{ flex: 1 }}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuSub}>{subtitle}</Text>
    </View>
    <Text style={{ color: "#888" }}>›</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  scroll: { padding: 20, paddingBottom: 50 },

  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  headerTitle: { fontSize: 22, color: "white", fontWeight: "bold" },
  editBtn: { backgroundColor: "#2c2c2e", padding: 10, borderRadius: 20 },

  profileCard: { backgroundColor: "#271712", padding: 20, borderRadius: 20, marginBottom: 20 },
  profileInfo: { flexDirection: "row", gap: 15 },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#ff6b35", justifyContent: "center", alignItems: "center" },
  name: { color: "white", fontSize: 16, fontWeight: "bold" },
  email: { color: "#aaa", fontSize: 12 },
  gold: { color: "#ffc107", fontSize: 12 },

  stats: { flexDirection: "row", marginTop: 15, justifyContent: "space-between" },
  statItem: { alignItems: "center" },
  statValue: { color: "white", fontWeight: "bold" },
  statLabel: { color: "#888", fontSize: 12 },

  wallet: { backgroundColor: "#1c1c1e", padding: 20, borderRadius: 20, flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  gray: { color: "#888" },
  balance: { color: "white", fontSize: 18, fontWeight: "bold" },
  topup: { backgroundColor: "#ff6b35", paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10 },

  section: { color: "#607d8b", marginBottom: 10, marginTop: 10 },

  menu: { backgroundColor: "#1c1c1e", borderRadius: 20, marginBottom: 20 },
  menuItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#333", flexDirection: "row", alignItems: "center" },
  menuTitle: { color: "white", fontWeight: "600" },
  menuSub: { color: "#888", fontSize: 12 },

  signout: { backgroundColor: "#2a1515", padding: 15, borderRadius: 20, alignItems: "center" },
});