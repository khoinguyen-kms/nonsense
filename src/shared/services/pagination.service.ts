import { HttpStatus, Injectable } from '@nestjs/common';
import { PaginationResponseDto } from 'src/dtos/pagination-response.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { PAGINATION_DEFAULT } from 'src/utils/constants';
import { FindOptionsOrder, Repository } from 'typeorm';
import { OrderFilter } from '../enums/order-filter.enum';
import { AbstractEntity } from 'src/entities/abstract.entity';

@Injectable()
export class PaginationService<T extends AbstractEntity> {
  constructor() {}

  async paginate(
    repository: Repository<T>,
    filter: PaginationDto,
    withDeleted: boolean,
  ): Promise<PaginationResponseDto<T> | any> {
    const { page, perPage, orderFilter } = this.extractPaginationParams(filter);
    const { data, metadata } = await this.getPaginatedData(
      repository,
      page,
      perPage,
      orderFilter,
      withDeleted,
    );

    return this.createPaginationResponse(data, metadata);
  }

  private extractPaginationParams(filter: PaginationDto) {
    const page = Number(filter.page) || PAGINATION_DEFAULT.page;
    const perPage = Number(filter.per_page) || PAGINATION_DEFAULT.per_page;
    const orderFilter = filter.order || OrderFilter.DESCENDING;

    return { page, perPage, orderFilter };
  }

  private async getPaginatedData(
    repository: Repository<T>,
    page: number,
    perPage: number,
    order: string,
    withDeleted: boolean,
  ) {
    const skip = (page - 1) * perPage;

    const [data, total] = await repository.findAndCount({
      withDeleted,
      take: perPage,
      skip,
      order: { createdAt: order.toUpperCase() } as FindOptionsOrder<T>,
    });

    const lastPage = Math.ceil(total / perPage);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    const metadata = { total, nextPage, lastPage, currentPage: page, prevPage };
    return { data, metadata };
  }

  private createPaginationResponse(data: T[], metadata: any) {
    return new PaginationResponseDto<T>(HttpStatus.OK, '', data, metadata);
  }
}
