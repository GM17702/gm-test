import { IsNotEmpty, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status, Priority } from 'generated/prisma';

export class CreateTaskDto {
  @ApiProperty({ example: 'Create Swagger integration' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '2025-08-15T10:00:00.000Z' })
  @IsDateString()
  dueDate: string;

  @ApiProperty({ enum: Status, example: Status.PENDING })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({ enum: Priority, example: Priority.RED })
  @IsEnum(Priority)
  priority: Priority;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  isActive?: boolean;
}