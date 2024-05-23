import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ToBoolean } from '../../../utility-services/utility-service';
import { BasePaginationSearchDto } from '../../../shared/base-pagination-search-dto';

// Query parameters:
// - skip: number
// - limit: number
// - search: string
// - done: boolean

export class FindAllQueryParams extends BasePaginationSearchDto {
  // done
  @ApiProperty({
    required: false,
    description: 'Filter todos based on their status',
  })
  @Transform(ToBoolean)
  @IsOptional()
  @IsBoolean()
  done: boolean;
}
