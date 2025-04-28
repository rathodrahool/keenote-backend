import { Module } from '@nestjs/common';
import { TimeSessionService } from './time-session.service';
import { TimeSessionController } from './time-session.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeSession, TimeSessionSchema } from './entities/time-session.entity';
import { TaskService } from '../task/task.service';
import { Task, TaskSchema } from '../task/entities/task.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TimeSession.name, schema: TimeSessionSchema },
      {name:Task.name,schema:TaskSchema}
    ]),
  ],
  controllers: [TimeSessionController],
  providers: [TimeSessionService,TaskService],
})
export class TimeSessionModule {}
