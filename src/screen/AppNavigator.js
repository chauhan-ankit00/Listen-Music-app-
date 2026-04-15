import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Splash from './Splash'
import Login from './Login'
import Home from './Home'
import BottomTabs from './BottomTabs'

const Stack = createNativeStackNavigator()

export default function AppNavigator() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Splash' component={require('./Splash').default} options={{headerShown: false}} />
            <Stack.Screen name='Login' component={require('./Login').default} options={{headerShown: false}} />
            <Stack.Screen name='Home' component={require('./BottomTabs').default} options={{headerShown: false}} />

        </Stack.Navigator>

    </NavigationContainer>
  )
}