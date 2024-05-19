import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>,
  ) {}

  findAll(courseId: number): Promise<Lesson[]> {
    return this.lessonsRepository.find({
      where: {
        course: { id: courseId },
      },
      relations: ['course'],
    });
  }

  findOne(courseId: number, lessonId: number): Promise<Lesson> {
    return this.lessonsRepository.findOne({
      where: {
        course: { id: courseId },
        id: lessonId,
      },
      relations: ['course'],
    });
  }

  async create(lesson: Lesson): Promise<Lesson> {
    return this.lessonsRepository.save(lesson);
  }

  async update(id: number, lesson: Lesson): Promise<Lesson> {
    await this.lessonsRepository.update(id, lesson);
    return this.lessonsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.lessonsRepository.delete(id);
  }
}
