import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";

import movies from "../data";

export default function SearchScreen({ navigation }) {
  const [keyword, setKeyword] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  const categories = ["All", "Action", "Sci-Fi", "Horror", "Drama"];

  const filtered = movies.filter((m) => {
    const matchName = m.name.toLowerCase().includes(keyword.toLowerCase());
    const matchCat = activeCat === "All" || m.genre.includes(activeCat);
    return matchName && matchCat;
  });

  const renderItem = ({ item }) => (
    // ✅ SearchScreen là tab screen, cần navigate qua HomeTab rồi mới đến Detail
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("HomeTab", {
          screen: "Detail",
          params: { movie: item },
        })
      }
    >
      <View style={styles.card}>
        <Image source={item.img} style={styles.image} />
        <Text style={styles.rating}>⭐ {item.rating}</Text>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.genre}>{item.genre}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView>

        <Text style={styles.h1}>Search</Text>
        <Text style={styles.subtitle}>Find your favorite movies</Text>

        <View style={styles.searchBar}>
          <Text>🔍</Text>
          <TextInput
            placeholder="Search movies, genres..."
            placeholderTextColor="#aaa"
            style={styles.input}
            value={keyword}
            onChangeText={setKeyword}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.cat, activeCat === cat && styles.activeCat]}
              onPress={() => setActiveCat(cat)}
            >
              <Text style={{ color: activeCat === cat ? "#fff" : "#aaa" }}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.resultText}>{filtered.length} results found</Text>

        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={{ marginTop: 10 }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d0d0d", padding: 20 },
  h1: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  subtitle: { color: "#aaa", marginBottom: 15 },
  searchBar: { backgroundColor: "#1c1c1c", padding: 12, borderRadius: 15, flexDirection: "row", alignItems: "center", marginBottom: 15 },
  input: { marginLeft: 10, color: "#fff", flex: 1 },
  cat: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, backgroundColor: "#1c1c1c", marginRight: 10 },
  activeCat: { backgroundColor: "#ff6b2c" },
  resultText: { color: "#aaa", fontSize: 14 },
  card: { flex: 1, backgroundColor: "#1c1c1c", borderRadius: 15, padding: 10, margin: 5 },
  image: { width: "100%", height: 120, borderRadius: 10 },
  rating: { color: "gold", marginTop: 5, fontSize: 13 },
  title: { fontWeight: "bold", color: "#fff", marginTop: 5 },
  genre: { fontSize: 12, color: "#aaa" }
});
