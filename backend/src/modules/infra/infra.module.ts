import { Module } from '@nestjs/common';
import { LineModule } from '../line/line.module';
import { StationModule } from '../station/station.module';
import { SegmentModule } from '../segment/segment.module';
import { TripModule } from '../trip/trip.module';
import { InfraController } from './infra.controller';

@Module({
  imports: [LineModule, StationModule, SegmentModule, TripModule],
  controllers: [InfraController],
})
export class InfraModule {}
