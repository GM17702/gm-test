import { IsNotEmpty, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { Status, Priority } from 'generated/prisma';

export class CreateTaskDto {
  @IsNotEmpty()
  name: string;

  @IsDateString()
  dueDate: string;

  @IsEnum(Status)
  status: Status;

  @IsEnum(Priority)
  priority: Priority;

  @IsOptional()
  isActive?: boolean;
}