import React, { useState, useContext } from 'react';

import { LogoutButton } from '@components/Controllers/LogoutButton';
import { Container, Greeting, Title, SubTitle } from './styles';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { UserAuthContext } from '../../../utils/AuthContext';

export function Header() {
  function handleSignOut() {
    auth().signOut()
  }

  const userContext = useContext(UserAuthContext)
  return (
    <Container>
      <Greeting>
        <Title>HelpDesk</Title>
        <SubTitle>{userContext[0].email}</SubTitle>
      </Greeting>

      <LogoutButton onPress={handleSignOut} />
    </Container>
  );
}