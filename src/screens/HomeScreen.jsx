import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getProfile } from "../config/api";

export default function HomeScreen({ route, navigation }) {
  const { token } = route.params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getProfile(token);
      setUser(data);
    })();
  }, []);

  if (!user) return <Text>Cargando...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text>ID: {user.id}</Text>
      <Text>Nombre: {user.name}</Text>
      <Text>Email: {user.email}</Text>

      {/* Botón para ir a noticias */}
      <Text
        style={{ marginTop: 20, color: "blue" }}
        onPress={() => navigation.navigate("News")}
      >
        Ver Noticias
      </Text>
    </View>
  );
}
