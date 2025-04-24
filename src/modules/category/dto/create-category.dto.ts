import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from 'src/shared/constants/enum';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsBoolean()
  @IsOptional()
  is_archived?: boolean;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;
}
