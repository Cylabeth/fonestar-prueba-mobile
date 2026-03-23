import type { Instrument, InstrumentPage } from '../types/instrument';
import { delay } from '../utils/delay';

import rawData from '../data/instruments.json';
const RAW_DATA = rawData as Instrument[];

const PAGE_SIZE = 10;
const SIMULATED_DELAY_MS = 600;

export async function getInstrumentsPage(
  page: number,
  pageSize: number = PAGE_SIZE,
): Promise<InstrumentPage> {
  await delay(SIMULATED_DELAY_MS);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const items = RAW_DATA.slice(start, end);
  return {
    items,
    totalCount: RAW_DATA.length,
    page,
    pageSize,
    hasMore: end < RAW_DATA.length,
  };
}