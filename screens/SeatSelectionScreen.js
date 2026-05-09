import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";

const SeatSelectionScreen = ({ navigation, route }) => {
  // Nhận movie được truyền từ MovieDetailScreen
  const { movie } = route.params || {};

  // 🔥 DATA GHẾ
  const [seats, setSeats] = useState([
    // Hàng A
    { id: "A1", row: "A", num: 1, type: "unavailable" },
    { id: "A2", row: "A", num: 2, type: "unavailable" },
    { id: "A3", row: "A", num: 3, type: "normal" },
    { id: "A4", row: "A", num: 4, type: "vip" },
    { id: "A5", row: "A", num: 5, type: "normal" },
    { id: "A6", row: "A", num: 6, type: "unavailable" },
    { id: "A7", row: "A", num: 7, type: "normal" },
    { id: "A8", row: "A", num: 8, type: "vip" },

    // Hàng B
    { id: "B1", row: "B", num: 1, type: "normal" },
    { id: "B2", row: "B", num: 2, type: "normal" },
    { id: "B3", row: "B", num: 3, type: "unavailable" },
    { id: "B4", row: "B", num: 4, type: "normal" },
    { id: "B5", row: "B", num: 5, type: "normal" },
    { id: "B6", row: "B", num: 6, type: "normal" },
    { id: "B7", row: "B", num: 7, type: "unavailable" },
    { id: "B8", row: "B", num: 8, type: "unavailable" },

    // Hàng C
    { id: "C1", row: "C", num: 1, type: "normal" },
    { id: "C2", row: "C", num: 2, type: "normal" },
    { id: "C3", row: "C", num: 3, type: "normal" },
    { id: "C4", row: "C", num: 4, type: "unavailable" },
    { id: "C5", row: "C", num: 5, type: "unavailable" },
    { id: "C6", row: "C", num: 6, type: "normal" },
    { id: "C7", row: "C", num: 7, type: "normal" },
    { id: "C8", row: "C", num: 8, type: "normal" },

    // Hàng D
    { id: "D1", row: "D", num: 1, type: "unavailable" },
    { id: "D2", row: "D", num: 2, type: "normal" },
    { id: "D3", row: "D", num: 3, type: "normal" },
    { id: "D4", row: "D", num: 4, type: "normal" },
    { id: "D5", row: "D", num: 5, type: "normal" },
    { id: "D6", row: "D", num: 6, type: "normal" },
    { id: "D7", row: "D", num: 7, type: "vip" },
    { id: "D8", row: "D", num: 8, type: "unavailable" },

    // Hàng E
    { id: "E1", row: "E", num: 1, type: "normal" },
    { id: "E2", row: "E", num: 2, type: "normal" },
    { id: "E3", row: "E", num: 3, type: "normal" },
    { id: "E4", row: "E", num: 4, type: "unavailable" },
    { id: "E5", row: "E", num: 5, type: "normal" },
    { id: "E6", row: "E", num: 6, type: "normal" },
    { id: "E7", row: "E", num: 7, type: "vip" },
    { id: "E8", row: "E", num: 8, type: "normal" },

    // Hàng F
    { id: "F1", row: "F", num: 1, type: "vip" },
    { id: "F2", row: "F", num: 2, type: "normal" },
    { id: "F3", row: "F", num: 3, type: "unavailable" },
    { id: "F4", row: "F", num: 4, type: "normal" },
    { id: "F5", row: "F", num: 5, type: "normal" },
    { id: "F6", row: "F", num: 6, type: "unavailable" },
    { id: "F7", row: "F", num: 7, type: "normal" },
    { id: "F8", row: "F", num: 8, type: "vip" },

    // Hàng G
    { id: "G1", row: "G", num: 1, type: "unavailable" },
    { id: "G2", row: "G", num: 2, type: "unavailable" },
    { id: "G3", row: "G", num: 3, type: "normal" },
    { id: "G4", row: "G", num: 4, type: "vip" },
    { id: "G5", row: "G", num: 5, type: "normal" },
    { id: "G6", row: "G", num: 6, type: "normal" },
    { id: "G7", row: "G", num: 7, type: "unavailable" },
    { id: "G8", row: "G", num: 8, type: "unavailable" },
  ]);

  // 🎯 TOGGLE GHẾ
  const toggleSeat = (id) => {
    setSeats((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, selected: !s.selected } : s
      )
    );
  };

  // 💰 TÍNH TIỀN
  const vipPrice = 85000;
  const normalPrice = 50000;

  const selectedSeats = seats.filter((s) => s.selected);

  const total = selectedSeats.reduce((sum, s) => {
    return sum + (s.type === "vip" ? vipPrice : normalPrice);
  }, 0);

  return (
    <View style={styles.container}>
      <ScrollView>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: "#fff" }}>←</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.title}>Select Seats</Text>
            <Text style={styles.sub}>
              Cinema 1 • Sat, 10 May • 19:45
            </Text>
          </View>
        </View>

        {/* SCREEN */}
        <View style={styles.screenBox}>
          <View style={styles.screenGlow} />
          <Text style={styles.screenText}>SCREEN</Text>
        </View>

        {/* SEATS */}
        <View style={styles.seatArea}>
          {["A", "B", "C", "D", "E", "F", "G"].map((row) => (
            <View key={row} style={styles.row}>
              <Text style={styles.rowLabel}>{row}</Text>

              <View style={styles.seatRow}>
                {seats
                  .filter((s) => s.row === row)
                  .map((seat) => (
                    <TouchableOpacity
                      key={seat.id}
                      style={[
                        styles.seat,
                        seat.type === "vip" && styles.vip,
                        seat.selected &&
                          (seat.type === "vip"
                            ? styles.vipSelected
                            : styles.selected),
                        seat.type === "unavailable" && styles.unavailable
                      ]}
                      onPress={() => {
                        if (seat.type !== "unavailable") toggleSeat(seat.id);
                      }}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.seatText}>{seat.num}</Text>
                    </TouchableOpacity>
                  ))}
              </View>

              <Text style={styles.rowLabel}>{row}</Text>
            </View>
          ))}
        </View>

        {/* LEGEND */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: "#222232" }]} />
            <Text style={styles.legendText}>Available</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: "#fb6e3b" }]} />
            <Text style={styles.legendText}>Selected</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { borderWidth: 1, borderColor: "#6358dc" }]} />
            <Text style={styles.legendText}>VIP</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: "#151515" }]} />
            <Text style={styles.legendText}>Taken</Text>
          </View>
        </View>

        {/* SUMMARY */}
        <View style={styles.summary}>
          <View style={styles.rowBetween}>
            <Text style={styles.gray}>Selected Seats</Text>
            <Text style={styles.whiteBold}>
              {selectedSeats.map((s) => s.id).join(", ") || "-"}
            </Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.gray}>
              Regular × {selectedSeats.filter((s) => s.type === "normal").length}
            </Text>
            <Text style={styles.whiteBold}>
              Rp {normalPrice.toLocaleString()}
            </Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.gray}>
              VIP × {selectedSeats.filter((s) => s.type === "vip").length}
            </Text>
            <Text style={styles.whiteBold}>
              Rp {vipPrice.toLocaleString()}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.whiteBold}>Total</Text>
            <Text style={styles.totalPrice}>
              Rp {total.toLocaleString()}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* BUTTON */}
      <TouchableOpacity
        style={[
          styles.btn,
          selectedSeats.length === 0 && { opacity: 0.5 }
        ]}
        onPress={() =>
          navigation.navigate("Checkout", {
            selectedSeats: selectedSeats,
            totalPrice: total,
            movie: movie,       // ✅ Truyền movie sang Checkout
          })
        }
        disabled={selectedSeats.length === 0}
      >
        <Text style={styles.btnText}>
          Continue — {selectedSeats.length} seats
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SeatSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    padding: 15
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center"
  },

  title: { color: "#fff", fontWeight: "bold" },
  sub: { color: "#888", fontSize: 12 },

  screenBox: {
    alignItems: "center",
    marginVertical: 20
  },

  screenGlow: {
    width: "80%",
    height: 10,
    backgroundColor: "#fb6e3b",
    borderRadius: 50
  },

  screenText: { color: "#888", marginTop: 5 },

  seatArea: { marginVertical: 10 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  },

  rowLabel: { color: "#888", width: 20 },

  seatRow: {
    flexDirection: "row",
    gap: 6
  },

  seat: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: "#222232",
    alignItems: "center",
    justifyContent: "center"
  },

  vip: {
    borderWidth: 1,
    borderColor: "#6358dc"
  },

  unavailable: {
    backgroundColor: "#151515",
    opacity: 0.8
  },

  selected: {
    backgroundColor: "#fb6e3b"
  },

  vipSelected: {
    backgroundColor: "#6358dc"
  },

  seatText: { color: "#fff", fontSize: 10 },

  legend: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },

  legendBox: {
    width: 14,
    height: 14,
    borderRadius: 3
  },

  legendText: { color: "#888", fontSize: 12 },

  summary: {
    backgroundColor: "#1a1a1a",
    padding: 15,
    borderRadius: 15,
    gap: 10
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  gray: { color: "#888" },
  whiteBold: { color: "#fff", fontWeight: "bold" },

  divider: {
    height: 1,
    backgroundColor: "#333"
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  totalPrice: {
    color: "#fb6e3b",
    fontWeight: "bold"
  },

  btn: {
    backgroundColor: "#fb6e3b",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold"
  }
});
