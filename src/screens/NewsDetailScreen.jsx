import { View, Text, Image, TouchableOpacity, Linking, ScrollView } from "react-native";

export default function NewsDetailScreen({ route }) {
  const { news } = route.params;

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>
      <Image source={{ uri: news.image }} style={{ width: "100%", height: 220, borderRadius: 8 }} />

      <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 16 }}>
        {news.title}
      </Text>

      <Text style={{ marginTop: 10, fontSize: 15 }}>
        {news.summary}
      </Text>

      <TouchableOpacity
        onPress={() => Linking.openURL(news.source_url)}
        style={{
          backgroundColor: "#0057ff",
          padding: 12,
          borderRadius: 8,
          marginTop: 18,
        }}
      >
        <Text style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}>
          Ver fuente original
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
