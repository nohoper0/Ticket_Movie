import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import { COLORS } from "../utils/colors";

const MAX_SEATS = 8;

const SeatSelectionScreen = ({
  navigation,
  route,
}) => {
  const { movie } = route.params || {};

  // ── LAYOUT GHẾ ─────────────────────────────────────────────────
  // normal   = ghế thường (Rp 50.000)
  // vip      = ghế VIP (Rp 85.000)
  // unavailable = đã bị đặt trước (không thể chọn)
  // Dữ liệu này là trạng thái phòng chiếu tại thời điểm hiện tại
  const [seats, setSeats] = useState([
    // Hàng A — toàn ghế thường, còn trống hết
    { id: "A1", row: "A", num: 1, type: "normal" },
    { id: "A2", row: "A", num: 2, type: "normal" },
    { id: "A3", row: "A", num: 3, type: "normal" },
    { id: "A4", row: "A", num: 4, type: "normal" },
    { id: "A5", row: "A", num: 5, type: "normal" },
    { id: "A6", row: "A", num: 6, type: "normal" },
    { id: "A7", row: "A", num: 7, type: "normal" },
    { id: "A8", row: "A", num: 8, type: "normal" },

    // Hàng B — một vài ghế đã bị đặt
    { id: "B1", row: "B", num: 1, type: "normal" },
    { id: "B2", row: "B", num: 2, type: "unavailable" },
    { id: "B3", row: "B", num: 3, type: "unavailable" },
    { id: "B4", row: "B", num: 4, type: "normal" },
    { id: "B5", row: "B", num: 5, type: "normal" },
    { id: "B6", row: "B", num: 6, type: "normal" },
    { id: "B7", row: "B", num: 7, type: "unavailable" },
    { id: "B8", row: "B", num: 8, type: "normal" },

    // Hàng C — còn nhiều ghế trống
    { id: "C1", row: "C", num: 1, type: "normal" },
    { id: "C2", row: "C", num: 2, type: "normal" },
    { id: "C3", row: "C", num: 3, type: "unavailable" },
    { id: "C4", row: "C", num: 4, type: "normal" },
    { id: "C5", row: "C", num: 5, type: "normal" },
    { id: "C6", row: "C", num: 6, type: "unavailable" },
    { id: "C7", row: "C", num: 7, type: "normal" },
    { id: "C8", row: "C", num: 8, type: "normal" },

    // Hàng D — ghế VIP ở giữa
    { id: "D1", row: "D", num: 1, type: "normal" },
    { id: "D2", row: "D", num: 2, type: "normal" },
    { id: "D3", row: "D", num: 3, type: "vip" },
    { id: "D4", row: "D", num: 4, type: "vip" },
    { id: "D5", row: "D", num: 5, type: "vip" },
    { id: "D6", row: "D", num: 6, type: "vip" },
    { id: "D7", row: "D", num: 7, type: "normal" },
    { id: "D8", row: "D", num: 8, type: "normal" },

    // Hàng E — ghế VIP, một số đã bị đặt
    { id: "E1", row: "E", num: 1, type: "normal" },
    { id: "E2", row: "E", num: 2, type: "unavailable" },
    { id: "E3", row: "E", num: 3, type: "vip" },
    { id: "E4", row: "E", num: 4, type: "vip" },
    { id: "E5", row: "E", num: 5, type: "unavailable" },
    { id: "E6", row: "E", num: 6, type: "vip" },
    { id: "E7", row: "E", num: 7, type: "vip" },
    { id: "E8", row: "E", num: 8, type: "normal" },

    // Hàng F — ghế VIP hàng đầu, nhiều ghế đã đặt
    { id: "F1", row: "F", num: 1, type: "unavailable" },
    { id: "F2", row: "F", num: 2, type: "vip" },
    { id: "F3", row: "F", num: 3, type: "vip" },
    { id: "F4", row: "F", num: 4, type: "unavailable" },
    { id: "F5", row: "F", num: 5, type: "unavailable" },
    { id: "F6", row: "F", num: 6, type: "vip" },
    { id: "F7", row: "F", num: 7, type: "vip" },
    { id: "F8", row: "F", num: 8, type: "unavailable" },

    // Hàng G — hàng cuối cùng, toàn ghế thường còn trống
    { id: "G1", row: "G", num: 1, type: "normal" },
    { id: "G2", row: "G", num: 2, type: "normal" },
    { id: "G3", row: "G", num: 3, type: "normal" },
    { id: "G4", row: "G", num: 4, type: "normal" },
    { id: "G5", row: "G", num: 5, type: "normal" },
    { id: "G6", row: "G", num: 6, type: "normal" },
    { id: "G7", row: "G", num: 7, type: "normal" },
    { id: "G8", row: "G", num: 8, type: "normal" },
  ]);

  const selectedSeats = seats.filter(
    (s) => s.selected
  );

  const toggleSeat = (id) => {
    const targetSeat = seats.find(
      (s) => s.id === id
    );

    if (!targetSeat) return;

    if (targetSeat.type === "unavailable") {
      return;
    }

    if (
      !targetSeat.selected &&
      selectedSeats.length >= MAX_SEATS
    ) {
      Alert.alert(
        "Limit Reached",
        `Maximum ${MAX_SEATS} seats`
      );

      return;
    }

    setSeats((prev) =>
      prev.map((seat) =>
        seat.id === id
          ? {
              ...seat,
              selected: !seat.selected,
            }
          : seat
      )
    );
  };

  const vipPrice = 85000;
  const normalPrice = 50000;

  const total = selectedSeats.reduce(
    (sum, seat) =>
      sum +
      (seat.type === "vip"
        ? vipPrice
        : normalPrice),
    0
  );

  const rows = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() =>
              navigation.goBack()
            }
          >
            <Text style={styles.backText}>
              ←
            </Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.title}>
              Select Seats
            </Text>

            <Text style={styles.sub}>
              Cinema 1 • 19:45
            </Text>
          </View>
        </View>

        <View style={styles.screenBox}>
          <View style={styles.screenGlow} />

          <Text style={styles.screenText}>
            SCREEN
          </Text>
        </View>

        <View style={styles.seatArea}>
          {rows.map((row) => (
            <View
              key={row}
              style={styles.row}
            >
              <Text style={styles.rowLabel}>
                {row}
              </Text>

              <View style={styles.seatRow}>
                {seats
                  .filter(
                    (seat) =>
                      seat.row === row
                  )
                  .map((seat) => (
                    <TouchableOpacity
                      key={seat.id}
                      style={[
                        styles.seat,

                        seat.type ===
                          "vip" &&
                          styles.vip,

                        seat.type ===
                          "unavailable" &&
                          styles.unavailable,

                        seat.selected &&
                          seat.type ===
                            "normal" &&
                          styles.selected,

                        seat.selected &&
                          seat.type ===
                            "vip" &&
                          styles.vipSelected,
                      ]}
                      onPress={() =>
                        toggleSeat(seat.id)
                      }
                    >
                      <Text
                        style={styles.seatText}
                      >
                        {seat.num}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>

              <Text style={styles.rowLabel}>
                {row}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.legend}>
          <Legend
            color="#2d2d35"
            label="Available"
          />

          <Legend
            color={COLORS.primary}
            label="Selected"
          />

          <Legend
            border
            color={COLORS.secondary}
            label="VIP"
          />

          <Legend
            color="#151515"
            label="Taken"
          />
        </View>

        <View style={styles.summary}>
          <View style={styles.rowBetween}>
            <Text style={styles.gray}>
              Seats
            </Text>

            <Text style={styles.whiteBold}>
              {selectedSeats.length > 0
                ? selectedSeats
                    .map((s) => s.id)
                    .join(", ")
                : "-"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.whiteBold}>
              Total
            </Text>

            <Text style={styles.totalPrice}>
              Rp {total.toLocaleString()}
            </Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.btn,

          selectedSeats.length ===
            0 && {
            opacity: 0.5,
          },
        ]}
        disabled={
          selectedSeats.length === 0
        }
        onPress={() =>
          navigation.navigate(
            "Checkout",
            {
              selectedSeats,
              totalPrice: total,
              movie,
            }
          )
        }
      >
        <Text style={styles.btnText}>
          Continue —{" "}
          {selectedSeats.length} Seats
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Legend = ({
  color,
  label,
  border,
}) => (
  <View style={styles.legendItem}>
    <View
      style={[
        styles.legendBox,
        border
          ? {
              borderWidth: 1,
              borderColor: color,
            }
          : {
              backgroundColor: color,
            },
      ]}
    />

    <Text style={styles.legendText}>
      {label}
    </Text>
  </View>
);

export default SeatSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      COLORS.background,
    padding: 18,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  sub: {
    color: COLORS.gray,
    marginTop: 4,
  },

  screenBox: {
    alignItems: "center",
    marginVertical: 30,
  },

  screenGlow: {
    width: "82%",
    height: 10,
    backgroundColor:
      COLORS.primary,
    borderRadius: 50,
  },

  screenText: {
    color: COLORS.gray,
    marginTop: 8,
    letterSpacing: 2,
  },

  seatArea: {
    marginTop: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:
      "space-between",
    marginBottom: 12,
  },

  rowLabel: {
    color: COLORS.gray,
    width: 20,
    fontWeight: "bold",
  },

  seatRow: {
    flexDirection: "row",
    gap: 7,
  },

  seat: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#2d2d35",
    alignItems: "center",
    justifyContent: "center",
  },

  seatText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },

  vip: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },

  unavailable: {
    backgroundColor: "#151515",
  },

  selected: {
    backgroundColor:
      COLORS.primary,
  },

  vipSelected: {
    backgroundColor:
      COLORS.secondary,
  },

  legend: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    flexWrap: "wrap",
    marginTop: 30,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  legendBox: {
    width: 15,
    height: 15,
    borderRadius: 4,
  },

  legendText: {
    color: COLORS.gray,
    fontSize: 12,
  },

  summary: {
    backgroundColor:
      COLORS.card,
    marginTop: 30,
    padding: 18,
    borderRadius: 20,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent:
      "space-between",
  },

  gray: {
    color: COLORS.gray,
  },

  whiteBold: {
    color: "#fff",
    fontWeight: "bold",
  },

  divider: {
    height: 1,
    backgroundColor:
      COLORS.border,
    marginVertical: 15,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  totalPrice: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: "bold",
  },

  btn: {
    backgroundColor:
      COLORS.primary,
    padding: 18,
    borderRadius: 22,
    alignItems: "center",
    marginTop: 15,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});