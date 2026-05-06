import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList
} from "react-native";

// 👉 data từ bạn
import movies from "../data";

const MovieHomeScreen = ({ onNavigate, onSelectMovie }) => {

  const renderCard = ({ item }) => (
    <TouchableOpacity onPress={() => onSelectMovie(item)}>
      <View style={styles.card}>
        <Image source={item.img} style={styles.cardImg} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <ScrollView>

        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.top}>
            <View>
              <Text style={{ color: "#aaa" }}>Good Evening,</Text>
              <Text style={styles.user}>Movie Lover 🍿</Text>
            </View>
            <Text>🔔 JD</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.location}>📍 Yogyakarta</Text>
            <Text style={styles.balance}>💰 Rp 150.000</Text>
          </View>
        </View>

        {/* BANNER */}
        <View style={styles.banner}>
          <Image source={movies[0].img} style={styles.bannerImg} />

          <View style={styles.bannerContent}>
            <Text>IMAX</Text>
            <Text style={styles.bannerTitle}>
              Avengers: Secret Wars
            </Text>
            <Text style={styles.rating}>
              ⭐ 9.1 | Action, Sci-Fi | 2h 45m
            </Text>
          </View>
        </View>

        {/* NOW PLAYING */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text style={styles.h3}>Now Playing</Text>
            <Text style={styles.seeAll}>See All →</Text>
          </View>

          <FlatList
            data={movies}
            renderItem={renderCard}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10 }}
          />
        </View>

        {/* PROMO */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text style={styles.h3}>Promo</Text>
            <Text style={styles.seeAll}>See All →</Text>
          </View>

          <View style={styles.promo}>
            <Text>50% OFF</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Weekend Special
            </Text>
            <Text>Get 50% off on all IMAX tickets</Text>

            <TouchableOpacity style={styles.promoBtn}>
              <Text>Claim Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* COMING SOON */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text style={styles.h3}>Coming Soon</Text>
            <Text style={styles.seeAll}>See All →</Text>
          </View>

          {movies.slice(0,2).map((item) => (
            <View key={item.id} style={styles.coming}>
              <Image source={item.img} style={styles.comingImg} />

              <View>
                <Text style={{ fontWeight: "bold" }}>
                  {item.name}
                </Text>
                <Text>Sci-Fi</Text>
                <Text>⭐ 8</Text>
                <Text>📅 Jun 2025</Text>
              </View>

              <TouchableOpacity style={styles.remind}>
                <Text>Remind</Text>
              </TouchableOpacity>
            </View>
          ))}

        </View>

      </ScrollView>

      {/* NAVBAR */}
      <View style={styles.navbar}>
        <NavItem label="Home" icon="🏠" active onPress={() => onNavigate('Home')} />
        <NavItem label="Search" icon="🔍" onPress={() => onNavigate('Search')} />
        <NavItem label="Tickets" icon="🎫" onPress={() => onNavigate('MyTickets')} />
        <NavItem label="Profile" icon="👤" onPress={() => onNavigate('Profile')} />
      </View>

    </View>
  );
};

const NavItem = ({ label, icon, active, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.navItem}>
      <Text style={{ color: active ? "orange" : "#aaa" }}>{icon}</Text>
      <Text style={{ color: active ? "orange" : "#aaa", fontSize: 12 }}>
        {label}
      </Text>
    </View>
  </TouchableOpacity>
);

export default MovieHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d"
  },

  header: {
    padding: 20
  },

  top: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  user: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
  },

  location: {
    backgroundColor: "#1c1c1c",
    padding: 8,
    borderRadius: 20,
    color: "#fff"
  },

  balance: {
    backgroundColor: "#2a1a12",
    padding: 8,
    borderRadius: 20,
    color: "orange"
  },

  banner: {
    margin: 15
  },

  bannerImg: {
    width: "100%",
    height: 180,
    borderRadius: 20
  },

  bannerContent: {
    position: "absolute",
    bottom: 15,
    left: 15
  },

  bannerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"
  },

  rating: {
    color: "gold"
  },

  section: {
    paddingHorizontal: 15,
    marginTop: 20
  },

  sectionTitle: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  h3: {
    color: "#fff",
    fontWeight: "bold"
  },

  seeAll: {
    color: "orange"
  },

  card: {
    width: 120,
    marginRight: 10
  },

  cardImg: {
    width: "100%",
    height: 160,
    borderRadius: 15
  },

  promo: {
    marginTop: 10,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#6a11cb"
  },

  promoBtn: {
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
    alignItems: "center"
  },

  coming: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    gap: 10
  },

  comingImg: {
    width: 80,
    height: 100,
    borderRadius: 10
  },

  remind: {
    marginLeft: "auto",
    backgroundColor: "orange",
    padding: 5,
    borderRadius: 15
  },

  navbar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#111"
  },

  navItem: {
    alignItems: "center"
  }
});