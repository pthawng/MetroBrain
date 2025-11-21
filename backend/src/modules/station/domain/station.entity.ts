import { StationStatus, StationType, BaseEntity } from '../../../shared/types';

export interface Station extends BaseEntity {
  code: string;
  name: string;
  nameEn?: string;
  lat: number;
  lng: number;
  address?: string;
  type: StationType;
  hasElevator: boolean;
  hasParking: boolean;
  status: StationStatus;
}
