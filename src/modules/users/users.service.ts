import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Lesson } from '../lessons/entities/lesson.entity';
import { Course } from '../courses/entities/course.entity';
import { UserLessonCompletionInfo } from './entities/user-lesson-completion-info.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(UserLessonCompletionInfo)
    private userLessonCompletionInfoRepository: Repository<UserLessonCompletionInfo>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  findOne(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async markLessonAsComplete(
    userId: number,
    lessonId: number,
  ): Promise<UserLessonCompletionInfo> {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });
    const lesson = await this.lessonRepository.findOne({
      where: {
        id: lessonId,
      },
    });

    const existingUserLessonCompletionInfo =
      await this.userLessonCompletionInfoRepository.findOne({
        where: { user: user, lesson: lesson },
      });

    if (!existingUserLessonCompletionInfo) {
      const newUserLessonCompletionInfo = new UserLessonCompletionInfo();
      newUserLessonCompletionInfo.user = user;
      newUserLessonCompletionInfo.lesson = lesson;
      newUserLessonCompletionInfo.completedAt = new Date();
      return this.userLessonCompletionInfoRepository.save(
        newUserLessonCompletionInfo,
      );
    }
  }

  async getUserCourses(userId: number): Promise<any> {
    const courses = await this.courseRepository.find({
      relations: ['lessons'],
    });

    const userLessonCompletionInfos =
      await this.userLessonCompletionInfoRepository.find({
        where: {
          user: { id: userId },
        },
        relations: ['lesson', 'user'],
      });

    const completedLessonIds = new Set(
      userLessonCompletionInfos.map((ulci) => ulci.lesson.id),
    );

    // Map through courses to determine the completion status
    return courses.map((course) => {
      const lessons = course.lessons.map((lesson) => ({
        ...lesson,
        completed: completedLessonIds.has(lesson.id),
      }));

      const completedLessonsCount = lessons.filter(
        (lesson) => lesson.completed,
      ).length;
      const totalLessonsCount = lessons.length;
      let completionPercentage =
        (completedLessonsCount / totalLessonsCount) * 100 || 0;
      completionPercentage = parseFloat(completionPercentage.toFixed(2));

      return {
        ...course,
        lessons: lessons,
        completionPercentage: completionPercentage + '%',
        completed: completionPercentage == 100,
      };
    });

    // // Retrieve completed course ids
    // const completedCourseIds = user.completedCourses.map((course) => course.id);
    // const completedLessonIds = user.completedLessons.map((lesson) => lesson.id);

    // // Get all courses and map them to include completed flag
    // const courses = await this.courseRepository.find({
    //   relations: ['lessons'],
    // });
    // const coursesWithCompletionFlag = courses.map((course) => ({
    //   ...course,
    //   completed: completedCourseIds.includes(course.id),
    //   lessons: course.lessons.map((lesson) => ({
    //     ...lesson,
    //     completed: completedLessonIds.includes(lesson.id),
    //   })),
    // }));

    // return coursesWithCompletionFlag;
  }
}
