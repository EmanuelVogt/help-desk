import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import signInAnimation from '@assets/animations/signin.json';

import { Lottie } from '@components/Animations/Lottie';

import { Container, Content, SubTitle } from './styles';
import { ResetPasswordForm } from '@components/Forms/ResetPasswordForm';

export function Reset() {
  return (
    <Container>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Content>
          <Lottie source={signInAnimation} />
          <SubTitle>Resete sua senha</SubTitle>
          <ResetPasswordForm />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}