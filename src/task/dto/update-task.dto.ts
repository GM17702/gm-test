import { IsOptional, IsEnum, IsString, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Status, Priority } from 'generated/prisma';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Updated task name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: '2025-08-20T14:30:00.000Z' })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiPropertyOptional({ enum: Status, example: Status.IN_PROGRESS })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiPropertyOptional({ enum: Priority, example: Priority.YELLOW })
  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  isActive?: boolean;
}