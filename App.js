import React from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PasswordForm from './components/PasswordForm';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//objeto para construir a navegação das telas
const Stack = createNativeStackNavigator();

//criando o componente como função
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={LoginForm} />
        <Stack.Screen name="register" component={RegisterForm} />
        <Stack.Screen name="password" component={PasswordForm} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}