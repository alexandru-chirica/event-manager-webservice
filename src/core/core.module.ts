import { Module } from '@nestjs/common';

import { AuthenticationModule } from '../authentication/authentication.module';
import { EventModule } from 'src/event/event.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [AuthenticationModule, EventModule, SharedModule],
})
export class CoreModule {}
