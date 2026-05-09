import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert
} from "react-native";

const CheckoutScreen = ({ navigation, route }) => {
  // ✅ Nhận thêm movie từ SeatSelectionScreen
  const { selectedSeats = [], totalPrice = 0, movie } = route.params || {};

  const [selectedPayment, setSelectedPayment] = useState("wallet");
  const [promo, setPromo] = useState("");

  const payments = [
    { id: "card", title: "Credit / Debit Card", desc: "Visa, Mastercard, JCB", icon: "💳" },
    { id: "gopay", title: "GoPay", desc: "Scan QR to pay", icon: "📱" },
    { id: "wallet", title: "TickMov Wallet", desc: "Balance: Rp 150.000", icon: "👛" },
    { id: "ovo", title: "OVO", desc: "Pay with OVO balance", icon: "💎" }
  ];

  const serviceFee = 5000;
  const grandTotal = totalPrice + serviceFee;

  // ✅ Điều hướng đến BookingConfirmedScreen thay vì MyTickets
  const handlePay = () => {
    navigation.navigate("BookingConfirmed", {
      selectedSeats,
      totalPrice: grandTotal,
      movie,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
        </View>

        {/* ORDER SUMMARY */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Summary</Text>

          <View style={styles.movieInfo}>
            <Image
              source={movie?.img || require("../assets/img/spider_man.jpg")}
              style={styles.poster}
            />
            <View style={styles.movieDetail}>
              <Text style={styles.movieTitle}>{movie?.name || "Movie"}</Text>
              <Text style={styles.grayText}>Cinema 1 • IMAX</Text>
              <Text style={styles.grayText}>Sat, 10 May • 19:45</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.grayText}>Seats</Text>
            <Text style={styles.whiteText}>
              {selectedSeats.map(s => s.id).join(", ") || "No seats selected"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.grayText}>Ticket ({selectedSeats.length}x)</Text>
            <Text style={styles.whiteText}>Rp {totalPrice.toLocaleString()}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.grayText}>Service Fee</Text>
            <Text style={styles.whiteText}>Rp {serviceFee.toLocaleString()}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Grand Total</Text>
            <Text style={styles.totalPrice}>Rp {grandTotal.toLocaleString()}</Text>
          </View>
        </View>

        {/* PAYMENT METHOD */}
        <Text style={styles.mainSectionTitle}>Payment Method</Text>

        {payments.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={[
              styles.paymentItem,
              selectedPayment === p.id && styles.activePayment
            ]}
            onPress={() => setSelectedPayment(p.id)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconContainer,
                selectedPayment === p.id && { backgroundColor: "#fb6e3b" }
              ]}
            >
              <Text style={styles.iconText}>{p.icon}</Text>
            </View>

            <View style={styles.paymentTextContainer}>
              <Text style={styles.paymentTitle}>{p.title}</Text>
              <Text style={styles.grayTextSmall}>{p.desc}</Text>
            </View>

            <View
              style={[
                styles.radioCircle,
                selectedPayment === p.id && styles.radioCircleActive
              ]}
            >
              {selectedPayment === p.id && (
                <Text style={styles.checkMark}>✓</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}

        {/* PROMO CODE */}
        <Text style={styles.mainSectionTitle}>Promo Code</Text>
        <View style={styles.promoRow}>
          <TextInput
            style={styles.promoInput}
            placeholder="Enter promo code"
            placeholderTextColor="#666"
            value={promo}
            onChangeText={setPromo}
          />
          <TouchableOpacity style={styles.applyBtn}>
            <Text style={styles.applyBtnText}>Apply</Text>
          </TouchableOpacity>
        </View>

        {/* FINAL PAY BUTTON */}
        <TouchableOpacity style={styles.finalPayBtn} onPress={handlePay}>
          <Text style={styles.finalPayText}>
            Pay Rp {grandTotal.toLocaleString()}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#0d0d0d" },
  container: { flex: 1, padding: 16 },

  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backBtn: {
    width: 45,
    height: 45,
    backgroundColor: "#1c1c1c",
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15
  },
  backArrow: { color: "#fff", fontSize: 20 },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },

  card: { backgroundColor: "#151515", borderRadius: 20, padding: 20, marginBottom: 25 },
  sectionTitle: { color: "#fff", fontSize: 16, fontWeight: "bold", marginBottom: 15 },

  movieInfo: { flexDirection: "row", marginBottom: 15 },
  poster: { width: 75, height: 100, borderRadius: 12, marginRight: 15 },
  movieDetail: { justifyContent: "center" },
  movieTitle: { color: "#fff", fontSize: 16, fontWeight: "bold", marginBottom: 4 },

  divider: { height: 1, backgroundColor: "#262626", marginVertical: 15 },
  infoRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },

  whiteText: { color: "#fff", fontWeight: "500" },
  grayText: { color: "#888", fontSize: 14 },
  grayTextSmall: { color: "#666", fontSize: 12 },

  totalRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  totalLabel: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  totalPrice: { color: "#fb6e3b", fontSize: 18, fontWeight: "bold" },

  mainSectionTitle: { color: "#fff", fontSize: 16, fontWeight: "bold", marginBottom: 15, marginTop: 5 },

  paymentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#151515",
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "transparent"
  },
  activePayment: { borderColor: "#fb6e3b" },

  iconContainer: {
    width: 45,
    height: 45,
    backgroundColor: "#222",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15
  },
  iconText: { fontSize: 20 },
  paymentTextContainer: { flex: 1 },
  paymentTitle: { color: "#fff", fontWeight: "600", fontSize: 15 },

  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#444",
    justifyContent: "center",
    alignItems: "center"
  },
  radioCircleActive: { backgroundColor: "#fb6e3b", borderColor: "#fb6e3b" },
  checkMark: { color: "#fff", fontSize: 12, fontWeight: "bold" },

  promoRow: { flexDirection: "row", gap: 12, marginBottom: 30 },
  promoInput: {
    flex: 1,
    backgroundColor: "#151515",
    borderRadius: 15,
    padding: 15,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#222"
  },
  applyBtn: { backgroundColor: "#fb6e3b", paddingHorizontal: 25, borderRadius: 15, justifyContent: "center" },
  applyBtnText: { color: "#fff", fontWeight: "bold" },

  finalPayBtn: {
    backgroundColor: "#fb6e3b",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#fb6e3b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5
  },
  finalPayText: { color: "#fff", fontSize: 16, fontWeight: "bold" }
});

export default CheckoutScreen;
