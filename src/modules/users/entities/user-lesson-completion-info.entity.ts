import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';
import { User } from './user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity()
@Unique(['user', 'lesson'])
export class UserLessonCompletionInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userLessonCompletionInfos)
  user: User;

  @ManyToOne(() => Lesson, (lesson) => lesson.userLessonCompletionInfos)
  lesson: Lesson;

  @Column()
  completedAt: Date;
}
