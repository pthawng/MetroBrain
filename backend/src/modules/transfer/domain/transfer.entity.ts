import { BaseEntity, TransferType } from '../../../shared/types';

export interface Transfer extends BaseEntity {
  fromStationId: string;
  toStationId: string;
  fromLineId: string;
  toLineId: string;
  transferType: TransferType;
  walkingTimeSec: number;
  walkingDistanceM?: number;
}
