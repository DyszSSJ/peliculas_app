import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular",
        {
          params: {
            api_key: "5b145ccd556d0316656c843d0d4bb906",
            language: "en-US",
            page: 1,
          },
        }
      );
      setData(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderMovieCard = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Detail", { movieId: item.id });
        }}
      >
        <Animatable.View animation="fadeInUp" style={styles.card}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
            style={styles.poster}
          />
          <View style={styles.info}>
            <Text style={styles.title}>{item.original_title}</Text>
            <Text style={styles.overview} numberOfLines={3}>
              {item.overview}
            </Text>
          </View>
        </Animatable.View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView extraScrollHeight={10} snapToAlignment="center">
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Peliculas populares</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovieCard}
          contentContainerStyle={styles.movieList}
          showsVerticalScrollIndicator={false}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  movieList: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 5,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  overview: {
    fontSize: 12,
    color: "#555555",
    marginTop: 5,
  },
});
