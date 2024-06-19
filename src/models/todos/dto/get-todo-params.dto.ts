import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { BasePaginationSearchDto } from '../../../shared/base-pagination-search-dto';
import { ToBoolean } from '../../../shared/utility-service';

// Query parameters:
// - skip: number
// - limit: number
// - search: string
// - done: boolean

export class TodoFindAllQueryParams extends BasePaginationSearchDto {
  // done
  @ApiProperty({
    required: false,
    description: 'Filter todos based on their status',
  })
  @Transform(ToBoolean)
  @IsOptional()
  @IsBoolean()
  done: boolean;

  @ApiProperty({
    required: false,
    description: 'Filter todos based on their title',
  })
  @IsOptional()
  title: string;
}
