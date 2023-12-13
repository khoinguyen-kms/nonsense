import { Controller, Get, HttpCode, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LectureClassesService } from './lecture-classes.service';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { BaseResponseDto } from 'src/dtos/base-response.dto';
import { LectureClass } from 'src/entities/lecture-class.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('classes')
@ApiTags('Classes')
@ApiBearerAuth()
export class LectureClassesController {

  constructor(private readonly lectureService: LectureClassesService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllClasses(@Query() filter: PaginationDto) {
    return await this.lectureService.fetchClassesWithoutDeleted(filter);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getClassById(@Param('id') id: string) {
    const found = await this.lectureService.findClassById(parseInt(id), 'found');
    return new BaseResponseDto<LectureClass>(HttpStatus.OK, '', found);
  }
}
