import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps, View } from "react-native";

import { Container, Error } from "./styles";
interface Props extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

export function Input({ control, name, error, ...rest }: Props) {
  return (
    <View>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Container onChangeText={onChange} value={value} {...rest} />
        )}
        name={name}
      ></Controller>
       {error && <Error> {error} </Error>}
    </View>
  );
}
