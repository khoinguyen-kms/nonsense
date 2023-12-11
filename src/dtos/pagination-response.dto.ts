import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDto<T> {
  @ApiProperty()
  data: T[]

  @ApiProperty()
  metadata: {
    total: number,
    current_page: number,
    next_page: number,
    last_page: number
    prev_page: number,
  };
}
