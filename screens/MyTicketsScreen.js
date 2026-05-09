import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";

const MyTicketsScreen = ({ navigation }) => {
  const [tab, setTab] = useState("upcoming");

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>My Tickets</Text>
            <Text style={styles.subtitle}>Your movie booking history</Text>
          </View>
        </View>

        {/* TABS */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tabBtn, tab === "upcoming" && styles.activeTab]}
            onPress={() => setTab("upcoming")}
          >
            <Text style={tab === "upcoming" ? styles.activeText : styles.tabText}>
              Upcoming
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, tab === "used" && styles.activeTab]}
            onPress={() => setTab("used")}
          >
            <Text style={tab === "used" ? styles.activeText : styles.tabText}>
              Used
            </Text>
          </TouchableOpacity>
        </View>

        {/* LIST */}
        {tab === "upcoming" ? <Upcoming /> : <Used />}
      </ScrollView>
    </View>
  );
};

export default MyTicketsScreen;

//////////////////// COMPONENTS ////////////////////

const TicketCard = ({ item, used }) => (
  <View style={styles.card}>
    <View style={styles.top}>
      <Image source={item.img} style={styles.poster} />

      <View style={{ flex: 1 }}>
        <View style={styles.rowBetween}>
          <Text style={styles.movie}>{item.name}</Text>
          <Text style={[styles.badge, used ? styles.used : styles.upcoming]}>
            {used ? "USED" : "UPCOMING"}
          </Text>
        </View>

        <Text style={styles.gray}>{item.cinema}</Text>

        <View style={styles.format}>
          <Text style={{ color: "#ff8a65" }}>{item.format}</Text>
        </View>
      </View>
    </View>

    {/* Divider */}
    <View style={styles.divider} />

    {/* Bottom */}
    <View style={styles.bottom}>
      <View>
        <Text style={styles.gray}>📅 {item.date}</Text>
        <Text style={styles.gray}>🕒 {item.time}</Text>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text style={{ color: "#666" }}>Seats: {item.seats}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </View>

    {/* Barcode (simple) */}
    {!used && (
      <View style={styles.barcode}>
        <Text style={{ color: "#000" }}>{item.code}</Text>
      </View>
    )}
  </View>
);

//////////////////// DATA ////////////////////

const upcomingData = [
  {
    name: "Avengers: Secret Wars",
    cinema: "XXI Grand Indonesia",
    format: "IMAX",
    date: "Sat, 10 May 2025",
    time: "19:45",
    seats: "D3, D4",
    price: "Rp 105.000",
    code: "TKM-2025-AB12CD",
    img: { uri: "https://i.imgur.com/8zQ6F7Q.png" }
  }
];

const usedData = [
  {
    name: "Dune: Messiah",
    cinema: "CGV Blitz Megamall",
    format: "4DX",
    date: "Sun, 20 Apr 2025",
    time: "13:15",
    seats: "F5",
    price: "Rp 90.000",
    img: { uri: "https://i.imgur.com/6oKXkYp.png" }
  },
  {
    name: "The Dark Forest",
    cinema: "XXI Yogyakarta",
    format: "Regular",
    date: "Fri, 11 Apr 2025",
    time: "21:00",
    seats: "B2, B3, B4",
    price: "Rp 150.000",
    img: { uri: "https://i.imgur.com/8zQ6F7Q.png" }
  }
];

//////////////////// LIST ////////////////////

const Upcoming = () => (
  <View style={styles.list}>
    {upcomingData.map((item, i) => (
      <TicketCard key={i} item={item} />
    ))}
  </View>
);

const Used = () => (
  <View style={styles.list}>
    {usedData.map((item, i) => (
      <TicketCard key={i} item={item} used />
    ))}
  </View>
);

//////////////////// STYLE ////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212"
  },

  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },

  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold"
  },

  subtitle: {
    color: "#888",
    marginTop: 5
  },

  tabs: {
    flexDirection: "row",
    marginHorizontal: 20,
    backgroundColor: "#1e1e1e",
    borderRadius: 30,
    padding: 5
  },

  tabBtn: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },

  activeTab: {
    backgroundColor: "#ff6b35",
    borderRadius: 25
  },

  tabText: {
    color: "#888"
  },

  activeText: {
    color: "#fff",
    fontWeight: "bold"
  },

  list: {
    padding: 20,
    gap: 20,
    paddingBottom: 20
  },

  card: {
    backgroundColor: "#1c1c1e",
    borderRadius: 20,
    padding: 15
  },

  top: {
    flexDirection: "row",
    gap: 10
  },

  poster: {
    width: 70,
    height: 100,
    borderRadius: 10
  },

  movie: {
    color: "#fff",
    fontWeight: "bold"
  },

  gray: {
    color: "#aaa",
    fontSize: 12
  },

  format: {
    backgroundColor: "#3a2015",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: "flex-start"
  },

  badge: {
    fontSize: 10,
    padding: 5,
    borderRadius: 5,
    overflow: "hidden"
  },

  upcoming: {
    backgroundColor: "#113320",
    color: "#34c759"
  },

  used: {
    backgroundColor: "#2c2c2e",
    color: "#aaa"
  },

  divider: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: 15
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  price: {
    color: "#ff6b35",
    fontWeight: "bold"
  },

  barcode: {
    marginTop: 15,
    backgroundColor: "#fff",
    padding: 10,
    alignItems: "center",
    borderRadius: 10
  },
});
