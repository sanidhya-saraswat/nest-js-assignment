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
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dtos/create-course.dto';
import { UpdateCourseDto } from './dtos/update-course.dto';
import { Course } from './entities/course.entity';
import { IsAdminGuard } from '../auth/guards/isAdmin.guard';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @UseGuards(IsAdminGuard)
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @UseGuards(IsAdminGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.coursesService.findOne(id);
  }

  @UseGuards(IsAdminGuard)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    const course = new Course();
    course.title = createCourseDto.title;
    return this.coursesService.create(course);
  }

  @UseGuards(IsAdminGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @UseGuards(IsAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coursesService.remove(id);
  }
}
