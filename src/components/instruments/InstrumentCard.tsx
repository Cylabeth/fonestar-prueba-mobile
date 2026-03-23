import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadow } from '../../theme/tokens';
import type { Instrument } from '../../types/instrument';

interface Props {
  instrument: Instrument;
  onPress: (instrument: Instrument) => void;
}

export function InstrumentCard({ instrument, onPress }: Props): React.JSX.Element {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(instrument)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: instrument.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.name}>{instrument.name}</Text>
        <Text style={styles.subtitle}>{instrument.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    ...Shadow.card,
  },
  image: {
    width: 80,
    height: 80,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  name: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
});