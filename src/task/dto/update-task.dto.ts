import { IsOptional, IsEnum, IsString, IsDateString } from 'class-validator';
import { Status, Priority } from 'generated/prisma';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @IsOptional()
  isActive?: boolean;
}