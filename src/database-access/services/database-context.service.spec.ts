import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseContextService } from './database-context.service';

describe('DatabaseContextService', () => {
  let service: DatabaseContextService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseContextService],
    }).compile();

    service = module.get<DatabaseContextService>(DatabaseContextService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
