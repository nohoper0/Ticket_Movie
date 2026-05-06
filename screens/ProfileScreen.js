import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";

export default function ProfileScreen({ onNavigate }) {
  const [notification, setNotification] = useState(true);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={{ color: "white" }}>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
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

        {/* Wallet */}
        <View style={styles.wallet}>
          <View>
            <Text style={styles.gray}>TickMov Wallet</Text>
            <Text style={styles.balance}>Rp 150.000</Text>
          </View>
          <TouchableOpacity style={styles.topup}>
            <Text style={{ color: "white" }}>Top Up</Text>
          </TouchableOpacity>
        </View>

        {/* Account */}
        <Text style={styles.section}>ACCOUNT</Text>
        <View style={styles.menu}>
          <MenuItem title="My Tickets" subtitle="View all your bookings" />
          <MenuItem title="Wishlist" subtitle="Movies you want to watch" />

          <View style={styles.menuItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.menuTitle}>Notifications</Text>
              <Text style={styles.menuSub}>Manage your alerts</Text>
            </View>
            <Switch
              value={notification}
              onValueChange={setNotification}
            />
          </View>
        </View>

        {/* Settings */}
        <Text style={styles.section}>SETTINGS</Text>
        <View style={styles.menu}>
          <MenuItem title="Privacy & Security" subtitle="Account protection" />
          <MenuItem title="Help & Support" subtitle="FAQ and contact us" />
        </View>

        {/* Sign out */}
        <TouchableOpacity style={styles.signout}>
          <Text style={{ color: "#ff5252", fontWeight: "bold" }}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.navbar}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => onNavigate && onNavigate('Home')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => onNavigate && onNavigate('Search')}
        >
          <Text style={styles.navIcon}>🔍</Text>
          <Text style={styles.navLabel}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => onNavigate && onNavigate('MyTickets')}
        >
          <Text style={styles.navIcon}>🎫</Text>
          <Text style={styles.navLabel}>Tickets</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, styles.navItemActive]}
          onPress={() => onNavigate && onNavigate('Profile')}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>Profile</Text>
        </TouchableOpacity>
      </View>
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
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scroll: {
    padding: 20,
    paddingBottom: 100,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  editBtn: {
    backgroundColor: "#2c2c2e",
    padding: 10,
    borderRadius: 20,
  },

  profileCard: {
    backgroundColor: "#271712",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  profileInfo: {
    flexDirection: "row",
    gap: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ff6b35",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  email: {
    color: "#aaa",
    fontSize: 12,
  },
  gold: {
    color: "#ffc107",
    fontSize: 12,
  },

  stats: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    color: "white",
    fontWeight: "bold",
  },
  statLabel: {
    color: "#888",
    fontSize: 12,
  },

  wallet: {
    backgroundColor: "#1c1c1e",
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  gray: {
    color: "#888",
  },
  balance: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  topup: {
    backgroundColor: "#ff6b35",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },

  section: {
    color: "#607d8b",
    marginBottom: 10,
    marginTop: 10,
  },

  menu: {
    backgroundColor: "#1c1c1e",
    borderRadius: 20,
    marginBottom: 20,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    flexDirection: "row",
    alignItems: "center",
  },
  menuTitle: {
    color: "white",
    fontWeight: "600",
  },
  menuSub: {
    color: "#888",
    fontSize: 12,
  },

  signout: {
    backgroundColor: "#2a1515",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
  },

  navbar: {
    flexDirection: "row",
    backgroundColor: "#151515",
    borderTopWidth: 1,
    borderTopColor: "#262626",
    paddingVertical: 10,
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    flex: 1,
  },

  navItemActive: {
    backgroundColor: "rgba(255, 107, 53, 0.1)",
    borderRadius: 12,
  },

  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },

  navLabel: {
    color: "#888",
    fontSize: 12,
    fontWeight: "500",
  },

  navLabelActive: {
    color: "#fb6e3b",
    fontWeight: "bold",
  },
});