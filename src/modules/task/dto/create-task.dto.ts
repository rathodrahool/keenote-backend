import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Status, TaskFrequency, TaskType } from 'src/shared/constants/enum';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(TaskType)
  @IsNotEmpty()
  task_type: TaskType;

  @IsEnum(TaskFrequency)
  @IsNotEmpty()
  task_frequency: TaskFrequency;

  @IsNumber()
  @IsOptional()
  duration?: number;

  @IsNumber()
  @IsOptional()
  target?: number;

  @IsString()
  @Matches(/^\d{2}-\d{2}-\d{4}$/, {
    message: 'start_date must be in format dd-MM-yyyy',
  })
  start_date: string;

  @IsString()
  @Matches(/^\d{2}-\d{2}-\d{4}$/, {
    message: 'end_date must be in format dd-MM-yyyy',
  })
  end_date: string;

  @IsMongoId()
  category: string;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;
}
