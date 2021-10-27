import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

import { CreateEventDto } from '../dtos/create-event.dto';
import { EventService } from '../services/event.service';
import { JwtAuthGuard } from '../../authentication/guards/jwt-auth.guard';
import { UserService } from '../../shared/services/user.service';
import { ObjectID } from 'typeorm';

@Controller('event')
export class EventController {
  // --- Constructor ---

  constructor(
    private eventService: EventService,
    private userService: UserService,
  ) {}

  // --- Endpoints ---

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: CreateEventDto })
  @ApiResponse({
    status: 200,
  })
  @UsePipes(new ValidationPipe())
  async createEvent(@Body() createEventDto: CreateEventDto, @Request() req) {
    const { endDate, startDate } = createEventDto;
    const { id } = req.user;

    return this.eventService.insert({
      ...createEventDto,
      endDate: new Date(endDate),
      startDate: new Date(startDate),
      userId: id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getAllEvents() {
    const events = await this.eventService.find({
      order: {
        createdDate: 'DESC',
      },
    });
    const userIds = events.map((event) => event.userId);
    const users = await this.userService.findByIds(userIds);

    return events.map((event) => {
      const user = users.find((usr) => usr.id.toString() === event.userId);

      return { ...event, avatar: user.avatar };
    });
  }
}
