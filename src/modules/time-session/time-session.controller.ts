import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TimeSessionService } from './time-session.service';
import { CreateTimeSessionDto } from './dto/create-time-session.dto';
import { UpdateTimeSessionDto } from './dto/update-time-session.dto';
import { IFindAllQuery } from 'src/shared/types/response.type';
import { AddTimeBasedSessionDto } from './dto/add-time-based-session.dto';

@Controller('time-session')
export class TimeSessionController {
  constructor(private readonly timeSessionService: TimeSessionService) {}

  @Post()
  create(@Body() createTimeSessionDto: CreateTimeSessionDto) {
    return this.timeSessionService.create(createTimeSessionDto);
  }


  @Get()
  findAll(@Query() query: IFindAllQuery) {
    return this.timeSessionService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeSessionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimeSessionDto: UpdateTimeSessionDto,
  ) {
    return this.timeSessionService.update(id, updateTimeSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeSessionService.remove(id);
  }
}
