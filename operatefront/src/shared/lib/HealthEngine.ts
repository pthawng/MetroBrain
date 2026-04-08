// src/shared/lib/HealthEngine.ts
import type { TrainEntity } from '../../entities/train/model/schema';

export type SystemHealth = 'NORMAL' | 'DEGRADED' | 'CRITICAL';

export interface HealthState {
  status: SystemHealth;
  delayedCount: number;
  criticalIncidentCount: number;
  warningIncidentCount: number;
  totalActive: number;
}

export class HealthEngine {
  /**
   * Deterministic logic for system health:
   * 
   * CRITICAL: 
   * - ≥ 1 Critical Incident
   * - OR > 20% trains delayed > 120s
   * 
   * DEGRADED:
   * - ≥ 1 Warning Incident
   * - OR > 10% trains delayed > 60s
   * 
   * NORMAL:
   * - Everything else
   */
  static evaluate(
    trains: TrainEntity[], 
    stats: { criticalIncidents: number; warningIncidents: number }
  ): HealthState {
    const totalActive = trains.length;
    if (totalActive === 0) {
      return { 
        status: 'NORMAL', 
        delayedCount: 0, 
        criticalIncidentCount: 0, 
        warningIncidentCount: 0, 
        totalActive: 0 
      };
    }

    const criticalDelayed = trains.filter(t => t.status === 'delayed' && (t.delaySeconds || 0) > 120).length;
    const warningDelayed = trains.filter(t => t.status === 'delayed' && (t.delaySeconds || 0) > 60).length;

    const criticalDelayRatio = (criticalDelayed / totalActive) * 100;
    const warningDelayRatio = (warningDelayed / totalActive) * 100;

    let status: SystemHealth = 'NORMAL';

    if (stats.criticalIncidents >= 1 || criticalDelayRatio > 20) {
      status = 'CRITICAL';
    } else if (stats.warningIncidents >= 1 || warningDelayRatio > 10) {
      status = 'DEGRADED';
    }

    return {
      status,
      delayedCount: trains.filter(t => t.status === 'delayed').length,
      criticalIncidentCount: stats.criticalIncidents,
      warningIncidentCount: stats.warningIncidents,
      totalActive
    };
  }
}
