import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { UpdateLessonDto } from './dtos/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { CoursesService } from './../courses/courses.service';
import { IsAdminGuard } from '../auth/guards/isAdmin.guard';

@Controller('courses/:courseId/lessons')
export class LessonsController {
  constructor(
    private lessonsService: LessonsService,
    private coursesService: CoursesService,
  ) {}

  @UseGuards(IsAdminGuard)
  @Get()
  findAll(@Param('courseId') courseId: number) {
    return this.lessonsService.findAll(courseId);
  }

  @UseGuards(IsAdminGuard)
  @Get(':id')
  findOne(@Param('courseId') courseId: number, @Param('id') lessonId: number) {
    return this.lessonsService.findOne(courseId, lessonId);
  }

  @UseGuards(IsAdminGuard)
  @Post()
  async create(
    @Body() createLessonDto: CreateLessonDto,
    @Param('courseId') courseId: number,
  ) {
    const course = await this.coursesService.findOne(courseId);
    const lesson = new Lesson();
    lesson.title = createLessonDto.title;
    lesson.course = course;
    return this.lessonsService.create(lesson);
  }

  @UseGuards(IsAdminGuard)
  @Put(':id')
  async update(
    @Param('id') lessonId: number,
    @Param('courseId') courseId: number,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    const lesson = await this.lessonsService.findOne(courseId, lessonId);
    if (updateLessonDto.title) {
      lesson.title = updateLessonDto.title;
    }
    if (updateLessonDto.courseId) {
      const course = await this.coursesService.findOne(
        updateLessonDto.courseId,
      );
      lesson.course = course;
    }
    return this.lessonsService.update(lessonId, lesson);
  }

  @UseGuards(IsAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.lessonsService.remove(id);
  }
}
