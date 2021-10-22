import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseContextService } from './services/database-context.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        database: configService.get<string>('database.name'),
        entities: [],
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
