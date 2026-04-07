import { Controller, Get } from '@nestjs/common';
import { LineRepository } from '../line/infrastructure/line.repository';
import { StationRepository } from '../station/infrastructure/station.repository';
import { SegmentRepository } from '../segment/infrastructure/segment.repository';
import { TrainRepository } from '../line/infrastructure/train.repository';
import { TripRepository } from '../trip/infrastructure/trip.repository';

@Controller('infra')
export class InfraController {
  constructor(
    private readonly lineRepository: LineRepository,
    private readonly stationRepository: StationRepository,
    private readonly segmentRepository: SegmentRepository,
    private readonly trainRepository: TrainRepository,
    private readonly tripRepository: TripRepository,
  ) {}

  @Get()
  async getInfra() {
    const [lines, stations, segments, trains, trips] = await Promise.all([
      this.lineRepository.findAll(),
      this.stationRepository.findAll(),
      this.segmentRepository.findAll(),
      this.trainRepository.findAll(),
      this.tripRepository.findActiveTripsWithStopTimes(),
    ]);

    // Data normalization for L8 FE performance
    const linesMap = Object.fromEntries(lines.map((l) => [l.id, l]));
    const stationsMap = Object.fromEntries(stations.map((s) => [s.id, s]));
    const segmentsMap = Object.fromEntries(segments.map((seg) => [seg.id, seg]));
    const trainsMap = Object.fromEntries(trains.map((t) => [t.id, t]));
    
    // Map trip ID to train ID for FE lookup
    const tripToTrainMap = Object.fromEntries(
      trips.map((t: any) => [t.id, t.trainId || null])
    );

    return {
      version: new Date().toISOString(),
      lines: linesMap,
      stations: stationsMap,
      segments: segmentsMap,
      trains: trainsMap,
      tripToTrain: tripToTrainMap,
    };
  }
}
