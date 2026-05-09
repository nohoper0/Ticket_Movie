// screens/BookingConfirmedScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { COLORS } from "../utils/colors";

const BookingConfirmedScreen = ({ navigation, route }) => {
  const { selectedSeats = [], totalPrice = 0, movie } = route.params || {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* SUCCESS ICON */}
        <View style={styles.successWrapper}>
          <Text style={styles.check}>✓</Text>
        </View>

        {/* TITLE */}
        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>
          Your tickets have been booked successfully.
        </Text>

        {/* CARD */}
        <View style={styles.card}>
          {/* MOVIE INFO */}
          <View style={styles.movieInfo}>
            <Image
              source={movie?.img || require("../assets/img/spider_man.jpg")}
              style={styles.poster}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.movieTitle}>
                {movie?.name || "Avengers: Secret Wars"}
              </Text>
              <Text style={styles.meta}>Cinema 1 • IMAX</Text>
              <Text style={styles.meta}>Sat, 10 May • 19:45</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* DETAILS */}
          <View style={styles.row}>
            <Text style={styles.label}>Seats</Text>
            <Text style={styles.value}>
              {selectedSeats.map((s) => s.id).join(", ") || "No seats selected"}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Total Paid</Text>
            <Text style={styles.price}>
              Rp {(totalPrice + 5000).toLocaleString()}
            </Text>
          </View>

          {/* DASHED LINE */}
          <View style={styles.dashed} />

          {/* BARCODE (fake) */}
          <View style={styles.barcodeBox}>
            <View style={styles.barcode} />
            <Text style={styles.ticketId}>TKM-2025-88SGZWZ5</Text>
          </View>
        </View>

        {/* BUTTONS */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigation.navigate("MyTickets")}
          >
            <Text style={styles.btnText}>My Tickets</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.btnText}>Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingConfirmedScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  successWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1b3b24",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  check: {
    color: "#4ade80",
    fontSize: 30,
    fontWeight: "bold",
  },

  title: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },

  subtitle: {
    color: COLORS.gray,
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },

  card: {
    width: "100%",
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  movieInfo: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },

  poster: {
    width: 70,
    height: 90,
    borderRadius: 10,
  },

  movieTitle: {
    color: COLORS.text,
    fontWeight: "bold",
    fontSize: 16,
  },

  meta: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  label: {
    color: COLORS.gray,
  },

  value: {
    color: COLORS.text,
    fontWeight: "bold",
  },

  price: {
    color: "#fb6e3b",
    fontWeight: "bold",
  },

  dashed: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: COLORS.border,
    marginVertical: 15,
  },

  barcodeBox: {
    alignItems: "center",
  },

  barcode: {
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    opacity: 0.2,
    marginBottom: 10,
    borderRadius: 10,
  },

  ticketId: {
    color: "#555",
    fontSize: 12,
    letterSpacing: 2,
  },

  btnRow: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },

  primaryBtn: {
    flex: 1,
    backgroundColor: "#fb6e3b",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  secondaryBtn: {
    flex: 1,
    backgroundColor: "#2a2a2a",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  btnText: {
    color: COLORS.text,
    fontWeight: "bold",
  },
});