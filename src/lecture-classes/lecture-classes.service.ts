import { BadRequestException, HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { BaseResponseDto } from 'src/dtos/base-response.dto';
import { CreateUpdateClassDto } from 'src/dtos/create-update-class.dto';
import { PaginationResponseDto } from 'src/dtos/pagination-response.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { LectureClass } from 'src/entities/lecture-class.entity';
import { PaginationService } from 'src/shared/services/pagination.service';
import { UsersService } from 'src/users/users.service';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class LectureClassesService {
  constructor(
    @InjectRepository(LectureClass)
    private readonly lectureRepository: Repository<LectureClass>,
    private readonly paginationService: PaginationService<LectureClass>,
    private readonly userService: UsersService
  ) { }

  async fetchAllCurrentClasses(filter: PaginationDto): Promise<PaginationResponseDto<LectureClass[]>> {
    return this.paginationService.paginate(this.lectureRepository, filter, true);
  }

  async fetchClassesWithoutDeleted(filter: PaginationDto): Promise<PaginationResponseDto<LectureClass[]>> {
    return this.paginationService.paginate(this.lectureRepository, filter, false);
  }

  async createNewClass(inputs: CreateUpdateClassDto): Promise<BaseResponseDto<LectureClass>> {
    const { className, availableAmount } = inputs;
    const isExisted = await this.isClassExistedBy({ className });
    if (isExisted) throw new BadRequestException(`Class ${className} is already added to the system.`)

    try {
      const tempClass = this.lectureRepository.create(inputs);
      const created = await this.lectureRepository.save(tempClass);
      return new BaseResponseDto<LectureClass>(HttpStatus.OK, 'Create class successfully', created);
    } catch (err) {
      throw new UnprocessableEntityException(err)
    }
  }

  async updateClassInfo(id: number, inputs: CreateUpdateClassDto): Promise<BaseResponseDto<LectureClass | any>> {
    const foundClass = await this.findClassById(id, 'modified');
    if (Object.keys(inputs).length === 0 && inputs.constructor === Object) {
      return new BaseResponseDto(HttpStatus.OK, 'Nothing happens', {});
    }

    const updateData = plainToClass(CreateUpdateClassDto, inputs)
    Object.assign(foundClass, updateData);

    try {
      const updatedClass = await this.lectureRepository.save(foundClass);
      return new BaseResponseDto(
        HttpStatus.OK,
        'Update class info successfully',
        updatedClass
      )
    } catch (err) {
      throw new UnprocessableEntityException(err)
    }
  }

  async addStudentToClass(classId: number, userIds: number[]): Promise<LectureClass> {
    const foundClass = await this.findClassById(classId, 'found');
    const foundUsers = await this.userService.findByIds(userIds);
    if (!foundUsers || foundUsers.length !== userIds.length) throw new UnprocessableEntityException('Invalid request::Some users could not be found');

    if (!foundClass.students) {
      foundClass.students = [];
    }

    foundClass.students = Array.from(new Set([...foundClass.students, ...foundUsers]));
    try {
      return await this.lectureRepository.save(foundClass);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async removeClass(id: number): Promise<boolean> {
    const foundClass = await this.findClassById(id, 'deleted');
    foundClass.deletedAt = new Date();
    try {
      await this.lectureRepository.save(foundClass);
      return true;
    } catch (err) {
      throw new UnprocessableEntityException('Could not delete the class')
    }
  }

  async findClassById(id: number, action: string): Promise<LectureClass> {
    const foundClass = await this.lectureRepository.findOneBy({ id });
    if (!foundClass) throw new BadRequestException(`The class must be existed to be ${action}`);

    return foundClass;
  }

  private async isClassExistedBy(where: FindOptionsWhere<LectureClass>): Promise<boolean> {
    return await this.lectureRepository.exist({ where });
  }
}
