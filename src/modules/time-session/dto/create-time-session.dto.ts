import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateTimeSessionDto {
  @IsNotEmpty()
  task: MongooseSchema.Types.ObjectId;

  @IsNumber()
  @IsOptional()
  started_at?: number;

  @IsNumber()
  @IsOptional()
  ended_at?: number;

  @IsNumber()
  @IsOptional()
  duration_minutes?: number;

  @IsNumber()
  @IsOptional()
  completed_target?: number;
}
