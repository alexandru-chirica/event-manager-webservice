import { Injectable } from '@nestjs/common';
import { getMongoManager } from 'typeorm';

import { User } from '../entities/user.entity';
import { EntityWrapper } from '../models/entity-wrapper.model';

@Injectable()
export class DatabaseContextService {
  // --- Properties ---

  User = new EntityWrapper(User);

  // --- Getters/setters ---

  get entityManager() {
    return getMongoManager();
  }
}
