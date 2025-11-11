import { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { fetchNews } from "../config/newsApi";

export default function NewsListScreen({ navigation }) {
  const [news, setNews] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const loadNews = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await fetchNews(offset, limit);
      setNews((prev) => [...prev, ...data]);
      setOffset(offset + limit);
    } catch (err) {
      console.log("Error cargando noticias:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("NewsDetail", { news: item })}
      style={{ flexDirection: "row", marginBottom: 16 }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: 90, height: 90, borderRadius: 8, marginRight: 12 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={{ color: "#555" }} numberOfLines={2}>
          {item.summary}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>
      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        onEndReached={loadNews}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator style={{ marginVertical: 16 }} /> : null
        }
      />
    </View>
  );
}
