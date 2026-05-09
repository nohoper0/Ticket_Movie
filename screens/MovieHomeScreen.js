import React, { useEffect, useRef, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";

import movies from "../data";

import { COLORS } from "../utils/colors";

// Các phim hiển thị trên banner tự cuộn (lấy 4 phim đầu)
const BANNER_MOVIES = [0, 1, 2, 3];

export default function MovieHomeScreen({
  navigation,
}) {
  // ── AUTO-SCROLL BANNER ──────────────────────────────
  const [bannerIndex, setBannerIndex] = useState(0);
  const bannerRef = useRef(null);

  useEffect(() => {
    // Tự cuộn mỗi 3 giây
    const timer = setInterval(() => {
      setBannerIndex((prev) => {
        const next = (prev + 1) % BANNER_MOVIES.length;
        bannerRef.current?.scrollToIndex({
          index: next,
          animated: true,
        });
        return next;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const renderCard = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("Detail", {
          movie: item,
        })
      }
    >
      <View style={styles.card}>
        <Image
          source={item.img}
          style={styles.cardImg}
          resizeMode="cover"
        />

        <View style={styles.info}>
          <Text
            style={styles.movieTitle}
            numberOfLines={1}
          >
            {item.name}
          </Text>

          <Text style={styles.genre}>
            {item.genre}
          </Text>

          <Text style={styles.rating}>
            ⭐ {item.rating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.top}>
            <View>
              <Text style={styles.small}>
                Good Evening,
              </Text>

              <Text style={styles.user}>
                Movie Lover 🍿
              </Text>
            </View>

            <View style={styles.notify}>
              <Text
                style={{
                  color: COLORS.text,
                }}
              >
                🔔
              </Text>
            </View>
          </View>

          <View style={styles.rowInfo}>
            <Text style={styles.location}>
              📍 Yogyakarta
            </Text>

            <Text style={styles.balance}>
              💰 Rp 150.000
            </Text>
          </View>
        </View>

        {/* ── BANNER TỰ CUỘN ─────────────────────────── */}
        <View style={styles.banner}>
          <FlatList
            ref={bannerRef}
            data={BANNER_MOVIES}
            horizontal
            pagingEnabled
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(i) => i.toString()}
            getItemLayout={(_, index) => ({
              length: 340,
              offset: 340 * index,
              index,
            })}
            renderItem={({ item: idx }) => {
              const m = movies[idx];
              return (
                <View style={styles.bannerSlide}>
                  <Image
                    source={m.img}
                    style={styles.bannerImg}
                    resizeMode="cover"
                  />
                  <View style={styles.overlay}>
                    <Text style={styles.bannerTag}>IMAX</Text>
                    <Text style={styles.bannerTitle}>{m.name}</Text>
                    <Text style={styles.rating}>
                      ⭐ {m.rating} | {m.genre}
                    </Text>
                  </View>
                </View>
              );
            }}
          />

          {/* Dot indicator */}
          <View style={styles.dots}>
            {BANNER_MOVIES.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  bannerIndex === i && styles.dotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* NOW PLAYING */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text style={styles.h3}>
              Now Playing
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  "Search"
                )
              }
            >
              <Text style={styles.seeAll}>
                See All →
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={movies}
            renderItem={renderCard}
            keyExtractor={(item) =>
              item.id.toString()
            }
            horizontal
            showsHorizontalScrollIndicator={
              false
            }
            contentContainerStyle={{
              paddingTop: 15,
              paddingBottom: 5,
            }}
          />
        </View>

        {/* PROMO */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text style={styles.h3}>
              Promo
            </Text>

            <Text style={styles.seeAll}>
              See All →
            </Text>
          </View>

          <View style={styles.promo}>
            <Text style={styles.promoTag}>
              50% OFF
            </Text>

            <Text
              style={styles.promoTitle}
            >
              Weekend Special
            </Text>

            <Text
              style={styles.promoText}
            >
              Get 50% off on all IMAX
              tickets
            </Text>

            <TouchableOpacity
              style={styles.promoBtn}
            >
              <Text
                style={styles.promoBtnText}
              >
                Claim Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* COMING SOON */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text style={styles.h3}>
              Coming Soon
            </Text>

            <Text style={styles.seeAll}>
              See All →
            </Text>
          </View>

          {movies.slice(0, 3).map((item) => (
            <View
              key={item.id}
              style={styles.coming}
            >
              <Image
                source={item.img}
                style={styles.comingImg}
                resizeMode="cover"
              />

              <View style={styles.comingInfo}>
                <Text
                  style={styles.comingTitle}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>

                <Text
                  style={styles.comingText}
                >
                  {item.genre}
                </Text>

                <Text
                  style={styles.comingText}
                >
                  ⭐ {item.rating}
                </Text>

                <Text
                  style={styles.comingText}
                >
                  📅 Jun 2026
                </Text>
              </View>

              <TouchableOpacity
                style={styles.remind}
              >
                <Text
                  style={styles.remindText}
                >
                  Remind
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View
          style={{ height: 30 }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      COLORS.background,
  },

  header: {
    padding: 20,
  },

  top: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  small: {
    color: COLORS.gray,
  },

  user: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
  },

  notify: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor:
      COLORS.card,
    alignItems: "center",
    justifyContent: "center",
  },

  rowInfo: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    marginTop: 18,
  },

  location: {
    backgroundColor:
      COLORS.card,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    color: COLORS.text,
    fontSize: 12,
  },

  balance: {
    backgroundColor:
      "#312217",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "600",
  },

  banner: {
    height: 230,
    marginHorizontal: 20,
    borderRadius: 25,
    overflow: "hidden",
  },

  // Mỗi slide trong banner
  bannerSlide: {
    width: 340,
    height: 230,
    borderRadius: 25,
    overflow: "hidden",
  },

  bannerImg: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },

  // Dot indicator
  dots: {
    position: "absolute",
    bottom: 10,
    right: 15,
    flexDirection: "row",
    gap: 5,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.4)",
  },

  dotActive: {
    backgroundColor: "#fff",
    width: 18,
  },

  bannerTag: {
    color: COLORS.primary,
    fontWeight: "bold",
    marginBottom: 8,
  },

  bannerTitle: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: "bold",
  },

  rating: {
    color: "#facc15",
    marginTop: 5,
  },

  section: {
    marginTop: 30,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  h3: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "bold",
  },

  seeAll: {
    color: COLORS.primary,
    fontWeight: "600",
  },

  card: {
    width: 150,
    marginRight: 15,
  },

  cardImg: {
    width: 150,
    height: 220,
    borderRadius: 20,
  },

  info: {
    marginTop: 10,
  },

  movieTitle: {
    color: COLORS.text,
    fontWeight: "bold",
    fontSize: 14,
  },

  genre: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 4,
  },

  promo: {
    marginTop: 15,
    backgroundColor:
      COLORS.secondary,
    borderRadius: 25,
    padding: 22,
  },

  promoTag: {
    color: "#fff",
    fontWeight: "600",
  },

  promoTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },

  promoText: {
    color: "#ddd",
    marginTop: 8,
    lineHeight: 20,
  },

  promoBtn: {
    marginTop: 18,
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },

  promoBtnText: {
    fontWeight: "bold",
  },

  coming: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor:
      COLORS.card,
    borderRadius: 22,
    padding: 12,
    marginTop: 15,
  },

  comingImg: {
    width: 80,
    height: 110,
    borderRadius: 14,
  },

  comingInfo: {
    flex: 1,
    marginLeft: 15,
  },

  comingTitle: {
    color: COLORS.text,
    fontWeight: "bold",
    fontSize: 15,
  },

  comingText: {
    color: COLORS.gray,
    marginTop: 6,
    fontSize: 12,
  },

  remind: {
    backgroundColor:
      COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },

  remindText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});