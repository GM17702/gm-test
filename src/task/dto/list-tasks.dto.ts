import { IsOptional, IsInt, Min, IsEnum, IsString, IsArray, ArrayNotEmpty, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { Status, Priority } from 'generated/prisma';

export class ListTasksDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  perPage?: number = 10;

  @ApiPropertyOptional({ enum: Status, example: Status.DONE })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Priority, { each: true })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map(val => val.trim());
    }
    return value;
  })
  priority?: Priority[];

  @ApiPropertyOptional({ example: 'test' })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  isActive?: boolean;

  @ApiPropertyOptional({ example: '2025-08-01T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @ApiPropertyOptional({ example: '2025-08-31T23:59:59.999Z' })
  @IsOptional()
  @IsDateString()
  toDate?: string;
}