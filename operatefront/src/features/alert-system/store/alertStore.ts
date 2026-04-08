import { create } from 'zustand';
import type { Operator } from '../../operator-id/store/operatorStore';

export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface Alert {
  id: string;
  trainId?: string;
  type: string;
  message: string;
  severity: AlertSeverity;
  timestamp: number;
  acknowledged: boolean;
  acknowledgedBy?: Operator;
  resolved: boolean;
  resolvedBy?: Operator;
  count: number; // For aggregation
}

interface AlertStore {
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, 'id' | 'acknowledged' | 'resolved' | 'count' | 'timestamp' | 'acknowledgedBy' | 'resolvedBy'>) => void;
  acknowledgeAlert: (id: string, operator: Operator) => void;
  resolveAlert: (id: string, operator: Operator) => void;
  clearResolved: () => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  alerts: [],
  
  addAlert: (newAlert) => set((state) => {
    // 1. Aggregation Logic: Group by trainId + type if recent
    const recentIndex = state.alerts.findIndex(
      a => a.trainId === newAlert.trainId && 
           a.type === newAlert.type && 
           !a.resolved &&
           (Date.now() - a.timestamp < 30000) // 30s window for aggregation
    );

    if (recentIndex !== -1) {
      const updatedAlerts = [...state.alerts];
      updatedAlerts[recentIndex] = {
        ...updatedAlerts[recentIndex],
        message: newAlert.message, // Update message with latest info
        timestamp: Date.now(),
        count: updatedAlerts[recentIndex].count + 1,
        acknowledged: false, // Reset ack on new burst
        acknowledgedBy: undefined,
      };
      
      // Move to top
      const [item] = updatedAlerts.splice(recentIndex, 1);
      return { alerts: [item, ...updatedAlerts] };
    }

    // 2. Add New Alert
    const id = Math.random().toString(36).substring(7);
    const alert: Alert = {
      ...newAlert,
      id,
      acknowledged: false,
      resolved: false,
      count: 1,
      timestamp: Date.now(),
    };

    return { alerts: [alert, ...state.alerts].slice(0, 100) }; // Keep last 100
  }),

  acknowledgeAlert: (id, operator) => set((state) => ({
    alerts: state.alerts.map(a => a.id === id ? { ...a, acknowledged: true, acknowledgedBy: operator } : a)
  })),

  resolveAlert: (id, operator) => set((state) => ({
    alerts: state.alerts.map(a => a.id === id ? { ...a, resolved: true, resolvedBy: operator } : a)
  })),

  clearResolved: () => set((state) => ({
    alerts: state.alerts.filter(a => !a.resolved)
  })),
}));
