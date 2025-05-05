import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './modules/category/category.module';
import { TaskModule } from './modules/task/task.module';
import { TimeSessionModule } from './modules/time-session/time-session.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    CategoryModule,
    TaskModule,
    TimeSessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
