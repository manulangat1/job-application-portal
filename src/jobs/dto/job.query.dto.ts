import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PaginationQueries {
  @IsOptional()
  @Transform((take) => Number(take))
  @IsInt()
  take: number = 1;

  @IsOptional()
  @Transform((skip) => Number(skip))
  @IsInt()
  skip: number = 0;
}
