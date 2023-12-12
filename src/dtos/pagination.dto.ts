import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { OrderFilter } from 'src/shared/enums/order-filter.enum';

export class PaginationDto {
  @ApiProperty({ required: false, type: 'number', example: 1 })
  @IsOptional()
  page: string;

  @ApiProperty({ required: false, type: 'number', example: 20 })
  @IsOptional()
  per_page: string;

  @IsOptional()
  @ApiProperty({ type: 'enum', enum: OrderFilter, required: false })
  order: OrderFilter;
}
