import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useTickets } from "../context/TicketContext";

const MyTicketsScreen = ({ navigation }) => {
  const [tab, setTab] = useState("upcoming");

  // ✅ Global tickets từ Context API
  const { tickets } = useTickets();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>My Tickets</Text>

            <Text style={styles.subtitle}>
              Your movie booking history
            </Text>
          </View>
        </View>

        {/* TABS */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tabBtn,
              tab === "upcoming" && styles.activeTab,
            ]}
            onPress={() => setTab("upcoming")}
          >
            <Text
              style={
                tab === "upcoming"
                  ? styles.activeText
                  : styles.tabText
              }
            >
              Upcoming
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabBtn,
              tab === "used" && styles.activeTab,
            ]}
            onPress={() => setTab("used")}
          >
            <Text
              style={
                tab === "used"
                  ? styles.activeText
                  : styles.tabText
              }
            >
              Used
            </Text>
          </TouchableOpacity>
        </View>

        {/* UPCOMING */}
        {tab === "upcoming" ? (
          <View style={styles.list}>
            {tickets.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyIcon}>🎬</Text>

                <Text style={styles.emptyTitle}>
                  No Tickets Yet
                </Text>

                <Text style={styles.emptySub}>
                  Book your first movie ticket now
                </Text>

                <TouchableOpacity
                  style={styles.bookBtn}
                  onPress={() =>
                    navigation.navigate("Home")
                  }
                >
                  <Text style={styles.bookBtnText}>
                    Browse Movies
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              tickets.map((ticket, i) => (
                <TicketCard
                  key={ticket.id || i}
                  item={{
                    name: ticket.movie?.name || "Movie",
                    cinema: "Cinema 1",
                    format: "IMAX",
                    date: ticket.date,
                    time: ticket.time,
                    seats: ticket.seats
                      ?.map((s) => s.id)
                      .join(", "),
                    price: `Rp ${ticket.total.toLocaleString()}`,
                    code: `TKM-${ticket.id}`,
                    img:
                      ticket.movie?.img ||
                      require("../assets/img/spider_man.jpg"),
                  }}
                />
              ))
            )}
          </View>
        ) : (
          <Used />
        )}
      </ScrollView>
    </View>
  );
};

export default MyTicketsScreen;

//////////////////// TICKET CARD ////////////////////

const TicketCard = ({ item, used }) => (
  <View style={styles.card}>
    {/* TOP */}
    <View style={styles.top}>
      <Image source={item.img} style={styles.poster} />

      <View style={styles.info}>
        <View style={styles.rowBetween}>
          <Text
            style={styles.movie}
            numberOfLines={2}
          >
            {item.name}
          </Text>

          <Text
            style={[
              styles.badge,
              used
                ? styles.usedBadge
                : styles.upcomingBadge,
            ]}
          >
            {used ? "USED" : "UPCOMING"}
          </Text>
        </View>

        <Text style={styles.gray}>
          {item.cinema}
        </Text>

        <View style={styles.format}>
          <Text style={styles.formatText}>
            {item.format}
          </Text>
        </View>
      </View>
    </View>

    {/* DIVIDER */}
    <View style={styles.divider} />

    {/* BOTTOM */}
    <View style={styles.bottom}>
      <View>
        <Text style={styles.gray}>
          📅 {item.date}
        </Text>

        <Text style={styles.gray}>
          🕒 {item.time}
        </Text>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.seatText}>
          Seats: {item.seats}
        </Text>

        <Text style={styles.price}>
          {item.price}
        </Text>
      </View>
    </View>

    {/* BARCODE */}
    {!used && (
      <View style={styles.barcode}>
        <Text style={styles.barcodeText}>
          {item.code}
        </Text>
      </View>
    )}
  </View>
);

//////////////////// USED DATA ////////////////////

const usedData = [
  {
    name: "Dune: Messiah",
    cinema: "CGV Blitz Megamall",
    format: "4DX",
    date: "Sun, 20 Apr 2025",
    time: "13:15",
    seats: "F5",
    price: "Rp 90.000",
    img: {
      uri: "https://i.imgur.com/6oKXkYp.png",
    },
  },
  {
    name: "The Dark Forest",
    cinema: "XXI Yogyakarta",
    format: "Regular",
    date: "Fri, 11 Apr 2025",
    time: "21:00",
    seats: "B2, B3, B4",
    price: "Rp 150.000",
    img: {
      uri: "https://i.imgur.com/8zQ6F7Q.png",
    },
  },
];

//////////////////// USED LIST ////////////////////

const Used = () => (
  <View style={styles.list}>
    {usedData.map((item, i) => (
      <TicketCard
        key={i}
        item={item}
        used
      />
    ))}
  </View>
);

//////////////////// STYLES ////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },

  ////////////////// HEADER //////////////////

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },

  subtitle: {
    color: "#888",
    marginTop: 6,
    fontSize: 14,
  },

  ////////////////// TABS //////////////////

  tabs: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 15,
    backgroundColor: "#1e1e1e",
    borderRadius: 30,
    padding: 5,
  },

  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 25,
  },

  activeTab: {
    backgroundColor: "#ff6b35",
  },

  tabText: {
    color: "#888",
    fontWeight: "500",
  },

  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },

  ////////////////// LIST //////////////////

  list: {
    padding: 20,
    gap: 20,
  },

  ////////////////// CARD //////////////////

  card: {
    backgroundColor: "#1c1c1e",
    borderRadius: 24,
    padding: 15,
    borderWidth: 1,
    borderColor: "#2b2b2b",
  },

  top: {
    flexDirection: "row",
  },

  poster: {
    width: 80,
    height: 110,
    borderRadius: 14,
    marginRight: 14,
  },

  info: {
    flex: 1,
    justifyContent: "space-between",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  movie: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },

  gray: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 4,
  },

  ////////////////// FORMAT //////////////////

  format: {
    marginTop: 10,
    backgroundColor: "#3a2015",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  formatText: {
    color: "#ff8a65",
    fontWeight: "600",
    fontSize: 12,
  },

  ////////////////// BADGE //////////////////

  badge: {
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    overflow: "hidden",
    fontWeight: "bold",
  },

  upcomingBadge: {
    backgroundColor: "#113320",
    color: "#34c759",
  },

  usedBadge: {
    backgroundColor: "#2c2c2e",
    color: "#aaa",
  },

  ////////////////// DIVIDER //////////////////

  divider: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: 15,
  },

  ////////////////// BOTTOM //////////////////

  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  seatText: {
    color: "#888",
    fontSize: 12,
  },

  price: {
    color: "#ff6b35",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 5,
  },

  ////////////////// BARCODE //////////////////

  barcode: {
    marginTop: 18,
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  barcodeText: {
    color: "#000",
    fontWeight: "bold",
    letterSpacing: 2,
  },

  ////////////////// EMPTY //////////////////

  emptyBox: {
    marginTop: 80,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  emptyIcon: {
    fontSize: 70,
    marginBottom: 15,
  },

  emptyTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  emptySub: {
    color: "#888",
    marginTop: 10,
    textAlign: "center",
    lineHeight: 22,
  },

  bookBtn: {
    marginTop: 30,
    backgroundColor: "#ff6b35",
    paddingHorizontal: 28,
    paddingVertical: 15,
    borderRadius: 30,
  },

  bookBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});