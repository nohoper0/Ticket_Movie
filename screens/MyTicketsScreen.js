import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import { useTickets } from "../context/TicketContext";

import { COLORS } from "../utils/colors";

const MyTicketsScreen = ({ navigation }) => {
  const [tab, setTab] = useState("upcoming");

  const { tickets } = useTickets();

  // ─── PHÂN LOẠI VÉ ───────────────────────────────────────────────
  // Upcoming: movieDate còn trong tương lai
  // Used:     movieDate đã qua
  const now = new Date();

  const upcomingTickets = tickets.filter(
    (t) => t.movieDate && new Date(t.movieDate) > now
  );

  const usedTickets = tickets.filter(
    (t) => !t.movieDate || new Date(t.movieDate) <= now
  );

  // Danh sách hiển thị theo tab đang chọn
  const displayTickets =
    tab === "upcoming" ? upcomingTickets : usedTickets;

  // ─── BADGE theo loại vé ─────────────────────────────────────────
  const TicketBadge = ({ ticket }) => {
    const isUpcoming =
      ticket.movieDate && new Date(ticket.movieDate) > now;

    return isUpcoming ? (
      // Vé sắp chiếu — xanh lá
      <View style={styles.badgeUpcoming}>
        <Text style={styles.badgeUpcomingText}>🎬 UPCOMING</Text>
      </View>
    ) : (
      // Vé đã chiếu — xám
      <View style={styles.badgeUsed}>
        <Text style={styles.badgeUsedText}>✓ USED</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* ── HEADER ─────────────────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.title}>My Tickets</Text>
          <Text style={styles.subtitle}>Your movie bookings</Text>
        </View>

        {/* ── TABS ───────────────────────────────────────── */}
        <View style={styles.tabs}>
          {/* Tab Upcoming */}
          <TouchableOpacity
            style={[styles.tabBtn, tab === "upcoming" && styles.activeTab]}
            onPress={() => setTab("upcoming")}
            activeOpacity={0.8}
          >
            <Text
              style={tab === "upcoming" ? styles.activeText : styles.tabText}
            >
              {`Upcoming${upcomingTickets.length > 0 ? "  (" + upcomingTickets.length + ")" : ""}`}
            </Text>
          </TouchableOpacity>

          {/* Tab Used */}
          <TouchableOpacity
            style={[styles.tabBtn, tab === "used" && styles.activeTabUsed]}
            onPress={() => setTab("used")}
            activeOpacity={0.8}
          >
            <Text style={tab === "used" ? styles.activeText : styles.tabText}>
              {`Used${usedTickets.length > 0 ? "  (" + usedTickets.length + ")" : ""}`}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── EMPTY STATE ────────────────────────────────── */}
        {displayTickets.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>
              {tab === "upcoming" ? "🎟️" : "🎬"}
            </Text>

            <Text style={styles.emptyTitle}>
              {tab === "upcoming"
                ? "No Upcoming Tickets"
                : "No Used Tickets"}
            </Text>

            <Text style={styles.emptySub}>
              {tab === "upcoming"
                ? "Book a movie to see your upcoming tickets here"
                : "Tickets that have passed will appear here"}
            </Text>

            {/* Chỉ hiện nút Browse khi ở tab upcoming */}
            {tab === "upcoming" && (
              <TouchableOpacity
                style={styles.bookBtn}
                onPress={() =>
                  navigation.navigate("HomeTab", { screen: "Home" })
                }
                activeOpacity={0.85}
              >
                <Text style={styles.bookText}>Browse Movies</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          /* ── DANH SÁCH VÉ ─────────────────────────────── */
          <View style={styles.list}>
            {displayTickets.map((ticket, index) => (
              <TouchableOpacity
                key={ticket.id || index}
                style={[
                  styles.card,
                  // Viền xanh lá cho upcoming, xám cho used
                  tab === "upcoming"
                    ? styles.cardUpcoming
                    : styles.cardUsed,
                ]}
                activeOpacity={0.9}
              >
                {/* Ảnh poster — mờ nếu là vé đã dùng */}
                <Image
                  source={ticket.movie?.img}
                  style={[
                    styles.poster,
                    tab === "used" && styles.posterUsed,
                  ]}
                  resizeMode="cover"
                />

                <View style={styles.info}>
                  {/* Tên phim */}
                  <Text numberOfLines={1} style={styles.movie}>
                    {ticket.movie?.name}
                  </Text>

                  {/* Ngày chiếu */}
                  <Text style={styles.gray}>📅 {ticket.date || "—"}</Text>

                  {/* Giờ chiếu */}
                  <Text style={styles.gray}>🕐 {ticket.time || "19:45"}</Text>

                  {/* Ghế */}
                  <Text style={styles.gray}>
                    🎟 {ticket.seats?.map((s) => s.id).join(", ")}
                  </Text>

                  {/* Tổng tiền */}
                  <Text style={styles.gray}>
                    💰 Rp {ticket.total?.toLocaleString()}
                  </Text>

                  {/* Badge + nút Details */}
                  <View style={styles.bottomRow}>
                    <TicketBadge ticket={ticket} />

                    <TouchableOpacity
                      style={styles.detailBtn}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.detailText}>Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MyTicketsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // ── HEADER ──────────────────────────────────────────
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    color: COLORS.gray,
    marginTop: 5,
    fontSize: 14,
  },

  // ── TABS ────────────────────────────────────────────
  tabs: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 30,
    padding: 5,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },

  // Tab Upcoming active — màu cam chính
  activeTab: {
    backgroundColor: COLORS.primary,
  },

  // Tab Used active — xám tối
  activeTabUsed: {
    backgroundColor: "#555",
  },

  tabText: {
    color: COLORS.gray,
    fontWeight: "600",
  },

  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // ── CARD ────────────────────────────────────────────
  list: {
    padding: 20,
  },

  card: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
  },

  // Viền xanh lá nhạt cho vé sắp chiếu
  cardUpcoming: {
    borderColor: "rgba(74,222,128,0.35)",
  },

  // Viền xám cho vé đã dùng
  cardUsed: {
    borderColor: COLORS.border,
  },

  poster: {
    width: 95,
    height: 140,
    borderRadius: 18,
  },

  // Poster mờ khi vé đã dùng
  posterUsed: {
    opacity: 0.4,
  },

  info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
  },

  movie: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },

  gray: {
    color: COLORS.gray,
    marginTop: 5,
    fontSize: 12,
    lineHeight: 18,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  // ── BADGE UPCOMING ──────────────────────────────────
  badgeUpcoming: {
    backgroundColor: "rgba(74,222,128,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(74,222,128,0.3)",
  },

  badgeUpcomingText: {
    color: "#4ade80",
    fontSize: 10,
    fontWeight: "bold",
  },

  // ── BADGE USED ──────────────────────────────────────
  badgeUsed: {
    backgroundColor: "rgba(150,150,150,0.12)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(150,150,150,0.2)",
  },

  badgeUsedText: {
    color: "#999",
    fontSize: 10,
    fontWeight: "bold",
  },

  // ── DETAIL BUTTON ────────────────────────────────────
  detailBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },

  detailText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  // ── EMPTY STATE ──────────────────────────────────────
  empty: {
    marginTop: 100,
    alignItems: "center",
    paddingHorizontal: 30,
  },

  emptyIcon: {
    fontSize: 65,
  },

  emptyTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },

  emptySub: {
    color: COLORS.gray,
    marginTop: 10,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
  },

  bookBtn: {
    marginTop: 28,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 28,
    paddingVertical: 15,
    borderRadius: 30,
  },

  bookText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
