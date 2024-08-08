import { Test, TestingModule } from '@nestjs/testing';
import { LucidityService } from './lucidity.service';

describe('LucidityService', () => {
  let service: LucidityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LucidityService],
    }).compile();

    service = module.get<LucidityService>(LucidityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
