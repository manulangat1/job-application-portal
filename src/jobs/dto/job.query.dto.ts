import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PaginationQueries {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  take: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  skip: number = 0;
}
