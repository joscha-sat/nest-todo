import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsOptionalInt } from './utility-service';
// Query parameters:
// - skip: number
// - limit: number
// - search: string

export class BasePaginationSearchDto {
  // skip
  @ApiProperty({ required: false, description: 'Number of records to skip' })
  @IsOptionalInt()
  skip: number;

  // limit
  @ApiProperty({
    required: false,
    description: 'Limit on the number of records to return',
  })
  @IsOptionalInt()
  limit: number;

  // search
  @ApiProperty({
    required: false,
    description: 'Search value',
  })
  @IsOptional()
  search: string;
}
