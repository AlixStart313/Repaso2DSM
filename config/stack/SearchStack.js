import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Search from '../../modules/profile/adapters/screens/Search'

const Stack = createNativeStackNavigator()

export default function SearchStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: '#3897f0',
                headerStyle: { backgroundColor: '#fff' }
            }}>
            <Stack.Screen
                name='searchStack'
                options={{ title: 'Buscar' }}
                component={ Search }
            />
        </Stack.Navigator>
    )
}