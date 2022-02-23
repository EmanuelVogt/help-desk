import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';

import { Home } from '@screens/Home';
import { AuthRoutes } from './auth.routes';
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { UserAuthContext } from "../../src/utils/AuthContext";

export function Routes() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser);

    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      {user ?
        <UserAuthContext.Provider value={[user]}>
          <Home />
        </UserAuthContext.Provider> 
        : <AuthRoutes />
      }
    </NavigationContainer>
  );
}
