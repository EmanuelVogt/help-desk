import React, { useState } from "react";
import {
  Alert,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { FooterButton } from "@components/Controllers/FooterButton";
import { Input } from "@components/Controllers/Input";
import { Form, Title, Footer } from "./styles";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

interface FormData {
  email: string ;
  password: string;
}
const schema = Yup.object().shape({
  email: Yup.string()
    .email("formato não corresponde")
    .required("Email é obrigatório"),
  password: Yup.string().min(6, "Mínimo de 6 caracteres").required("Senha é obrigatória"),
});

export function SignInForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation();

  function handleSignIn(data: FormData) {
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((response) => {})
      .catch((error) => {
        Alert.alert("Verifique suas credenciais!");
      })
      .finally();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Form>
        <Title>Entrar</Title>
        <Input
          keyboardType="email-address"
          control={control}
          error={errors.email?.message}
          name="email"
          autoCapitalize="none"
          placeholder="Digite o email"
        />
        <Input
          control={control}
          error={errors.password?.message}
          name="password"
          placeholder="Digite a Senha"
          secureTextEntry
        />
        <Button title="Entrar" onPress={handleSubmit(handleSignIn)} />

        <Footer>
          <FooterButton
            title="Criar conta"
            icon="person-add"
            onPress={() => navigation.navigate("register")}
          />
          <FooterButton
            title="Esqueci senha"
            icon="email"
            onPress={() => navigation.navigate("reset")}
          />
        </Footer>
      </Form>
    </TouchableWithoutFeedback>
  );
}
