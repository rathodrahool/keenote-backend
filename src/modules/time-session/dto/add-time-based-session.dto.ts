import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';
import { SessionStatus, TaskType } from 'src/shared/constants/enum';

export class AddTimeBasedSessionDto {
  @IsNotEmpty()
  task: MongooseSchema.Types.ObjectId;

  @IsString()
  @Matches(/^\d{2}-\d{2}-\d{4}$/, {
    message: 'date must be in format dd-MM-yyyy',
  })
  date: string;

  @IsNumber()
  @IsOptional()
  started_at: number;

  @IsNumber()
  @IsOptional()
  ended_at?: number;

  @IsNumber()
  @IsOptional()
  duration_minutes: number;


  @IsEnum(SessionStatus)
  @IsOptional()
  status?:SessionStatus
}
