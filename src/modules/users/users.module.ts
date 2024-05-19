import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { Course } from '../courses/entities/course.entity';
import { UserLessonCompletionInfo } from './entities/user-lesson-completion-info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Lesson, Course, UserLessonCompletionInfo]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
