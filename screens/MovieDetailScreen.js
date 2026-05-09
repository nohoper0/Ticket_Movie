import React, { useState }
from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { COLORS }
from "../utils/colors";

export default function MovieDetailScreen({
  navigation,
  route,
}) {
  const { movie } = route.params;

  const [selectedDate, setSelectedDate] =
    useState(4);

  const [selectedTime, setSelectedTime] =
    useState("19:45");

  const dates = [
    { day: "Mon", num: 5 },
    { day: "Tue", num: 6 },
    { day: "Wed", num: 7 },
    { day: "Thu", num: 8 },
    { day: "Fri", num: 9 },
    { day: "Sat", num: 10 },
    { day: "Sun", num: 11 },
  ];

  const times = [
    "10:00",
    "13:15",
    "16:30",
    "19:45",
    "22:00",
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
      >
        <View style={styles.banner}>
          <Image
            source={movie.img}
            style={styles.bannerImg}
            resizeMode="cover"
          />

          <TouchableOpacity
            style={styles.backFloating}
            onPress={() =>
              navigation.goBack()
            }
          >
            <Text style={styles.backText}>
              ←
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>
            {movie.name}
          </Text>

          <Text style={styles.meta}>
            ⭐ {movie.rating} •{" "}
            {movie.duration}
          </Text>

          <View style={styles.tags}>
            {movie.genre
              .split(", ")
              .map((g, idx) => (
                <View
                  key={idx}
                  style={styles.tag}
                >
                  <Text
                    style={styles.tagText}
                  >
                    {g}
                  </Text>
                </View>
              ))}
          </View>

          <View style={styles.section}>
            <Text
              style={styles.sectionTitle}
            >
              Synopsis
            </Text>

            <Text style={styles.desc}>
              The Avengers face their
              greatest challenge yet as
              the multiverse begins to
              collapse across realities.
            </Text>
          </View>

          <View style={styles.section}>
            <Text
              style={styles.sectionTitle}
            >
              Select Date
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={
                false
              }
            >
              <View style={styles.row}>
                {dates.map(
                  (d, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.date,

                        selectedDate ===
                          index &&
                          styles.active,
                      ]}
                      onPress={() =>
                        setSelectedDate(
                          index
                        )
                      }
                    >
                      <Text
                        style={
                          styles.dateText
                        }
                      >
                        {d.day}
                      </Text>

                      <Text
                        style={
                          styles.dateNum
                        }
                      >
                        {d.num}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text
              style={styles.sectionTitle}
            >
              Select Time
            </Text>

            <View style={styles.times}>
              {times.map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[
                    styles.time,

                    selectedTime === t &&
                      styles.active,
                  ]}
                  onPress={() =>
                    setSelectedTime(t)
                  }
                >
                  <Text
                    style={
                      styles.timeText
                    }
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate(
              "Selection",
              { movie }
            )
          }
        >
          <Text style={styles.btnText}>
            Book Now — {selectedTime}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      COLORS.background,
  },

  banner: {
    height: 420,
  },

  bannerImg: {
    width: "100%",
    height: "100%",
  },

  backFloating: {
    position: "absolute",
    top: 50,
    left: 20,

    width: 45,
    height: 45,

    borderRadius: 25,

    backgroundColor:
      "rgba(0,0,0,0.5)",

    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    color: "#fff",
    fontSize: 20,
  },

  content: {
    padding: 20,
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  meta: {
    color: COLORS.gray,
    marginTop: 10,
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 18,
  },

  tag: {
    backgroundColor:
      COLORS.card,

    paddingHorizontal: 14,
    paddingVertical: 8,

    borderRadius: 20,

    marginRight: 10,
    marginBottom: 10,
  },

  tagText: {
    color: "#fff",
    fontSize: 12,
  },

  section: {
    marginTop: 25,
  },

  sectionTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 15,
  },

  desc: {
    color: COLORS.gray,
    lineHeight: 24,
  },

  row: {
    flexDirection: "row",
  },

  date: {
    width: 70,

    backgroundColor:
      COLORS.card,

    paddingVertical: 14,

    borderRadius: 18,

    alignItems: "center",

    marginRight: 12,
  },

  active: {
    backgroundColor:
      COLORS.primary,
  },

  dateText: {
    color: "#fff",
    fontSize: 12,
  },

  dateNum: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },

  times: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  time: {
    backgroundColor:
      COLORS.card,

    paddingHorizontal: 20,
    paddingVertical: 14,

    borderRadius: 16,

    marginRight: 12,
    marginBottom: 12,
  },

  timeText: {
    color: "#fff",
  },

  bottom: {
    padding: 20,
  },

  btn: {
    backgroundColor:
      COLORS.primary,

    padding: 18,

    borderRadius: 20,

    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});