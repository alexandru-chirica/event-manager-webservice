import { Injectable } from '@nestjs/common';
import { getMongoManager } from 'typeorm';

import { Event } from '../entities/event.entity';
import { User } from '../entities/user.entity';
import { EntityWrapper } from '../models/entity-wrapper.model';

@Injectable()
export class DatabaseContextService {
  // --- Properties ---

  Event = new EntityWrapper(Event);
  User = new EntityWrapper(User);

  // --- Getters/setters ---

  get entityManager() {
    return getMongoManager();
  }
}
