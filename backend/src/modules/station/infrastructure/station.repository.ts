import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { Station } from '../domain/station.entity';
import { StationStatus, StationType } from '../../../shared/types';

@Injectable()
export class StationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Station | null> {
    const station = await this.prisma.station.findUnique({ where: { id } });
    if (!station) return null;
    return this.mapToDomain(station);
  }

  async findAll(): Promise<Station[]> {
    const stations = await this.prisma.station.findMany();
    return stations.map(this.mapToDomain);
  }

  private mapToDomain(station: any): Station {
    return {
      id: station.id,
      code: station.code,
      name: station.name,
      nameEn: station.nameEn,
      lat: station.lat,
      lng: station.lng,
      address: station.address,
      type: station.type as StationType,
      hasElevator: station.hasElevator,
      hasParking: station.hasParking,
      status: station.status as StationStatus,
      createdAt: station.createdAt,
      updatedAt: station.updatedAt,
    };
  }
}
