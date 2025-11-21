import { LineStatus, BaseEntity } from '../../../shared/types';

export interface Line extends BaseEntity {
  code: string;
  name: string;
  nameEn?: string;
  color: string;
  status: LineStatus;
  totalLengthKm?: number;
  openingDate?: Date;
}
