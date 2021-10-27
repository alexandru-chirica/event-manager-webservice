import { Injectable } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';

import { Event } from '../../database-access/entities/event.entity';
import { DatabaseContextService } from '../../database-access/services/database-context.service';

@Injectable()
export class EventService {
  // --- Constructor ---

  constructor(private databaseContextService: DatabaseContextService) {}

  // --- Public methods ---

  async find(optionsOrConditions?: FindManyOptions<Event> | Partial<Event>) {
    return this.databaseContextService.Event.repository.find(
      optionsOrConditions,
    );
  }

  async insert(event: Event) {
    return this.databaseContextService.Event.repository.insert(event);
  }

  async insertMany(events: Array<Event>) {
    return this.databaseContextService.Event.repository.insert(events);
  }

  async insertOne(event: Event) {
    return this.databaseContextService.Event.repository.insertOne(event);
  }
}
