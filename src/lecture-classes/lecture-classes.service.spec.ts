import { Test, TestingModule } from '@nestjs/testing';
import { LectureClassesService } from './lecture-classes.service';

describe('LectureClassesService', () => {
  let service: LectureClassesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LectureClassesService],
    }).compile();

    service = module.get<LectureClassesService>(LectureClassesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
