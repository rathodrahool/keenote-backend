import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  IsBoolean,
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

  // New fields
  @IsString()
  @IsOptional()
  parent_task_id?: string;

  @IsBoolean()
  @IsOptional()
  is_template?: boolean;

  @IsString()
  @Matches(/^\d{2}-\d{2}-\d{4}$/, {
    message: 'period_start_date must be in format dd-MM-yyyy',
  })
  @IsOptional()
  period_start_date?: string;

  @IsString()
  @Matches(/^\d{2}-\d{2}-\d{4}$/, {
    message: 'period_end_date must be in format dd-MM-yyyy',
  })
  @IsOptional()
  period_end_date?: string;

  @IsNumber()
  @IsOptional()
  completed_count?: number;

  @IsBoolean()
  @IsOptional()
  is_completed?: boolean;
}