import { IsString } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  readonly title: string;
}
