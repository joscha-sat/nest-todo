import { ApiProperty } from '@nestjs/swagger';
import { IsOptionalInt } from '../utility-services/utility-service';
import { IsOptional } from 'class-validator';
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
