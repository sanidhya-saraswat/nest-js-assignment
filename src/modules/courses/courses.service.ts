import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { UpdateCourseDto } from './dtos/update-course.dto';
import { Lesson } from '../lessons/entities/lesson.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  findAll(): Promise<Course[]> {
    return this.coursesRepository.find({ relations: ['lessons'] });
  }

  findOne(id: number): Promise<Course> {
    return this.coursesRepository.findOne({
      where: { id },
      relations: ['lessons'],
    });
  }

  async create(course: Course): Promise<Course> {
    return this.coursesRepository.save(course);
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    await this.coursesRepository.update(id, updateCourseDto);
    return this.coursesRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const course = await this.findOne(id);
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    // Explicitly delete associated lessons
    await this.lessonRepository.delete({ course });
    await this.coursesRepository.remove(course);
  }
}
