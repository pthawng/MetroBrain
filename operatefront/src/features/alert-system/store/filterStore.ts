import { create } from 'zustand';

export type StatusFilter = 'all' | 'delayed' | 'critical' | 'active';

interface FilterStore {
  statusFilter: StatusFilter;
  lineFilter: string | null;
  setStatusFilter: (filter: StatusFilter) => void;
  setLineFilter: (line: string | null) => void;
  reset: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  statusFilter: 'all',
  lineFilter: null,
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setLineFilter: (lineFilter) => set({ lineFilter }),
  reset: () => set({ statusFilter: 'all', lineFilter: null }),
}));
