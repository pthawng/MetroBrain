import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { Line } from '../domain/line.entity';
import { LineStatus } from '../../../shared/types';

@Injectable()
export class LineRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Line | null> {
    const line = await this.prisma.line.findUnique({ where: { id } });
    if (!line) return null;
    return this.mapToDomain(line);
  }

  async findAll(): Promise<Line[]> {
    const lines = await this.prisma.line.findMany();
    return lines.map(this.mapToDomain);
  }

  private mapToDomain(line: any): Line {
    return {
      id: line.id,
      code: line.code,
      name: line.name,
      nameEn: line.nameEn,
      color: line.color,
      status: line.status as LineStatus,
      totalLengthKm: line.totalLengthKm,
      openingDate: line.openingDate,
      createdAt: line.createdAt,
      updatedAt: line.updatedAt,
    };
  }
}
