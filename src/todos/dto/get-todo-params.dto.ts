import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import {
  IsOptionalInt,
  ToBoolean,
} from '../../utility-services/utility-service';
import { Transform } from 'class-transformer';

export class FindAllQuery {
  @ApiProperty({ required: false, description: 'Number of records to skip' })
  @IsOptionalInt()
  skip: number;

  @ApiProperty({
    required: false,
    description: 'Limit on the number of records to return',
  })
  @IsOptionalInt()
  limit: number;

  @ApiProperty({
    required: false,
    description: 'Filter todos based on their status',
  })
  @Transform(ToBoolean)
  @IsOptional()
  @IsBoolean()
  done: boolean;
}
