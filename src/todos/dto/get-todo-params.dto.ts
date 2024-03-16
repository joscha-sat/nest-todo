import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import {
  IsOptionalInt,
  ToBoolean,
} from '../../utility-services/utility-service';

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
  @IsBoolean()
  @ToBoolean()
  done: boolean;
}
