import { useState, useCallback, useEffect, useRef } from 'react';
import { getInstrumentsPage } from '../services/instruments.service';
import type { Instrument } from '../types/instrument';

interface State {
  items: Instrument[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  error: string | null;
}

export interface UseInfiniteInstrumentsResult extends State {
  loadMore: () => void;
  refresh: () => void;
}

export function useInfiniteInstruments(): UseInfiniteInstrumentsResult {
  const [state, setState] = useState<State>({
    items: [],
    isLoading: true,
    isLoadingMore: false,
    hasMore: true,
    error: null,
  });

  const pageRef = useRef(1);
  const isFetchingRef = useRef(false);

  const fetchPage = useCallback(
    async (targetPage: number, replace: boolean): Promise<void> => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;

      try {
        const result = await getInstrumentsPage(targetPage);

        pageRef.current = targetPage;

        setState((prev) => ({
          ...prev,
          items: replace ? result.items : [...prev.items, ...result.items],
          hasMore: result.hasMore,
          isLoading: false,
          isLoadingMore: false,
          error: null,
        }));
      } catch {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          isLoadingMore: false,
          error: 'Error al cargar los instrumentos',
        }));
      } finally {
        isFetchingRef.current = false;
      }
    },
    []
  );

  useEffect(() => {
    void fetchPage(1, true);
  }, [fetchPage]);

  const loadMore = useCallback((): void => {
    if (isFetchingRef.current || !state.hasMore || state.isLoading) return;

    setState((prev) => ({ ...prev, isLoadingMore: true }));
    void fetchPage(pageRef.current + 1, false);
  }, [fetchPage, state.hasMore, state.isLoading]);

  const refresh = useCallback((): void => {
    pageRef.current = 1;
    setState((prev) => ({
      ...prev,
      isLoading: true,
      isLoadingMore: false,
      error: null,
    }));
    void fetchPage(1, true);
  }, [fetchPage]);

  return { ...state, loadMore, refresh };
}