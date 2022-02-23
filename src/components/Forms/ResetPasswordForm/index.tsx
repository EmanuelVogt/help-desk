import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import { FooterButton } from '@components/Controllers/FooterButton';
import { Button } from '@components/Controllers/Button';
import { Input } from '@components/Controllers/Input';
import { Form, Title, Footer } from './styles';
import { Alert } from 'react-native';

export function ResetPasswordForm() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    function handleForgotPassword() {
        setIsLoading(true);
        auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert("Redefinir Senha", "Enviamos um email para redefinição de senha")
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }

    return (
        <Form>
            <Title>Entrar</Title>
            <Input placeholder="E-mail" onChangeText={setEmail} />
            <Button title="Entrar" onPress={handleForgotPassword} isLoading={isLoading} />

            <Footer>
                <FooterButton title="Criar conta" icon="person-add" onPress={() => navigation.navigate('register')} />
                <FooterButton title="Login" icon="person-add" onPress={() => navigation.navigate('signIn')} />
            </Footer>
        </Form>
    );
}
