import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { IsAdminGuard } from '../auth/guards/isAdmin.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { IsAuthenticatedGuard } from '../auth/guards/isAuthenticated.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(IsAdminGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(IsAuthenticatedGuard)
  @Get('courses')
  async getUserCourses(@Request() req) {
    const userId = req.user.id;
    return await this.usersService.getUserCourses(userId);
  }

  @UseGuards(IsAdminGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOneById(id);
  }

  @Post()
  @UseGuards(IsAdminGuard)
  create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }

  @UseGuards(IsAdminGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(IsAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @UseGuards(IsAuthenticatedGuard)
  @Put('complete-lesson/:lessonId')
  async markLessonAsComplete(
    @Request() req,
    @Param('lessonId') lessonId: number,
  ) {
    const userId = req.user.id;
    await this.usersService.markLessonAsComplete(userId, lessonId);
    return { succes: true };
  }
}
