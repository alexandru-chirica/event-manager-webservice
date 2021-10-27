import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

import { DatabaseContextService } from '../../database-access/services/database-context.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseContextService, UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
