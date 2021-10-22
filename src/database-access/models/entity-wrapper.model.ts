import { EntityTarget, getMongoRepository } from 'typeorm';

import { IEntityWrapper } from '../contracts/entity-wrapper.interface';

export class EntityWrapper<T> implements IEntityWrapper<T> {
  // --- Properties ---

  private entity: EntityTarget<T>;

  // --- Getters/setters ---

  get repository() {
    return getMongoRepository<T>(this.entity);
  }

  // --- Constructor ---

  constructor(entity: EntityTarget<T>) {
    this.entity = entity;
  }
}
