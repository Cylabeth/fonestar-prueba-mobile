export type InstrumentCategory =
  | 'String'
  | 'Percussion'
  | 'Wind'
  | 'Keyboard'
  | 'Electronic';

export interface Instrument {
  id: string;
  name: string;
  subtitle: string;
  category: InstrumentCategory;
  origin: string;
  type: string;
  year: number;
  description: string;
  imageUrl: string;
}

export interface InstrumentPage {
  items: Instrument[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
