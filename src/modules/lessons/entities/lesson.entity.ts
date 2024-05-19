import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { UserLessonCompletionInfo } from 'src/modules/users/entities/user-lesson-completion-info.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Course, (course) => course.lessons, { onDelete: 'CASCADE' })
  course: Course;

  @OneToMany(
    () => UserLessonCompletionInfo,
    (userLessonCompletionInfo) => userLessonCompletionInfo.lesson,
  )
  userLessonCompletionInfos: UserLessonCompletionInfo[];
}
