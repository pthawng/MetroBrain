import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { Transfer } from '../domain/transfer.entity';
import { TransferType } from '../../../shared/types';

@Injectable()
export class TransferRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Transfer[]> {
    const transfers = await this.prisma.transfer.findMany();
    return transfers.map(this.mapToDomain);
  }

  async findByStationId(stationId: string): Promise<Transfer[]> {
    const transfers = await this.prisma.transfer.findMany({
      where: {
        OR: [{ fromStationId: stationId }, { toStationId: stationId }],
      },
    });
    return transfers.map(this.mapToDomain);
  }

  private mapToDomain(transfer: any): Transfer {
    return {
      id: transfer.id,
      fromStationId: transfer.fromStationId,
      toStationId: transfer.toStationId,
      fromLineId: transfer.fromLineId,
      toLineId: transfer.toLineId,
      transferType: transfer.transferType as TransferType,
      walkingTimeSec: transfer.walkingTimeSec,
      walkingDistanceM: transfer.walkingDistanceM,
      createdAt: transfer.createdAt,
      updatedAt: transfer.createdAt, // Using createdAt
    };
  }
}
