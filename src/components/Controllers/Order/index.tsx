import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import firestore from '@react-native-firebase/firestore'

import {
  Container,
  Status,
  Content,
  Header,
  Title,
  Label,
  Info,
  Footer,
  OrderStyleProps,
} from './styles';

import { ToggleStatus } from '../ToggleStatus'
import { Alert } from 'react-native';

export type OrderProps = OrderStyleProps & {
  id: string;
  patrimony: string;
  equipment: string;
  description: string;
  created_at: Object;
}

type Props = {
  data: OrderProps;
};

export function Order({ data }: Props) {
  const theme = useTheme();

  const handleToggleStatus = () =>{
    firestore()
    .collection('order')
    .doc(data.id)
    .update({
      status: 'closed'
    })
    .then(()=> Alert.alert("Chamado", "Chamado atendido com sucesso"))
    .catch((error) => console.log(error))
  }
  return (
    <Container>
      <Status status={data.status} />
      <Content>
        <Header>
          <Title>{data.description}</Title>
          {data.status == 'open' ? <ToggleStatus title='Ok' onActivated={handleToggleStatus}/> : <></>}
          <MaterialIcons
            name={data.status === "open" ? "hourglass-empty" : "check-circle"}
            size={24}
            color={data.status === "open" ? theme.COLORS.SECONDARY : theme.COLORS.PRIMARY}
          />
        </Header>

        <Footer>
          <Info>
            <MaterialIcons name="schedule" size={16} color={theme.COLORS.SUBTEXT} />
            <Label>
              20/01/22 às 14h
            </Label>
          </Info>

          <Info>
            <MaterialIcons name="my-location" size={16} color={theme.COLORS.SUBTEXT} />
            <Label>
              {data.patrimony}
            </Label>
          </Info>
        </Footer>
      </Content>
    </Container>
  );
}