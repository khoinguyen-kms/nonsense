import { Injectable } from '@nestjs/common';
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
  ): Promise<PaginationResponseDto<T>> {
    const page = Number(filter.page) || PAGINATION_DEFAULT.page;
    const perPage = Number(filter.per_page) || PAGINATION_DEFAULT.per_page;
    const orderFilter = filter.order || OrderFilter.DESCENDING;
    const skip = (page - 1) * perPage;

    const [res, total] = await repository.findAndCount({
      withDeleted,
      take: perPage,
      skip,
      order: { createdAt: orderFilter.toUpperCase() } as FindOptionsOrder<T>,
    });

    const lastPage = Math.ceil(total / perPage);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    const response = new PaginationResponseDto<T>();
    response.data = res;
    response.metadata = {
      total,
      next_page: nextPage,
      last_page: lastPage,
      current_page: page,
      prev_page: prevPage,
    };

    return response;
  }
}
