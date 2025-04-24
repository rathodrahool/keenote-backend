import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';
import { SessionStatus, TaskType } from 'src/shared/constants/enum';

export class CreateTimeSessionDto {
  @IsNotEmpty()
  task: MongooseSchema.Types.ObjectId;

  @IsNumber()
  @IsOptional()
  started_at?: number;

  @IsString()
  @Matches(/^\d{2}-\d{2}-\d{4}$/, {
    message: 'date must be in format dd-MM-yyyy',
  })
  date: string;

  @IsNumber()
  @IsOptional()
  ended_at?: number;

  @IsNumber()
  @IsOptional()
  duration_minutes?: number;

  @IsNumber()
  @IsOptional()
  completed_target?: number;

  @IsEnum(TaskType)
  @IsOptional()
  session_type?:TaskType

  @IsEnum(SessionStatus)
  @IsOptional()
  status?:SessionStatus
}
