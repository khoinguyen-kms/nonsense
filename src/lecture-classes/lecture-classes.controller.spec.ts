import { Test, TestingModule } from '@nestjs/testing';
import { LectureClassesController } from './lecture-classes.controller';

describe('LectureClassesController', () => {
  let controller: LectureClassesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LectureClassesController],
    }).compile();

    controller = module.get<LectureClassesController>(LectureClassesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
