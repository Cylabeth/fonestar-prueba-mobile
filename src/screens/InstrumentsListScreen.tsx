import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, FontWeight } from '../theme/tokens';

// Placeholder — list + infinite scroll implemented in next iteration
export function InstrumentsListScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>InstrumentsListScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  label: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
  },
});
