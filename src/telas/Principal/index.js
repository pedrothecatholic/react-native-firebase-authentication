import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Cabecalho from "../../componentes/Cabecalho";
import Produto from "../../componentes/Produtos";
import { auth } from "../../config/firebase";

import estilos from "./estilos";

export default function Principal({ navigation }) {
  const usuario = auth.currentUser;

  function deslogar() {
    auth.signOut();
    navigation.replace();
  }

  useEffect(() => {
    const estadoUsuario = auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        navigation.replace("Principal");
      }
    });
    return () => estadoUsuario();
  }, []);

  return (
    <View style={estilos.container}>
      <Cabecalho logout={deslogar} />
      <Text style={estilos.texto}>Usuário: {usuario.email}</Text>

      <Produto nome="Tênis" preco="200,00" />
      <Produto nome="Camisa" preco="100,00" />
      <Produto nome="Suplementos" preco="150,00" />
    </View>
  );
}
