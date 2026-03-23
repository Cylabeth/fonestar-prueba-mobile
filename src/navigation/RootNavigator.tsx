import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { LoginScreen } from '../screens/LoginScreen';
import { InstrumentsListScreen } from '../screens/InstrumentsListScreen';
import { InstrumentDetailScreen } from '../screens/InstrumentDetailScreen';
import { Colors } from '../theme/tokens';
import type { Instrument } from '../types/instrument';

// ---------------------------------------------------------------------------
// Route param types — single source of truth for navigation
// ---------------------------------------------------------------------------
export type RootStackParamList = {
  Login: undefined;
  InstrumentsList: undefined;
  InstrumentDetail: { instrument: Instrument };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// ---------------------------------------------------------------------------
// Navigator
// ---------------------------------------------------------------------------
export function RootNavigator(): React.JSX.Element {
  const { state } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.white },
          headerTintColor: Colors.primary,
          headerTitleStyle: { color: Colors.textPrimary, fontWeight: '600' },
          contentStyle: { backgroundColor: Colors.background },
          animation: 'slide_from_right',
        }}
      >
        {state.isAuthenticated ? (
          <>
            <Stack.Screen
              name="InstrumentsList"
              component={InstrumentsListScreen}
              options={{ title: 'Instruments', headerShown: false }}
            />
            <Stack.Screen
              name="InstrumentDetail"
              component={InstrumentDetailScreen}
              options={({ route }) => ({ title: route.params.instrument.name })}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
