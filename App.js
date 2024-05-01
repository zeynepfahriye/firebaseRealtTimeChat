import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Chat from './screens/Chat';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="LoginScreen" component={Login} />
        <Stack.Screen name="ChatScreen" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;