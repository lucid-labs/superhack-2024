import { Module } from '@nestjs/common';
import { LucidityService } from './lucidity.service';

@Module({
  providers: [LucidityService]
})
export class LucidityModule {}
