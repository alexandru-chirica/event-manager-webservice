import { MongoRepository } from 'typeorm';

export interface IEntityWrapper<T> {
  readonly repository: MongoRepository<T>;
}
