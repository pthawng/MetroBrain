import { BaseEntity } from '../../../shared/types';

export interface Segment extends BaseEntity {
  lineId: string;
  fromStationId: string;
  toStationId: string;
  distanceKm: number;
  travelTimeSec: number;
  maxSpeedKmh?: number;
  trackType: string;
}
