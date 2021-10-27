import { Injectable } from '@nestjs/common';
import { FindConditions, FindManyOptions, ObjectLiteral } from 'typeorm';

import { User } from '../../database-access/entities/user.entity';
import { DatabaseContextService } from '../../database-access/services/database-context.service';

@Injectable()
export class UserService {
  // --- Constructor ---

  constructor(private databaseContextService: DatabaseContextService) {}

  // --- Public methods ---

  async find(optionsOrConditions: FindManyOptions<User> | Partial<User>) {
    return this.databaseContextService.User.repository.find(
      optionsOrConditions,
    );
  }

  async findByIds(ids: Array<string>) {
    return this.databaseContextService.User.repository.findByIds(ids);
  }

  async findOneByEmail(email: string) {
    return this.databaseContextService.User.repository.findOne({
      where: {
        email: { $eq: email },
      },
    });
  }

  async insert(user: User) {
    return this.databaseContextService.User.repository.insert(user);
  }

  async insertMany(users: Array<User>) {
    return this.databaseContextService.User.repository.insert(users);
  }

  async insertOne(user: User) {
    return this.databaseContextService.User.repository.insertOne(user);
  }

  async update(criteria: FindConditions<User>, user: Partial<User>) {
    return this.databaseContextService.User.repository.update(criteria, user);
  }

  async updateMany(query: ObjectLiteral, user: Partial<User>) {
    return this.databaseContextService.User.repository.updateMany(query, user);
  }

  async updateOne(email: string, user: Partial<User>) {
    return this.databaseContextService.User.repository.updateOne(
      {
        where: {
          email: { $eq: email },
        },
      },
      user,
    );
  }
}
