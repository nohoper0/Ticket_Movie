import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";

export default function MovieDetailScreen({ navigation, route }) {
  const { movie } = route.params;

  const [selectedDate, setSelectedDate] = useState(4);
  const [selectedTime, setSelectedTime] = useState("13:15");

  const dates = [
    { day: "Mon", num: 5 },
    { day: "Tue", num: 6 },
    { day: "Wed", num: 7 },
    { day: "Thu", num: 8 },
    { day: "Fri", num: 9 },
    { day: "Sat", num: 10 },
    { day: "Sun", num: 11 }
  ];

  const times = ["10:00", "13:15", "16:30", "19:45", "22:00"];

  return (
    <View style={styles.container}>
      <ScrollView>

        <View style={styles.banner}>
          <Image source={movie.img} style={styles.bannerImg} />

          <View style={styles.play}>
            <Text style={{ color: "#fff" }}>▶</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{movie.name}</Text>
          <Text style={styles.meta}>⭐ {movie.rating} | 2h 45m | 2025</Text>

          <View style={styles.tags}>
            {movie.genre.split(", ").map((g, idx) => (
              <Text key={idx} style={styles.tag}>{g}</Text>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Synopsis</Text>
            <Text style={styles.desc}>
              The Avengers face their greatest challenge yet as the multiverse begins to collapse...
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Cinema</Text>
            <View style={styles.cinema}><Text style={{ color: "#fff" }}>XXI Grand Indonesia</Text></View>
            <View style={styles.cinema}><Text style={{ color: "#fff" }}>CGV Blitz Megamall</Text></View>
            <View style={styles.cinema}><Text style={{ color: "#fff" }}>Cinépolis Kota Kasablanka</Text></View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Date</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.row}>
                {dates.map((d, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.date, selectedDate === index && styles.active]}
                    onPress={() => setSelectedDate(index)}
                  >
                    <Text style={styles.dateText}>{d.day}</Text>
                    <Text style={styles.dateText}>{d.num}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Time</Text>

            <View style={styles.times}>
              {times.map((t, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.time, selectedTime === t && styles.active]}
                  onPress={() => setSelectedTime(t)}
                >
                  <Text style={styles.timeText}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Selection", { movie })}
        >
          <Text style={styles.btnText}>Book Now — {selectedTime}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backFloating} onPress={() => navigation.goBack()}>
        <Text style={{ color: "#fff", fontSize: 18 }}>←</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d0d0d" },
  banner: { position: "relative" },
  bannerImg: { width: "100%", height: 250 },
  play: { position: "absolute", top: "45%", left: "45%", backgroundColor: "rgba(255,255,255,0.2)", padding: 20, borderRadius: 50 },
  content: { padding: 15 },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  meta: { color: "#aaa", marginVertical: 10 },
  tags: { flexDirection: "row", gap: 10, marginBottom: 10 },
  tag: { backgroundColor: "#1c1c1c", color: "#fff", padding: 6, borderRadius: 20 },
  section: { marginTop: 15 },
  sectionTitle: { color: "#fff", fontWeight: "bold", marginBottom: 10 },
  desc: { color: "#aaa" },
  cinema: { backgroundColor: "#1c1c1c", padding: 15, borderRadius: 10, marginBottom: 10 },
  row: { flexDirection: "row", gap: 10 },
  date: { backgroundColor: "#1c1c1c", padding: 10, borderRadius: 10, alignItems: "center", width: 60 },
  dateText: { color: "#fff" },
  time: { backgroundColor: "#1c1c1c", padding: 10, borderRadius: 10 },
  timeText: { color: "#fff" },
  times: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  active: { backgroundColor: "#ff6b2c" },
  bottom: { padding: 15, backgroundColor: "#0d0d0d" },
  btn: { backgroundColor: "#ff6b2c", padding: 15, borderRadius: 30, alignItems: "center" },
  btnText: { color: "#fff", fontSize: 16 },
  backFloating: {
    position: "absolute",
    top: 40,
    left: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 50,
  }
});
