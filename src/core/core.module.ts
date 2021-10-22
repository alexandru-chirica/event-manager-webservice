import { Module } from '@nestjs/common';

import { AuthenticationModule } from '../authentication/authentication.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [AuthenticationModule, SharedModule],
})
export class CoreModule {}
