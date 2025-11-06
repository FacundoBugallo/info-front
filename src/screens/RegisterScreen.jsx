import { useState } from "react";
import { registerUser } from "../config/api";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleRegister = async () => {
    const res = await registerUser(form);
    if (res.detail) {
      setError(res.detail);
      return;
    }
    navigation.navigate("Login");
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Nombre" onChangeText={(v) => setForm({ ...form, name: v })} />
      <TextInput placeholder="Email" onChangeText={(v) => setForm({ ...form, email: v })} />
      <TextInput placeholder="Contraseña" secureTextEntry onChangeText={(v) => setForm({ ...form, password: v })} />

      <Button title="Crear cuenta" onPress={handleRegister} />

      <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ marginTop: 15 }}>
        <Text style={{ textAlign: "center", color: "blue" }}>
          Ya tengo una cuenta. Iniciar sesión
        </Text>
      </TouchableOpacity>

      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
    </View>
  );
}
