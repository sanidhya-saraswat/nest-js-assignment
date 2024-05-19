import { IsString, IsInt } from 'class-validator';

export class UpdateLessonDto {
  @IsString()
  readonly title?: string;

  @IsInt()
  readonly courseId?: number;
}
