import { create } from 'zustand';

export type OperatorRole = 'dispatcher' | 'incident_manager' | 'supervisor';

export interface Operator {
  id: string;
  name: string;
  role: OperatorRole;
}

interface OperatorStore {
  activeOperator: Operator | null;
  isAuthenticated: boolean;
  login: (operator: Operator) => void;
  logout: () => void;
}

export const useOperatorStore = create<OperatorStore>((set) => ({
  activeOperator: null,
  isAuthenticated: false,
  login: (operator) => set({ activeOperator: operator, isAuthenticated: true }),
  logout: () => set({ activeOperator: null, isAuthenticated: false }),
}));
