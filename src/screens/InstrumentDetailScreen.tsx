import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { Colors, FontSize, FontWeight, Spacing, Shadow } from '../theme/tokens';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList, 'InstrumentDetail'>;
type Route = RouteProp<RootStackParamList, 'InstrumentDetail'>;

export function InstrumentDetailScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { instrument } = route.params;

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll} bounces={false}>

        {/* Hero image */}
        <Image
          source={{ uri: instrument.imageUrl }}
          style={styles.hero}
          resizeMode="cover"
        />

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.name}>{instrument.name}</Text>
          <Text style={styles.category}>{instrument.category} Instrument</Text>

          {/* Properties table */}
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Origin</Text>
              <Text style={styles.rowValue}>{instrument.origin}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Type</Text>
              <Text style={styles.rowValue}>{instrument.type}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Year</Text>
              <Text style={styles.rowValue}>{instrument.year}</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{instrument.description}</Text>
        </View>
      </ScrollView>

      {/* Back button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  scroll: {
    paddingBottom: 100,
  },
  hero: {
    width: '100%',
    height: 260,
  },
  content: {
    padding: Spacing.xl,
  },
  name: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  category: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  table: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Spacing.md,
    marginBottom: Spacing.xl,
    overflow: 'hidden',
    ...Shadow.card,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  rowLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  rowValue: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.lg,
  },
  descriptionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  descriptionText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    padding: Spacing.lg,
    ...Shadow.modal,
  },
  backButton: {
    backgroundColor: Colors.primary,
    borderRadius: Spacing.md,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
});