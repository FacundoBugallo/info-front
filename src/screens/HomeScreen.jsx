import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";

// Datos mockeados
const portfolio = {
  total: 15230.45,
  changePercent: 2.3,
  changeValue: 345.12,
};

const watchlist = [
  { symbol: "AAPL", price: 186.23, change: 1.2 },
  { symbol: "TSLA", price: 243.11, change: -0.8 },
  { symbol: "BTC", price: 69200, change: 3.4 },
];

const noticias = [
  {
    id: 1,
    titulo: "Mercado reacciona a datos de inflación",
    imagen:
      "https://images.pexels.com/photos/315948/pexels-photo-315948.jpeg?auto=compress",
  },
  {
    id: 2,
    titulo: "El S&P 500 toca máximos históricos",
    imagen:
      "https://images.pexels.com/photos/677041/pexels-photo-677041.jpeg?auto=compress",
  },
];

const mercados = [
  { name: "S&P 500", value: 5200.32, change: 0.5 },
  { name: "Nasdaq", value: 16980.11, change: 1.1 },
  { name: "Bitcoin", value: 69200, change: 3.4 },
];

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* 1. Portafolio */}
      <View style={styles.card}>
        <Text style={styles.title}>Portafolio</Text>
        <Text style={styles.total}>${portfolio.total.toLocaleString()}</Text>
        <Text
          style={[
            styles.change,
            { color: portfolio.changePercent >= 0 ? "green" : "red" },
          ]}
        >
          {portfolio.changePercent >= 0 ? "+" : ""}
          {portfolio.changePercent}% (${portfolio.changeValue})
        </Text>
      </View>

      {/* 2. Watchlist */}
      <View style={styles.card}>
        <Text style={styles.title}>Activos Destacados</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {watchlist.map((w) => (
            <View key={w.symbol} style={styles.assetCard}>
              <Text style={styles.assetSymbol}>{w.symbol}</Text>
              <Text style={styles.assetPrice}>${w.price}</Text>
              <Text
                style={{
                  color: w.change >= 0 ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {w.change >= 0 ? "+" : ""}
                {w.change}%
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* 3. Atajos */}
      <View style={styles.card}>
        <Text style={styles.title}>Accesos Rápidos</Text>
        <View style={styles.quickRow}>
          <QuickButton title="Portafolio" onPress={() => {}} />
          <QuickButton title="Mercados" onPress={() => {}} />
          <QuickButton
            title="Analizar con IA"
            onPress={() => navigation.navigate("Bot")}
          />
          <QuickButton
            title="Noticias"
            onPress={() => navigation.navigate("News")}
          />
        </View>
      </View>

      {/* 4. Noticias */}
      <View style={styles.card}>
        <Text style={styles.title}>Noticias Destacadas</Text>
        {noticias.map((n) => (
          <TouchableOpacity
            key={n.id}
            style={styles.newsItem}
            onPress={() =>
              navigation.navigate("NewsDetail", { noticiaId: n.id })
            }
          >
            <Image source={{ uri: n.imagen }} style={styles.newsImage} />
            <Text style={styles.newsText}>{n.titulo}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => navigation.navigate("News")}
          style={styles.moreButton}
        >
          <Text style={styles.moreText}>Ver más</Text>
        </TouchableOpacity>
      </View>

      {/* 5. Mercados globales */}
      <View style={styles.card}>
        <Text style={styles.title}>Mercados Globales</Text>
        {mercados.map((m) => (
          <View key={m.name} style={styles.marketRow}>
            <Text style={styles.marketName}>{m.name}</Text>
            <View style={styles.marketRight}>
              <Text style={styles.marketValue}>{m.value}</Text>
              <Text
                style={{
                  color: m.change >= 0 ? "green" : "red",
                  fontWeight: "bold",
                  marginLeft: 10,
                }}
              >
                {m.change >= 0 ? "+" : ""}
                {m.change}%
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* 6. Bot */}
      <TouchableOpacity
        style={styles.cardBot}
        onPress={() => navigation.navigate("Bot")}
      >
        <Text style={styles.title}>Asistente de Inversión</Text>
        <Text style={styles.botText}>
          Analiza un gráfico y obtén señales de compra y venta.
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Componente botón rápido
function QuickButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.quickButton} onPress={onPress}>
      <Text style={styles.quickButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2", padding: 10 },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  cardBot: {
    backgroundColor: "#e8f0ff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  total: { fontSize: 28, fontWeight: "bold", marginTop: 10 },
  change: { fontSize: 16, marginTop: 5 },

  // Watchlist
  assetCard: {
    width: 100,
    padding: 12,
    backgroundColor: "#fafafa",
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
  },
  assetSymbol: { fontWeight: "bold", fontSize: 16 },
  assetPrice: { marginTop: 5, fontSize: 14 },

  // Quick buttons
  quickRow: { flexDirection: "row", justifyContent: "space-between" },
  quickButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 10,
    width: "23%",
    alignItems: "center",
  },
  quickButtonText: { fontSize: 12, fontWeight: "bold" },

  // Noticias
  newsItem: { flexDirection: "row", marginBottom: 10 },
  newsImage: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  newsText: { flex: 1, fontSize: 14, fontWeight: "500" },
  moreButton: { marginTop: 8 },
  moreText: { color: "#3366ff", fontWeight: "bold" },

  // Mercados
  marketRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  marketName: { fontSize: 16 },
  marketRight: { flexDirection: "row", alignItems: "center" },
  marketValue: { fontSize: 16, fontWeight: "bold" },

  botText: { marginTop: 5, fontSize: 14 },
});
