import { Module } from '@nestjs/common';
import { LineRepository } from './infrastructure/line.repository';
import { TrainRepository } from './infrastructure/train.repository';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { LineController } from './line.controller';

@Module({
  imports: [InfrastructureModule],
  providers: [LineRepository, TrainRepository],
  controllers: [LineController],
  exports: [LineRepository, TrainRepository],
})
export class LineModule {}
