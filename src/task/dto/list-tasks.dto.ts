import { IsOptional, IsInt, Min, IsEnum, IsString, IsArray, ArrayNotEmpty, IsDateString } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { Status, Priority } from 'generated/prisma';

export class ListTasksDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  perPage?: number = 10;

  @IsOptional()
  @IsEnum(Status, { each: false })
  status?: string;

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

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  isActive?: boolean;

  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @IsOptional()
  @IsDateString()
  toDate?: string;
}