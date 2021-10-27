import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Event } from './entities/event.entity';
import { User } from './entities/user.entity';
import { DatabaseContextService } from './services/database-context.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        entities: [Event, User],
        host: configService.get<string>('database.host'),
        password: configService.get<string>('database.password'),
        port: configService.get<number>('database.port'),
        synchronize: !configService.get<boolean>('isProduction'),
        type: 'mongodb',
        username: configService.get<string>('database.user'),
      }),
    }),
  ],
  providers: [DatabaseContextService],
  exports: [DatabaseContextService],
})
export class DatabaseAccessModule {}
