import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, FontWeight } from '../theme/tokens';

// Placeholder — detail view implemented in next iteration
export function InstrumentDetailScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>InstrumentDetailScreen</Text>
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
