import React, { useState }
from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import movies from "../data";

import { COLORS }
from "../utils/colors";

export default function SearchScreen({
  navigation,
}) {
  const [keyword, setKeyword] =
    useState("");

  const [activeCat, setActiveCat] =
    useState("All");

  const categories = [
    "All",
    "Action",
    "Sci-Fi",
    "Horror",
    "Drama",
    "Adventure",
    "Animation",
    "Family",
    "Crime",
  ];

  const filtered = movies.filter(
    (m) => {
      const matchName =
        m.name
          .toLowerCase()
          .includes(
            keyword.toLowerCase()
          );

      const matchCat =
        activeCat === "All" ||
        m.genre.includes(activeCat);

      return matchName && matchCat;
    }
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate(
          "Detail",
          { movie: item }
        )
      }
    >
      <Image
        source={item.img}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.rating}>
        ⭐ {item.rating}
      </Text>

      <Text
        style={styles.title}
        numberOfLines={1}
      >
        {item.name}
      </Text>

      <Text
        style={styles.genre}
        numberOfLines={1}
      >
        {item.genre}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
      >
        <Text style={styles.h1}>
          Search
        </Text>

        <Text style={styles.subtitle}>
          Find your favorite movies
        </Text>

        <View style={styles.searchBar}>
          <Text
            style={{ color: "#fff" }}
          >
            🔍
          </Text>

          <TextInput
            placeholder="Search movies..."
            placeholderTextColor={
              COLORS.gray
            }
            style={styles.input}
            value={keyword}
            onChangeText={setKeyword}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
          style={{ marginBottom: 10 }}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.cat,

                activeCat === cat &&
                  styles.activeCat,
              ]}
              onPress={() =>
                setActiveCat(cat)
              }
            >
              <Text
                style={{
                  color:
                    activeCat === cat
                      ? "#fff"
                      : COLORS.gray,
                }}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.resultText}>
          {filtered.length} results
          found
        </Text>

        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={(item) =>
            item.id.toString()
          }
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
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

    padding: 20,
  },

  h1: {
    color: "#fff",

    fontSize: 28,

    fontWeight: "bold",
  },

  subtitle: {
    color: COLORS.gray,

    marginTop: 5,

    marginBottom: 20,
  },

  searchBar: {
    backgroundColor:
      COLORS.card,

    borderRadius: 18,

    paddingHorizontal: 15,

    paddingVertical: 14,

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 20,
  },

  input: {
    marginLeft: 10,

    flex: 1,

    color: "#fff",
  },

  cat: {
    backgroundColor:
      COLORS.card,

    paddingHorizontal: 18,

    paddingVertical: 10,

    borderRadius: 30,

    marginRight: 10,
  },

  activeCat: {
    backgroundColor:
      COLORS.primary,
  },

  resultText: {
    color: COLORS.gray,

    marginBottom: 15,
  },

  card: {
    flex: 1,

    backgroundColor:
      COLORS.card,

    margin: 6,

    borderRadius: 20,

    padding: 10,
  },

  image: {
    width: "100%",

    height: 220,

    borderRadius: 15,
  },

  rating: {
    color: "#facc15",

    marginTop: 8,

    fontSize: 12,
  },

  title: {
    color: "#fff",

    fontWeight: "bold",

    marginTop: 5,
  },

  genre: {
    color: COLORS.gray,

    marginTop: 3,

    fontSize: 12,
  },
});