// DetailScreens.js
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loading from "../components/Loading";

const API_KEY = "5b145ccd556d0316656c843d0d4bb906";
const BASE_URL = "https://api.themoviedb.org/3";

const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting movie details:", error);
    return null;
  }
};

const DetailScreens = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const route = useRoute();
  const { movieId } = route.params;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const details = await getMovieDetails(movieId);
      setMovieDetails(details);
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <Loading />;
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
          }}
          style={styles.poster}
        />
        <Text style={styles.title}>{movieDetails.title}</Text>
        <Text style={styles.rating}>
          Rating: {movieDetails.vote_average} / 10
        </Text>
        <Text style={styles.description}>{movieDetails.overview}</Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default DetailScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 10,
  },
  poster: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
    textAlign: "justify",
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
  },
});
