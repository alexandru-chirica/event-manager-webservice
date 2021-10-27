import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { DatabaseAccessModule } from '../database-access/database-access.module';
import { DatabaseContextService } from '../database-access/services/database-context.service';
import environment from '../environment';
import { UserService } from './services/user.service';

@Global()
@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [environment],
    }),
    DatabaseAccessModule,
  ],
  providers: [ConfigService, DatabaseContextService, UserService],
  exports: [ConfigService, DatabaseContextService, UserService],
})
export class SharedModule {}
