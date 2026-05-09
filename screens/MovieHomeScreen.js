import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList
} from "react-native";

import movies from "../data";

export default function MovieHomeScreen({ navigation }) {
  const renderCard = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Detail", { movie: item })}>
      <View style={styles.card}>
        <Image source={item.img} style={styles.cardImg} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView>

        <View style={styles.header}>
          <View style={styles.top}>
            <View>
              <Text style={{ color: "#aaa" }}>Good Evening,</Text>
              <Text style={styles.user}>Movie Lover 🍿</Text>
            </View>
            <Text style={{ color: "#fff" }}>🔔</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.location}>📍 Yogyakarta</Text>
            <Text style={styles.balance}>💰 Rp 150.000</Text>
          </View>
        </View>

        <View style={styles.banner}>
          <Image source={movies[0].img} style={styles.bannerImg} />

          <View style={styles.bannerContent}>
            <Text style={{ color: "#fff" }}>IMAX</Text>
            <Text style={styles.bannerTitle}>Avengers: Secret Wars</Text>
            <Text style={styles.rating}>⭐ 9.1 | Action, Sci-Fi | 2h 45m</Text>
          </View>
        </View>

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

        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text style={styles.h3}>Promo</Text>
            <Text style={styles.seeAll}>See All →</Text>
          </View>

          <View style={styles.promo}>
            <Text style={{ color: "#fff" }}>50% OFF</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
              Weekend Special
            </Text>
            <Text style={{ color: "#fff" }}>Get 50% off on all IMAX tickets</Text>

            <TouchableOpacity style={styles.promoBtn}>
              <Text>Claim Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text style={styles.h3}>Coming Soon</Text>
            <Text style={styles.seeAll}>See All →</Text>
          </View>

          {movies.slice(0, 2).map((item) => (
            <View key={item.id} style={styles.coming}>
              <Image source={item.img} style={styles.comingImg} />

              <View>
                <Text style={{ fontWeight: "bold", color: "#fff" }}>
                  {item.name}
                </Text>
                <Text style={{ color: "#aaa" }}>Sci-Fi</Text>
                <Text style={{ color: "#aaa" }}>⭐ 8</Text>
                <Text style={{ color: "#aaa" }}>📅 Jun 2025</Text>
              </View>

              <TouchableOpacity style={styles.remind}>
                <Text>Remind</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d0d0d" },
  header: { padding: 20 },
  top: { flexDirection: "row", justifyContent: "space-between" },
  user: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 15 },
  location: { backgroundColor: "#1c1c1c", padding: 8, borderRadius: 20, color: "#fff" },
  balance: { backgroundColor: "#2a1a12", padding: 8, borderRadius: 20, color: "orange" },
  banner: { margin: 15 },
  bannerImg: { width: "100%", height: 180, borderRadius: 20 },
  bannerContent: { position: "absolute", bottom: 15, left: 15 },
  bannerTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  rating: { color: "gold" },
  section: { paddingHorizontal: 15, marginTop: 20 },
  sectionTitle: { flexDirection: "row", justifyContent: "space-between" },
  h3: { color: "#fff", fontWeight: "bold" },
  seeAll: { color: "orange" },
  card: { width: 120, marginRight: 10 },
  cardImg: { width: "100%", height: 160, borderRadius: 15 },
  promo: { marginTop: 10, padding: 20, borderRadius: 20, backgroundColor: "#6a11cb" },
  promoBtn: { marginTop: 10, backgroundColor: "#fff", padding: 8, borderRadius: 20, alignItems: "center" },
  coming: { flexDirection: "row", alignItems: "center", marginTop: 15, gap: 10 },
  comingImg: { width: 80, height: 100, borderRadius: 10 },
  remind: { marginLeft: "auto", backgroundColor: "orange", padding: 5, borderRadius: 15 }
});