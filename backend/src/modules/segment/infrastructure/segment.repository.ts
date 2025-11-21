import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { Segment } from '../domain/segment.entity';

@Injectable()
export class SegmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByLineId(lineId: string): Promise<Segment[]> {
    const segments = await this.prisma.segment.findMany({ where: { lineId } });
    return segments.map(this.mapToDomain);
  }

  async findAll(): Promise<Segment[]> {
    const segments = await this.prisma.segment.findMany();
    return segments.map(this.mapToDomain);
  }

  private mapToDomain(segment: any): Segment {
    return {
      id: segment.id,
      lineId: segment.lineId,
      fromStationId: segment.fromStationId,
      toStationId: segment.toStationId,
      distanceKm: segment.distanceKm,
      travelTimeSec: segment.travelTimeSec,
      maxSpeedKmh: segment.maxSpeedKmh,
      trackType: segment.trackType,
      createdAt: segment.createdAt,
      updatedAt: segment.createdAt, // Segment doesn't have updatedAt in schema, using createdAt
    } as Segment;
  }
}
