import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const API_KEY = "5b145ccd556d0316656c843d0d4bb906";
const BASE_URL = "https://api.themoviedb.org/3";

const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        query: query,
        page: 1,
        include_adult: false,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

const SearchScreens = () => {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();

  const handleSearch = async (text) => {
    setSearchText(text);
    const results = await searchMovies(text);
    setMovies(results);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 10,
      }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Detail", { movieId: item.id });
          }}
          style={styles.movieItem}
        >
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
            style={styles.poster}
          />
          <Text style={styles.movieTitle}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <MaterialIcons
          name="search"
          size={24}
          color="#777"
          style={styles.icon}
        />
        <TextInput
          placeholder="Search"
          value={searchText}
          onChangeText={handleSearch}
          style={styles.input}
        />
      </View>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default SearchScreens;

const styles = StyleSheet.create({
  group: {
    display: "flex",
    lineHeight: 28,
    alignItems: "center",
    position: "relative",
    maxWidth: 400,
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
  },
  input: {
    height: 40,
    lineHeight: 28,
    padding: 0,
    paddingHorizontal: 10,
    width: "100%",
    paddingLeft: 30,
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 8,
    outlineColor: "transparent",
    backgroundColor: "#D9E8D8",
    color: "#0d0c22",
    shadowColor: "#C1D9BF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
    transitionDuration: 300,
  },

  placeholder: {
    color: "#777",
  },

  icon: {
    position: "absolute",
    left: 10,
    color: "#777",
    width: 10,
    height: 10,
  },

  movieItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  poster: {
    width: 60,
    height: 90,
    marginRight: 10,
  },

  movieTitle: {
    fontSize: 16,
    width: "80%",
  },
});
