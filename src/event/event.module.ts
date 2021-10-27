import { Module } from '@nestjs/common';

import { EventController } from './controllers/event.controller';
import { EventService } from './services/event.service';
import { UserService } from 'src/shared/services/user.service';

@Module({
  controllers: [EventController],
  providers: [EventService, UserService],
})
export class EventModule {}
