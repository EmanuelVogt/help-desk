import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import { FooterButton } from '@components/Controllers/FooterButton';
import { Button } from '@components/Controllers/Button';
import { Input } from '@components/Controllers/Input';
import { Form, Title, Footer } from './styles';
import { Alert } from 'react-native';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  function handleSignIn() {
    if (email && password) {
      setIsLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
        })
        .catch((error) => {
          setIsLoading(false)
          Alert.alert('Verifique suas credenciais!')
        })
        .finally(() => setIsLoading(false))
    } else {
      Alert.alert('Dados estão faltando')
    }
  }

  return (
    <Form>
      <Title>Entrar</Title>
      <Input placeholder="E-mail" onChangeText={setEmail} />
      <Input placeholder="Senha" secureTextEntry onChangeText={setPassword} />
      <Button title="Entrar" onPress={handleSignIn} isLoading={isLoading} />

      <Footer>
        <FooterButton title="Criar conta" icon="person-add" onPress={() => navigation.navigate('register')} />
        <FooterButton title="Esqueci senha" icon="email" onPress={() => navigation.navigate('reset')} />
      </Footer>
    </Form>
  );
}
