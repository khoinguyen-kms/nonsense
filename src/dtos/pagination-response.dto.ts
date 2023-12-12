import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from './base-response.dto';

export class PaginationResponseDto<T> extends BaseResponseDto<T> {

  constructor(_stautsCode: number, _message: string, _data: T[], metadata: any) {
    super(_stautsCode, _message, _data);
    this.metadata = metadata;
  }

  @ApiProperty()
  metadata: {
    total: number;
    currentPage: number;
    nextPage: number;
    lastPage: number;
    prevPage: number;
  };
}
