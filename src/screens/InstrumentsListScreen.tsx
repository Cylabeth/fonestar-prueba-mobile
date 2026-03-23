import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useInfiniteInstruments } from '../hooks/useInfiniteInstruments';
import { InstrumentCard } from '../components/instruments/InstrumentCard';
import { LoadingFooter } from '../components/common/LoadingFooter';
import { EmptyState } from '../components/common/EmptyState';
import {
  Colors,
  FontSize,
  FontWeight,
  Spacing,
  Shadow,
  Radius,
} from '../theme/tokens';
import type { Instrument } from '../types/instrument';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList, 'InstrumentsList'>;

export function InstrumentsListScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const { items, isLoading, isLoadingMore, hasMore, error, loadMore, refresh } =
    useInfiniteInstruments();

  const handlePress = useCallback(
    (instrument: Instrument): void => {
      navigation.navigate('InstrumentDetail', { instrument });
    },
    [navigation]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error !== null) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refresh} activeOpacity={0.85}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Instruments</Text>
        <Text style={styles.headerSubtitle}>Browse the collection</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InstrumentCard instrument={item} onPress={handlePress} />
        )}
        contentContainerStyle={styles.list}
        onEndReached={hasMore ? loadMore : undefined}
        onEndReachedThreshold={0.35}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={isLoadingMore ? <LoadingFooter /> : <View style={styles.listEndSpace} />}
        ListEmptyComponent={<EmptyState />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.xl,
  },
  header: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    ...Shadow.card,
  },
  headerTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  headerSubtitle: {
    marginTop: Spacing.xs,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  listEndSpace: {
    height: Spacing.lg,
  },
  errorText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
  },
  retryText: {
    color: Colors.white,
    fontWeight: FontWeight.semibold,
  },
});