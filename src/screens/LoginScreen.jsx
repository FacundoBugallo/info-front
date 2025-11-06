import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { loginUser } from "../config/api";

export default function LoginScreen({ navigation }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const data = await loginUser(form);
    if (data.detail) {
      setError(data.detail);
      return;
    }
    navigation.navigate("Home", { token: data.access_token });
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" onChangeText={(v) => setForm({ ...form, email: v })} />
      <TextInput placeholder="Contraseña" secureTextEntry onChangeText={(v) => setForm({ ...form, password: v })} />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      {error.length > 0 && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
}
