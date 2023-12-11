import { ApiProperty } from '@nestjs/swagger';
import { OrderFilter } from 'src/shared/enums/order-filter.enum';

export class PaginationDto {
  @ApiProperty()
  page: string;

  @ApiProperty()
  per_page: string;

  @ApiProperty({ type: 'enum', enum: OrderFilter })
  order: OrderFilter;
}
